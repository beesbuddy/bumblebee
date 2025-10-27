(ns bumblebee.mqtt.starter 
  (:require
   [bumblebee.mqtt.config :as cfg]
   [bumblebee.mqtt.server :as srv]) 
  (:import
   [io.netty.handler.ssl SslContextBuilder]
   [io.netty.handler.ssl.util SelfSignedCertificate]
   [java.io File FileInputStream]
   [java.security KeyStore]
   [javax.net.ssl KeyManagerFactory]))

(defonce mqtt-state (atom nil))

(defn- make-ssl-ctx-from-pem [^String cert-path ^String key-path]
  (let [cert (File. cert-path)
        key  (File. key-path)]
    (.build (SslContextBuilder/forServer cert key))))

;; Build SSL context from PKCS12 keystore file
(defn- make-ssl-ctx-from-p12 [^String p12-path ^String store-pass]
  (let [ks (doto (KeyStore/getInstance "PKCS12")
             (.load (FileInputStream. (File. p12-path)) (.toCharArray store-pass)))
        kmf (doto (KeyManagerFactory/getInstance (KeyManagerFactory/getDefaultAlgorithm))
              (.init ks (.toCharArray store-pass)))]
    (.build (SslContextBuilder/forServer kmf))))

(defn mqtt-stop! []
  (when-let [st @mqtt-state]
    (srv/stop st)
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
  ([] (mqtt-start! (cfg/get-config) nil))
  ([opts]
   (if (and (map? opts)
            (some #(contains? opts %)
                  [:config :ssl? :ssl-context :self-signed? :pem-cert :pem-key :p12-path :p12-pass]))
     (let [{:keys [config ssl? ssl-context self-signed? pem-cert pem-key p12-path p12-pass]
            :or   {config (cfg/get-config)}} opts
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
       (reset! mqtt-state (srv/start config (when ssl? ssl-ctx))))
     ;; treat as config map for backward-compat
     (mqtt-start! opts nil)))
  ([config ssl-ctx]
   (mqtt-stop!)
   (reset! mqtt-state (srv/start config ssl-ctx))))
