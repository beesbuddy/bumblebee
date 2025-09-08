(ns bumblebee.mqtt.channel-initializer
  (:require
   [bumblebee.mqtt.constants :as const]
   [bumblebee.mqtt.config :as cfg])
  (:import
   [io.netty.channel ChannelInitializer ChannelPipeline Channel ChannelHandler ChannelInboundHandlerAdapter]
   [io.netty.channel.embedded EmbeddedChannel]
   [io.netty.handler.codec.mqtt MqttDecoder MqttEncoder]
   [io.netty.handler.ssl SslContext NotSslRecordException]
   [io.netty.handler.codec DecoderException]
   (io.netty.handler.timeout IdleStateHandler)))

(def ^:private handler-names
  {::idle       "idleState"
   ::https      "https"
   ::http-codec "httpServerCodec"
   ::http-agg   "httpObjectAggregator"
   ::compress   "compressor"
   ::ws-proto   "websocketProtocol"
   ::ws-codec   "websocketProtocolCodec"
   ::mqtt-dec   "mqttDecoder"
   ::mqtt-enc   "mqttEncoder"
   ::mqtt-main  "mqttMain"})

(defn configure-pipeline!
  "Configure the Netty pipeline with Idle/MQTT and optional SSL/WebSocket.

  Arities:
  - (configure-pipeline! pipeline) -> uses defaults from cfg/get-config
  - (configure-pipeline! pipeline opts)
    opts keys:
      :use-ssl?               boolean (default false)
      :protocol-type          one of #{:web-socket :tcp} (default :tcp)
      :config                 map (default (cfg/get-config))
      :ssl-context            io.netty.handler.ssl.SslContext or nil
      :messages-dispatcher    ChannelHandler (installed last if non-nil)
      :messages-dispatcher-fn (fn -> ChannelHandler). If provided, a NEW handler
                               is created per channel to avoid @Sharable issues."
  ([^ChannelPipeline pipeline]
   (configure-pipeline! pipeline {:use-ssl? false
                                  :protocol-type :tcp
                                  :config (cfg/get-config)
                                  :ssl-context nil
                                  :messages-dispatcher nil
                                  :messages-dispatcher-fn nil}))
  ([^ChannelPipeline pipeline {:keys [use-ssl? protocol-type config ^SslContext ssl-context messages-dispatcher messages-dispatcher-fn]
                               :or   {use-ssl? false protocol-type :tcp config (cfg/get-config)}}]
   (let [timeout-seconds (or (get-in config [:netty-config :channel-timeout-seconds]) 60)
         ws-path (or (get-in config [:mqtt-config :web-socket-path]) const/default-websocket-path)
         mqtt-subprotocols "mqtt"]
     ;; Idle state handler (placed early but after SSL if present)
     ;; If SSL is enabled, insert SSL handler at the very beginning so all
     ;; subsequent handlers see decrypted traffic.
     (when (and use-ssl? (some? ssl-context))
       (let [alloc (-> pipeline .channel .alloc)
             ^ChannelHandler ssl-h (.newHandler ssl-context alloc)
             ^String name (handler-names ::https)]
         (.addFirst ^ChannelPipeline pipeline name ssl-h)))
     (let [^String name (handler-names ::idle)
           ^ChannelHandler h (IdleStateHandler. 0 0 (int timeout-seconds))]
       (.addFirst ^ChannelPipeline pipeline name h))

     ;; Exception logger to catch SSL record issues (and others) early and log nicely
     (let [handler
           (proxy [ChannelInboundHandlerAdapter] []
             (exceptionCaught [ctx cause]
               (let [^Throwable t cause
                     find-cause (fn find-cause [^Throwable e ^Class klass]
                                  (when e
                                    (if (.isAssignableFrom klass (.getClass e))
                                      e
                                      (recur (.getCause e) klass))))
                     nsslex (or (find-cause t NotSslRecordException)
                                (when (instance? DecoderException t)
                                  (find-cause (.getCause ^DecoderException t) NotSslRecordException)))]
                 (when nsslex
                   (println (str "[MQTT][SSL] NotSslRecordException from "
                                 (.remoteAddress (.channel ctx))
                                 ": " (.getMessage ^NotSslRecordException nsslex))))
                 ;; Close channel on exception to cleanup
                 (.close (.channel ctx)))))]
       (.addLast ^ChannelPipeline pipeline "exceptionLogger" ^ChannelHandler handler))

     ;; Optional WebSocket (load classes reflectively so requiring this ns
     ;; doesn't fail when websocket deps are absent in classpath)
     (when (= :web-socket protocol-type)
       (let [new0 (fn [^String cn]
                    (try
                      (let [cls (Class/forName cn)
                            ctor (.getDeclaredConstructor cls (into-array Class []))]
                        (.newInstance ctor (object-array 0)))
                      (catch Throwable _ nil)))
             new1-int (fn [^String cn ^Integer i]
                        (try
                          (let [cls (Class/forName cn)
                                ctor (.getDeclaredConstructor cls (into-array Class [Integer/TYPE]))]
                            (.newInstance ctor (object-array [i])))
                          (catch Throwable _ nil)))
             new4 (fn [^String cn ^String a ^String b ^Boolean c ^Integer d]
                    (try
                      (let [cls (Class/forName cn)
                            ctor (.getDeclaredConstructor cls (into-array Class [String String Boolean/TYPE Integer/TYPE]))]
                        (.newInstance ctor (object-array [a b c d])))
                      (catch Throwable _ nil)))
             http-server-codec (new0 "io.netty.handler.codec.http.HttpServerCodec")
             http-agg (new1-int "io.netty.handler.codec.http.HttpObjectAggregator" 1048576)
             compressor (new0 "io.netty.handler.codec.http.HttpContentCompressor")
             ws-handler (new4 "io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler"
                              ws-path mqtt-subprotocols true 65536)]
         (when http-server-codec (let [^String n (handler-names ::http-codec)] (.addLast ^ChannelPipeline pipeline n ^ChannelHandler http-server-codec)))
         (when http-agg (let [^String n (handler-names ::http-agg)] (.addLast ^ChannelPipeline pipeline n ^ChannelHandler http-agg)))
         (when compressor (let [^String n (handler-names ::compress)] (.addLast ^ChannelPipeline pipeline n ^ChannelHandler compressor)))
         (when ws-handler (let [^String n (handler-names ::ws-proto)] (.addLast ^ChannelPipeline pipeline n ^ChannelHandler ws-handler)))
         ;; Try to attach optional MqttWebSocketCodec if present on classpath
         (try
           (let [cls (Class/forName "bumblebee.core.codec.MqttWebSocketCodec")
                 ctor (.getDeclaredConstructor cls (into-array Class []))
                 inst (.newInstance ctor (object-array 0))
                 ^String n (handler-names ::ws-codec)]
             (.addLast ^ChannelPipeline pipeline n ^ChannelHandler inst))
           (catch Throwable _
             ;; Codec not present; proceed without it
             nil))))

     ;; MQTT codec
     (let [^String ndec (handler-names ::mqtt-dec)
           ^ChannelHandler dec (MqttDecoder.)]
       (.addLast ^ChannelPipeline pipeline ndec dec))
     (let [^String nenc (handler-names ::mqtt-enc)
           ^ChannelHandler enc MqttEncoder/INSTANCE]
       (.addLast ^ChannelPipeline pipeline nenc enc))

    ;; Main dispatcher
    (let [handler (or (when messages-dispatcher-fn (messages-dispatcher-fn))
                      messages-dispatcher)]
      (when handler
        (let [^String n (handler-names ::mqtt-main)]
          (.addLast ^ChannelPipeline pipeline n ^ChannelHandler handler))))

     pipeline)))

(defn new-channel-initializer
  "Create a ChannelInitializer that configures channels per opts.

  Arities:
  - (init) -> defaults, no SSL, TCP only
  - (init opts) -> see configure-pipeline! opts"
  ([]
   (new-channel-initializer {:use-ssl? false :protocol-type :tcp :config (cfg/get-config) :messages-dispatcher-fn nil}))
  ([{:keys [use-ssl? protocol-type config ^SslContext ssl-context messages-dispatcher messages-dispatcher-fn]
     :or   {use-ssl? false protocol-type :tcp config (cfg/get-config)}}]
   (proxy [ChannelInitializer] []
     (initChannel [^Channel channel]
       (let [^ChannelPipeline pipeline (.pipeline channel)]
         (configure-pipeline! pipeline {:use-ssl? use-ssl?
                                        :protocol-type protocol-type
                                        :config config
                                        :ssl-context ssl-context
                                        :messages-dispatcher messages-dispatcher
                                        :messages-dispatcher-fn messages-dispatcher-fn}))))))

(comment
  ;; Using EmbeddedChannel for simple initializer tests (no network required)
  (def ch (EmbeddedChannel.))
  (def initializer (new-channel-initializer))
  ;; ChannelInitializer#initChannel is protected on the Java class, but our proxy
  ;; provides a public method we can call from Clojure for testing.
  (-> initializer (.initChannel ch))
  (let [p (.pipeline ch)]
    [(some? (.get p io.netty.handler.timeout.IdleStateHandler))
     (some? (.get p io.netty.handler.codec.mqtt.MqttDecoder))
     (some? (.get p io.netty.handler.codec.mqtt.MqttEncoder))])

  ;; Verify SSL handler is added when an SslContext is provided and use-ssl? is true
  (import '[io.netty.handler.ssl SslContextBuilder]
          '[io.netty.handler.ssl.util InsecureTrustManagerFactory])
  (def client-ssl
    (.. (SslContextBuilder/forClient)
        (trustManager InsecureTrustManagerFactory/INSTANCE)
        build))
  (def ch-ssl (EmbeddedChannel.))
  (def initializer-ssl (new-channel-initializer {:use-ssl? true :ssl-context client-ssl}))
  (-> initializer-ssl (.initChannel ch-ssl))
  (let [p (.pipeline ch-ssl)
        names (iterator-seq (.iterator (.names p)))]
    {:has-ssl-handler (boolean (.get p io.netty.handler.ssl.SslHandler))
     :last       (take 2 names)})
  )
