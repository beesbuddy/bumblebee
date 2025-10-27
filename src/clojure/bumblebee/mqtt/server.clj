(ns bumblebee.mqtt.server
  (:require
   [bumblebee.mqtt.channel-initializer :as ch-init]
   [bumblebee.mqtt.config :as cfg]
   [bumblebee.mqtt.filters :as fx]
   [bumblebee.mqtt.messages-dispatcher :as md]
   [bumblebee.mqtt.store.in-memory.dup-pub-messages-store :as dup]
   [bumblebee.mqtt.store.in-memory.messages-id-store :as mid]
   [bumblebee.mqtt.store.in-memory.retain-store :as retain]
   [bumblebee.mqtt.store.in-memory.session-store :as sess]
   [bumblebee.mqtt.store.in-memory.subscription-store :as subs]
   [bumblebee.mqtt.system :as system]
   [clojure.string :as str])
  (:import
   [io.netty.bootstrap Bootstrap ServerBootstrap]
   [io.netty.channel
    Channel
    ChannelHandler
    ChannelInitializer
    ChannelOption
    ChannelPipeline
    EventLoopGroup
    SimpleChannelInboundHandler
    WriteBufferWaterMark]
   [io.netty.channel.nio NioEventLoopGroup]
   [io.netty.channel.socket.nio NioServerSocketChannel NioSocketChannel]
   [io.netty.handler.codec.mqtt
    MqttDecoder
    MqttEncoder
    MqttMessage
    MqttMessageBuilders
    MqttVersion]
   [io.netty.handler.logging LogLevel LoggingHandler]
   [io.netty.handler.ssl SslContext SslContextBuilder]
   [io.netty.handler.ssl.util InsecureTrustManagerFactory]
   [java.net InetSocketAddress]))

(def ^:private option->coercer
  {ChannelOption/SO_RCVBUF              int
   ChannelOption/SO_SNDBUF              int
   ChannelOption/SO_BACKLOG             int
   ChannelOption/CONNECT_TIMEOUT_MILLIS int
   ChannelOption/TCP_NODELAY            boolean
   ChannelOption/SO_REUSEADDR           boolean
   ChannelOption/SO_KEEPALIVE           boolean
   ChannelOption/AUTO_READ              boolean
   ChannelOption/WRITE_BUFFER_WATER_MARK #(cond
                                            (instance? WriteBufferWaterMark %) %
                                            (and (sequential? %) (= 2 (count %)))
                                            (let [[low high] %]
                                              (WriteBufferWaterMark. (int low) (int high)))
                                            :else (throw (ex-info "Invalid water mark" {:value %})))
   })

(defn set-child-options! [^io.netty.bootstrap.ServerBootstrap sb opts]
  (doseq [[opt v] opts]
    (let [coerce (get option->coercer opt identity)]
      (.childOption sb opt (coerce v))))
  sb)

