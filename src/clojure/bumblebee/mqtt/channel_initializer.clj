(ns bumblebee.mqtt.channel-initializer
  (:require
    [bumblebee.mqtt.config :as cfg]
    [bumblebee.mqtt.util :as util])
  (:import
    [io.netty.buffer ByteBuf]
    [io.netty.channel
     Channel
     ChannelHandler
     ChannelHandlerContext
     ChannelInboundHandlerAdapter
     ChannelInitializer
     ChannelPipeline]
    [io.netty.channel.embedded EmbeddedChannel]
    [io.netty.handler.codec MessageToMessageCodec]
    [io.netty.handler.codec DecoderException MessageToMessageCodec]
    [io.netty.handler.codec.http HttpContentCompressor HttpObjectAggregator HttpServerCodec]
    [io.netty.handler.codec.http.websocketx BinaryWebSocketFrame WebSocketServerProtocolConfig WebSocketServerProtocolConfig$Builder WebSocketServerProtocolHandler]
    [io.netty.handler.codec.mqtt MqttDecoder MqttEncoder]
    [io.netty.handler.ssl NotSslRecordException SslContext]
    [io.netty.handler.timeout IdleStateHandler]
    [java.util List]))

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

(defn mqtt-websocket-codec
  "BinaryWebSocketFrame <-> ByteBuf"
  []
  (proxy [MessageToMessageCodec] [BinaryWebSocketFrame ByteBuf]
    (encode
      ^void [^ChannelHandlerContext _ ^ByteBuf buf ^List out]
      (.add out (BinaryWebSocketFrame. (.retain buf))))
    (decode
      ^void [^ChannelHandlerContext _ ^BinaryWebSocketFrame frame ^List out]
      (let [^ByteBuf buf (.content frame)]
        (.retain buf)
        (.add out buf)))))

(defn make-ws-protocol-handler
  [{:keys [^String path
           ^String subprotocols
           ^boolean allow-extensions?
           ^long max-frame-size]
    :or   {allow-extensions? true
           max-frame-size    65536}}]
  (let [^WebSocketServerProtocolConfig$Builder builder
        (WebSocketServerProtocolConfig/newBuilder)]
    (.websocketPath builder path)
    (.subprotocols builder (or subprotocols "mqtt"))
    (.allowExtensions builder allow-extensions?)
    (.maxFramePayloadLength builder (int max-frame-size))
    (WebSocketServerProtocolHandler. (.build builder))))

(defn add-last!
  ^ChannelPipeline [^ChannelPipeline p ^String name ^ChannelHandler h]
  (.addLast p name h))

(defn init-ws-pipeline!
  "Adds HTTP ⇄ WS handlers to the given Netty pipeline."
  [^ChannelPipeline pipeline ^String ws-path ^String mqtt-subprotocols]

  (let [^HttpServerCodec http-server-codec (HttpServerCodec.)
        ^HttpObjectAggregator http-agg (HttpObjectAggregator. (int 1048576))
        ^HttpContentCompressor compressor (HttpContentCompressor.)
        ^ChannelHandler ws-handler (make-ws-protocol-handler
                                     {:path              ws-path
                                      :subprotocols      mqtt-subprotocols
                                      :allow-extensions? true
                                      :max-frame-size    65536})]

    (add-last! ^ChannelPipeline pipeline "tap-http0" (util/tap "HTTP-0"))
    (add-last! ^ChannelPipeline pipeline "sc" http-server-codec)
    (add-last! ^ChannelPipeline pipeline "agg" http-agg)
    (add-last! ^ChannelPipeline pipeline "tap-http1" (util/tap "HTTP-1"))
    (add-last! ^ChannelPipeline pipeline "comp" compressor)
    (add-last! ^ChannelPipeline pipeline "ws-handler" ws-handler)
    (add-last! ^ChannelPipeline pipeline "ws-codec" (mqtt-websocket-codec))
    (add-last! ^ChannelPipeline pipeline "mqtt-dec" (MqttDecoder.))
    (add-last! ^ChannelPipeline pipeline "mqtt-enc" MqttEncoder/INSTANCE)
    (add-last! ^ChannelPipeline pipeline "tap-mqtt" (util/tap "MQTT"))))

(defn init-tcp-pipeline! [^ChannelPipeline pipeline]
  (let [^String mqtt-decoder (handler-names ::mqtt-dec)
        ^ChannelHandler dec (MqttDecoder.)]
    (add-last! ^ChannelPipeline pipeline mqtt-decoder dec))
  (let [^String mqtt-encoder (handler-names ::mqtt-enc)
        ^ChannelHandler enc MqttEncoder/INSTANCE]
    (add-last! ^ChannelPipeline pipeline mqtt-encoder enc)))

(defn configure-pipeline!
  "Configure the Netty pipeline with Idle/MQTT and optional SSL/WebSocket.

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
   (configure-pipeline! pipeline {:use-ssl?               false
                                  :config                 (cfg/get-config)
                                  :ssl-context            nil
                                  :protocol-type          :tcp
                                  :messages-dispatcher    nil
                                  :messages-dispatcher-fn nil}))
  ([^ChannelPipeline pipeline {:keys [use-ssl? protocol-type config ^SslContext ssl-context messages-dispatcher messages-dispatcher-fn]
                               :or   {use-ssl? false protocol-type :tcp config (cfg/get-config)}}]
   (let [timeout-seconds (or (get-in config [:netty-config :channel-timeout-seconds]) 60)
         ws-path (get-in config [:mqtt-config :web-socket-path])
         mqtt-subprotocols "mqtt,mqttv3.1,mqttv3.1.1,mqttv5.0"]
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
                 ;; Close channel on exception to clean up
                 (.close (.channel ctx)))))]
       (add-last! ^ChannelPipeline pipeline "exceptionLogger" ^ChannelHandler handler))

     (if (= protocol-type :web-socket)
       (init-ws-pipeline! pipeline ws-path mqtt-subprotocols)
       (init-tcp-pipeline! pipeline))

     (let [main-dispatcher (or (when messages-dispatcher-fn (messages-dispatcher-fn))
                               messages-dispatcher)]
       (when main-dispatcher
         (let [^String n (handler-names ::mqtt-main)]
           (add-last! ^ChannelPipeline pipeline n ^ChannelHandler main-dispatcher))))
     pipeline)))

(defn new-channel-initializer
  "Create a ChannelInitializer that configures channels per opts.
  - (init) -> defaults, no SSL, TCP only
  - (init opts) -> see configure-pipeline! opts"
  ([]
   (new-channel-initializer {:use-ssl? false :config (cfg/get-config) :messages-dispatcher-fn nil}))
  ([{:keys [use-ssl? protocol-type config ^SslContext ssl-context messages-dispatcher messages-dispatcher-fn]
     :or   {use-ssl? false protocol-type :tcp config (cfg/get-config)}}]
   (proxy [ChannelInitializer] []
     (initChannel [^Channel channel]
       (let [^ChannelPipeline pipeline (.pipeline channel)]
         (configure-pipeline! pipeline {:use-ssl?               use-ssl?
                                        :config                 config
                                        :protocol-type          protocol-type
                                        :ssl-context            ssl-context
                                        :messages-dispatcher    messages-dispatcher
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
  (def channel-initializer (new-channel-initializer {:use-ssl? true :ssl-context client-ssl}))
  (-> channel-initializer (.initChannel ch-ssl))
  (let [p (.pipeline ch-ssl)
        names (iterator-seq (.iterator (.names p)))]
    {:has-ssl-handler (boolean (.get p io.netty.handler.ssl.SslHandler))
     :last            (take 2 names)}))
