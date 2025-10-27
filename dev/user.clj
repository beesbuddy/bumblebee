(ns user
  (:require
   [bumblebee.main :as main]
   [bumblebee.mqtt.config :as mqtt-cfg]
   [bumblebee.mqtt.filters :as filters]
   [bumblebee.mqtt.filters.impl :as implemented-filters]
   [bumblebee.mqtt.server :as mqtt-srv]
   [clojure.tools.namespace.repl :refer [refresh set-refresh-dirs]]
   [hawk.core :as hawk])
  (:import
   [io.netty.bootstrap Bootstrap]
   [io.netty.channel
    Channel
    ChannelHandler
    ChannelHandlerContext
    ChannelInitializer
    ChannelPipeline
    SimpleChannelInboundHandler]
   [io.netty.channel.nio NioEventLoopGroup]
   [io.netty.channel.socket.nio NioSocketChannel]
   [io.netty.handler.codec.mqtt
    MqttConnAckMessage
    MqttConnAckVariableHeader
    MqttDecoder
    MqttEncoder
    MqttMessage
    MqttMessageBuilders
    MqttVersion]
   [io.netty.handler.ssl SslContextBuilder]
   [io.netty.handler.ssl.util InsecureTrustManagerFactory SelfSignedCertificate]
   [java.io File FileInputStream]
   [java.net InetSocketAddress]
   [java.security KeyStore]
   [javax.net.ssl KeyManagerFactory]))

(defonce watcher (atom nil))

(defn start []
  ;; Start your app. Adjust if you have a different entry point.
  (main/-main))