(defn- start!
  "Start a single Netty server channel for the given protocol/port.
  Returns the bound Channel or nil if port is not positive."
  [{:keys [^EventLoopGroup boss ^EventLoopGroup worker socket-class ^SslContext ssl-context config stores]} protocol port use-ssl?]
  (when (and (number? port) (> (int port) 0))
    (if (and use-ssl? (nil? ssl-context))
      (do
        (println "[MQTT] SSL port" port "requested but no SslContext provided — skipping bind.")
        (println "       Use user/mqtt-start-ssl-pem! or pass ssl-ctx to server/start.")
        nil)
      (do
        (println "Starting server with :protocol-type" protocol)
        (let [channel (ch-init/new-channel-initializer {:use-ssl?               use-ssl?
                                                        :protocol-type          protocol
                                                        :config                 config
                                                        :ssl-context            ssl-context
                                                        :messages-dispatcher-fn #(md/new-messages-dispatcher {:config config :stores stores})})
              bootstrap (doto (ServerBootstrap.)
                          (.group boss worker)
                          (.channel socket-class)
                          (.handler (LoggingHandler. LogLevel/INFO))
                          (.childHandler channel))
              _ (doto bootstrap
                  (.childOption ChannelOption/TCP_NODELAY true)
                  (.childOption ChannelOption/SO_KEEPALIVE true)
                  (.childOption ChannelOption/SO_RCVBUF (int 65536))
                  (.childOption ChannelOption/SO_SNDBUF (int 65536))
                  (.option ChannelOption/SO_REUSEADDR true)
                  (.option ChannelOption/SO_BACKLOG (int 1024)))
              hostname (get-in config [:mqtt-config :hostname])
              addr (if (and (string? hostname) (not (str/blank? hostname)))
                     (InetSocketAddress. ^String hostname (int port))
                     (InetSocketAddress. (int port)))
              ch (-> (.bind bootstrap addr)
                     (.syncUninterruptibly)
                     (.channel))]
          ch)))))

(defn start
  "Start MQTT server channels based on config.
  Returns a server state map suitable for `stop`."
  ([] (start (cfg/get-config) nil))
  ([config ^SslContext ssl-context]
   (let [boss (NioEventLoopGroup.)
         worker (NioEventLoopGroup.)
         socket-class NioServerSocketChannel
         stores {:session-store      (sess/init)
                 :subscription-store (subs/init)
                 :dup-pub-store      (dup/init)
                 :message-id-store   (mid/init)
                 :retain-store       (retain/init)
                 :node-name          (-> config :mqtt-config :node-name)}
         metrics-interval (get-in config [:mqtt-config :system-stats-interval-ms] 5000)
         reporter (when (and metrics-interval (pos? (long metrics-interval)))
                    (system/start-reporter! stores metrics-interval))
         _ (when (seq (get-in config [:mqtt-config :filters]))
             ;; If filters are declared in config, reset and register them to
             ;; avoid duplicate entries across hot restarts in dev.
             (fx/clear!)
             (fx/register-from-config! config))
         base {:boss boss :worker worker :socket-class socket-class :ssl-context ssl-context :config config :stores stores}
         tcp-ch (start! base :tcp (get-in config [:mqtt-config :tcp-port]) false)
         tcp-ssl-ch (start! base :tcp (get-in config [:mqtt-config :tcp-ssl-port]) true)
         ws-ch (start! base :web-socket (get-in config [:mqtt-config :web-socket-port]) false)
         ws-ssl-ch (start! base :web-socket (get-in config [:mqtt-config :web-socket-ssl-port]) true)
         started? (some some? [tcp-ch tcp-ssl-ch ws-ch ws-ssl-ch])]
     (when-not started?
       ;; No listeners started, shut groups immediately
       (.shutdownGracefully boss)
       (.shutdownGracefully worker))
     {:boss                   boss
      :worker                 worker
      :socket-class           socket-class
      :ssl-context            ssl-context
      :config                 config
      :tcp-channel            tcp-ch
      :tcp-ssl-channel        tcp-ssl-ch
      :web-socket-channel     ws-ch
      :web-socket-ssl-channel ws-ssl-ch
      :system-reporter        reporter})))

(defn stop
  "Stop all channels and shutdown event loop groups."
  [{:keys [^EventLoopGroup boss ^EventLoopGroup worker
           ^Channel tcp-channel ^Channel tcp-ssl-channel
           ^Channel web-socket-channel ^Channel web-socket-ssl-channel
           system-reporter]}]
  (let [chs (remove nil? [tcp-channel tcp-ssl-channel web-socket-channel web-socket-ssl-channel])]
    (when system-reporter
      (try
        (system/stop-reporter! system-reporter)
        (catch Throwable ex
          (println "[MQTT] failed to stop system reporter" (.getMessage ex)))))
    ;; First, actively close channels so their closeFuture completes.
    (doseq [^Channel ch chs]
      (.close ch))
    ;; Then, wait for channel closures to complete.
    (doseq [^Channel ch chs]
      (-> (.closeFuture ch) (.syncUninterruptibly)))
    ;; Finally, shutdown event loop groups and wait for termination.
    (when boss (-> (.shutdownGracefully boss) (.syncUninterruptibly)))
    (when worker (-> (.shutdownGracefully worker) (.syncUninterruptibly)))
    :stopped))

(comment
  (require '[bumblebee.mqtt.config :as mqtt-cfg])
  ;; Minimal manual run (binds TCP 1883 by default config)
  (def state (start))
  ;; ... connect with an MQTT client ...
  (let [group (NioEventLoopGroup.)
        result (promise)
        handler (proxy [SimpleChannelInboundHandler] [MqttMessage]
                  (channelRead0 [_ctx msg]
                    (deliver result msg)))
        bootstrap (doto (Bootstrap.)
                    (.group group)
                    (.channel NioSocketChannel)
                    (.handler
                      (proxy [ChannelInitializer] []
                        (initChannel [^io.netty.channel.Channel ch]
                          (let [^ChannelPipeline p (.pipeline ch)
                                ^"[Lio.netty.channel.ChannelHandler;" hs (into-array ChannelHandler [(MqttDecoder.) MqttEncoder/INSTANCE handler])]
                            (.addLast p hs))))))
        port (int (get-in (cfg/get-config) [:mqtt-config :tcp-port]))
        ^Channel ch (-> (.connect bootstrap (InetSocketAddress. "127.0.0.1" port))
                        (.sync)
                        (.channel))
        connect-msg (-> (MqttMessageBuilders/connect)
                        (.protocolVersion MqttVersion/MQTT_3_1_1)
                        (.clientId "client-1")
                        (.username "user")
                        (.password (.getBytes "pass"))
                        (.cleanSession true)
                        (.build))]
    (.writeAndFlush ch connect-msg)
    (let [^MqttMessage resp (deref result 2000 nil)]
      (println "Client received message type:" (when resp (.. resp fixedHeader messageType toString))))
    (.close ch)
    (-> (.shutdownGracefully group) (.syncUninterruptibly)))
  ;; Stop server
  (stop state)

  ;; TLS client test against tcp-ssl-port (e.g., 8884)
  ;; Requires server started with SSL context and tcp-ssl-port > 0.
  (def state (start (-> (cfg/get-config)
                        (assoc-in [:mqtt-config :tcp-ssl-port] 8884))
                    ;; For demo, reuse nil here if you start with user helpers that pass ssl-ctx.
                    nil))
  (let [group (NioEventLoopGroup.)
        result (promise)
        handler (proxy [SimpleChannelInboundHandler] [MqttMessage]
                  (channelRead0 [_ctx msg]
                    (deliver result msg)))
        ;; For quick local testing, trust all. In production, prefer trustManager(File caCert).
        client-ssl (.. (SslContextBuilder/forClient)
                       (trustManager InsecureTrustManagerFactory/INSTANCE)
                       build)
        bootstrap (doto (Bootstrap.)
                    (.group group)
                    (.channel NioSocketChannel)
                    (.handler
                      (proxy [ChannelInitializer] []
                        (initChannel [^io.netty.channel.Channel ch]
                          (let [^ChannelPipeline p (.pipeline ch)]
                            (.addLast p (.newHandler client-ssl (.alloc ch)))
                            (.addLast p (into-array ChannelHandler [(MqttDecoder.) MqttEncoder/INSTANCE handler])))))))
        port (int (get-in (cfg/get-config) [:mqtt-config :tcp-ssl-port]))
        ^Channel ch (-> (.connect bootstrap (InetSocketAddress. "127.0.0.1" port))
                        (.sync)
                        (.channel))
        connect-msg (-> (MqttMessageBuilders/connect)
                        (.protocolVersion MqttVersion/MQTT_3_1_1)
                        (.clientId "client-ssl")
                        (.cleanSession true)
                        (.build))]
    (.writeAndFlush ch connect-msg)
    (let [^MqttMessage resp (deref result 3000 nil)]
      (println "TLS client received message type:" (when resp (.. resp fixedHeader messageType toString))))
    (.close ch)
    (-> (.shutdownGracefully group) (.syncUninterruptibly))
    (stop state))

  (def config mqtt-cfg/get-config)

  (def stores {:session-store      (sess/init)
               :subscription-store (subs/init)
               :dup-pub-store      (dup/init)
               :message-id-store   (mid/init)
               :retain-store       (retain/init)
               :node-name          (-> config :mqtt-config :node-name)})


  (system/start-reporter! stores 5000))