(defn reset []
  (set-refresh-dirs "src/clojure" "dev")
  (refresh :after 'user/start))

(defn watch! []
  (when-not @watcher
    (set-refresh-dirs "src/clojure" "dev")
    (reset! watcher
            (hawk/watch! [{:paths ["src/clojure" "dev"]
                           :handler (fn [ctx e]
                                      (when (#{:create :modify :delete} (:kind e))
                                        (future (reset)))
                                      ctx)}]))))

(defn unwatch! []
  (when-let [w @watcher]
    (hawk/stop! w)
    (reset! watcher nil)))

; --- MQTT server POC helpers ---
;; Build SSL context from PEM key/cert files
(defn make-ssl-ctx-from-pem [^String cert-path ^String key-path]
  (let [cert (File. cert-path)
        key  (File. key-path)]
    (.build (SslContextBuilder/forServer cert key))))

;; Build SSL context from PKCS12 keystore file
(defn make-ssl-ctx-from-p12 [^String p12-path ^String store-pass]
  (let [ks (doto (KeyStore/getInstance "PKCS12")
             (.load (FileInputStream. (File. p12-path)) (.toCharArray store-pass)))
        kmf (doto (KeyManagerFactory/getInstance (KeyManagerFactory/getDefaultAlgorithm))
              (.init ks (.toCharArray store-pass)))]
    (.build (SslContextBuilder/forServer kmf))))

(defonce mqtt-state (atom nil))

(defn mqtt-stop! []
  (when-let [st @mqtt-state]
    (mqtt-srv/stop st)
    (reset! mqtt-state nil)))

(defn mqtt-start!
  "Start MQTT server.

  Arity:
  - []                        -> start with current config, no SSL context
  - [config ssl-ctx]          -> backward-compatible exact start
  - [opts-map]                -> unified options start

  opts-map keys (all optional):
  - :config map                         use as base config (defaults to (mqtt-cfg/get-config))
  - :ssl? boolean                       when true, try to use/provide SSL context for SSL listeners
  - :ssl-context io.netty.handler.ssl.SslContext  explicit context to use
  - :self-signed? boolean               create a dev self-signed context when true
  - :pem-cert string, :pem-key string   build SSL context from PEM files
  - :p12-path string, :p12-pass string  build SSL context from PKCS12 keystore
  If multiple context sources are provided, precedence is: :ssl-context > PEM > P12 > :self-signed?."
  ([] (mqtt-start! (mqtt-cfg/get-config) nil))
  ([opts]
   (if (and (map? opts)
            (some #(contains? opts %)
                  [:config :ssl? :ssl-context :self-signed? :pem-cert :pem-key :p12-path :p12-pass]))
     (let [{:keys [config ssl? ssl-context self-signed? pem-cert pem-key p12-path p12-pass]
            :or   {config (mqtt-cfg/get-config)}} opts
           ;; Build SSL context if requested and not explicitly provided
           ssl-ctx (cond
                     ssl-context ssl-context
                     (and pem-cert pem-key) (make-ssl-ctx-from-pem pem-cert pem-key)
                     (and p12-path p12-pass) (make-ssl-ctx-from-p12 p12-path p12-pass)
                     self-signed? (try
                                    (let [ssc (SelfSignedCertificate.)]
                                      (.build (SslContextBuilder/forServer (.certificate ssc) (.privateKey ssc))))
                                    (catch UnsupportedOperationException _ nil))
                     :else nil)]
       (mqtt-stop!)
       (reset! mqtt-state (mqtt-srv/start config (when ssl? ssl-ctx))))
     ;; treat as config map for backward-compat
     (mqtt-start! opts nil)))
  ([config ssl-ctx]
   (mqtt-stop!)
   (reset! mqtt-state (mqtt-srv/start config ssl-ctx))))

;; MQTT client: works with plain or SSL based on options
;; Options map keys (all optional):
;; - :host string (default "127.0.0.1")
;; - :port int (default tcp-port for plain, tcp-ssl-port for ssl?)
;; - :client-id string (default "client-unified")
;; - :ssl? boolean (default: if omitted, inferred by matching port to tcp-ssl-port)
;; - :insecure? boolean (default true when ssl? to mimic mqtt-client-connect-ssl-insecure!)
;; - :ssl-context io.netty.handler.ssl.SslContext (overrides :insecure?)
(defn inspect-client-connect!
  ([] (inspect-client-connect! {}))
  ([{:keys [host port client-id ssl? insecure? ssl-context]
     :or   {host "127.0.0.1"
            client-id "noop-id"}}]
   (let [cfg (mqtt-cfg/get-config)
         tcp-port (int (get-in cfg [:mqtt-config :tcp-port]))
         tls-port (int (get-in cfg [:mqtt-config :tcp-ssl-port]))
         ssl? (if (some? ssl?) ssl? (= (int (or port tls-port)) tls-port))
         port (int (or port (if ssl? tls-port tcp-port)))
         insecure? (if (some? insecure?) insecure? true)
         group (NioEventLoopGroup.)
         result (promise)
         handler (proxy [SimpleChannelInboundHandler] [MqttMessage]
                   (channelRead0 [_ctx msg]
                     (deliver result msg)))
         bootstrap (doto (Bootstrap.)
                     (.group group)
                     (.channel NioSocketChannel)
                     (.handler
                      (proxy [ChannelInitializer] []
                        (initChannel [^Channel ch]
                          (let [^ChannelPipeline p (.pipeline ch)
                                ^"[Lio.netty.channel.ChannelHandler;" hs (into-array ChannelHandler [(MqttDecoder.) MqttEncoder/INSTANCE handler])]
                            (when ssl?
                              (let [ctx (or ssl-context
                                            (if insecure?
                                              (.. (SslContextBuilder/forClient)
                                                  (trustManager InsecureTrustManagerFactory/INSTANCE)
                                                  build)
                                              (.build (SslContextBuilder/forClient))))]
                                (.addLast p "ssl" (.newHandler ctx (.alloc ch)))))
                            (.addLast p hs))))))
         ^Channel ch (-> (.connect bootstrap (java.net.InetSocketAddress. host port))
                         (.sync)
                         (.channel))
         connect-msg (-> (MqttMessageBuilders/connect)
                         (.protocolVersion MqttVersion/MQTT_3_1_1)
                         (.clientId client-id)
                         (.cleanSession true)
                         (.build))]
     (.writeAndFlush ch connect-msg)
     (let [^MqttMessage resp (deref result 3000 nil)
           mt (when resp (-> resp .fixedHeader .messageType .toString))
           code (when (= mt "CONNACK")
                  (let [vh (.variableHeader ^MqttConnAckMessage resp)]
                    (str (.connectReturnCode ^MqttConnAckVariableHeader vh))))
           session-present? (when (= mt "CONNACK")
                              (let [vh (.variableHeader ^MqttConnAckMessage resp)]
                                (boolean (.isSessionPresent ^MqttConnAckVariableHeader vh))))]
       (println (str (if ssl? "SSL" "Plain") " client received message type:") mt (when code (str " code=" code)))
       (.close ch)
       (-> (.shutdownGracefully group) .syncUninterruptibly)
       {:message-type mt
        :return-code code
        :session-present session-present?
        :ok (= mt "CONNACK")}))))

;; --- Filter toggles ---
;; Quickly enable/disable deny-all behavior during dev runs.

(defn deny-all-on!
  ([] (deny-all-on! 0))
  ([priority]
   (implemented-filters/enable-deny-all! priority)))

(defn deny-all-off! []
  (filters/remove! ::filters/deny-all))

;; Demo filter toggles (uses :types + :when)
;; (defn demo-filter-on!
;;   ([] (demo-filter-on! 10))
;;   ([priority]
;;    (fdemo/enable! priority)))

;; (defn demo-filter-off! []
;;   (fdemo/disable!))

;; Predicate used with :when to run filter only for loopback clients
(defn loopback?
  [ev]
  (let [^ChannelHandlerContext ctx (:ctx ev)
        ch (when ctx (.channel ctx))
        addr (when ch (.remoteAddress ch))
        host (when (instance? InetSocketAddress addr)
               (.getHostString ^InetSocketAddress addr))]
    (boolean (#{"127.0.0.1" "::1"} host))))

#_(def not-loopback? (complement loopback?))

;; Filter body: deny publish/subscribe (a demo behavior)
(defn make-deny-pub-sub-filter
  []
  (fn [{:keys [type] :as ev}]
    (if (#{:publish :subscribe} type)
      {:action :deny}
      {:action :next :event ev})))

(defn make-allow-local-filter []
  (fn [evt] {:action :next :event evt}))

(defn disable-demo!
  []
  (filters/remove! ::demo))

;; Enable/disable helpers demonstrating :types + :when usage
(defn enable-demo!
  ([] (enable-demo! 10))
  ([priority]
   (filters/add! ::allow-all-loopback priority (make-allow-local-filter)
                 {:types #{:connect :publish :subscribe}
             :when loopback?})))

(comment
  ;; Manual workflow
  (start)
  (reset)

  ;; Auto-reload on file changes
  (watch!)
  (unwatch!)

  ;; Check filter logic
  (deny-all-on!)
  (deny-all-off!)

  (filters/show)

  (enable-demo! 10)
  (disable-demo!)

  ;; Check mqtt part
  (mqtt-start! {:pem-key "key_pkcs8.pem" :pem-cert "cert.pem" :ssl? true})
  (mqtt-start!)
  (mqtt-stop!)
  (inspect-client-connect! {:ssl? true}))

(comment
  (require
   '[bumblebee.mqtt.system :as system]
   '[bumblebee.mqtt.store.in-memory-session-store :as sess]
   '[bumblebee.mqtt.store.in-memory-subscription-store :as subs]
   '[bumblebee.mqtt.store.in-memory-dup-pub-messages-store :as dup]
   '[bumblebee.mqtt.store.in-memory-messages-id-store :as mid]
   '[bumblebee.mqtt.store.in-memory-retain-store :as retain])
  
  (let [stores {:session-store (sess/init)
                :subscription-store (subs/init)
                :dup-pub-store (dup/init)
                :message-id-store (mid/init)
                :retain-store (retain/init)
                :node-name "node-1"}]
    (with-redefs [system/publish-metrics! (fn [_]
                                            (println "publishing...")
                                            (throw (RuntimeException. "boom")))]
      (let [reporter (system/start-reporter! stores 200)]
        (Thread/sleep 900)
        (system/stop-reporter! reporter))))

  )



(comment
  (require
   '[bumblebee.mqtt.store.in-memory.session-store :as sess]
   '[bumblebee.mqtt.store.in-memory.subscription-store :as subs]
   '[bumblebee.mqtt.store.in-memory.dup-pub-messages-store :as dup]
   '[bumblebee.mqtt.store.in-memory.messages-id-store :as mid]
   '[bumblebee.mqtt.store.in-memory.retain-store :as retain])
  
  (let [stores {:session-store (sess/init)
                :subscription-store (subs/init)
                :dup-pub-store (dup/init)
                :message-id-store (mid/init)
                :retain-store (retain/init)
                :node-name "node-1"}
        counter (atom 0)]
    (with-redefs [system/publish-metrics! (fn [_]
                                            (swap! counter inc)
                                            (println (str "publishing..." @counter))
                                            (throw (RuntimeException. "boom")))]
      (let [reporter (system/start-reporter! stores 1000)]
        (Thread/sleep 3500)
        (system/stop-reporter! reporter)
        (println "final count" @counter))))

  )