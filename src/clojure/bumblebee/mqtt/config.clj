(ns bumblebee.mqtt.config (:require [clojure.spec.alpha :as s]
                           [bumblebee.mqtt.constants :as const])
    (:import [java.util UUID]))

(defn generate-uuid []
  (str (UUID/randomUUID)))

(s/def ::version string?)
(s/def ::key-file (s/nilable string?))
(s/def ::key-store-type (s/nilable string?))
(s/def ::manager-pwd (s/nilable string?))
(s/def ::store-pwd (s/nilable string?))
(s/def ::enable-client-ca boolean?)

(s/def ::ssl-context (s/keys :req-un [::key-file ::key-store-type ::manager-pwd ::store-pwd ::enable-client-ca]))

(s/def ::config (s/keys :req-un [::version ::ssl-context]))

(def config (atom {:version "0.0.1"
                   :ssl-context {:key-file nil
                                 :key-store-type nil
                                 :manager-pwd nil
                                 :store-pwd nil
                                 :enable-client-ca false}
                   :mqtt-config {:tcp-port 1883
                                 :tcp-ssl-port 8884
                                 :node-name (generate-uuid)
                                 :web-socket-path const/default-websocket-path
                                 :web-socket-port 8883
                                 :web-socket-ssl-port -1
                                 :hostname "127.0.0.1"
                                 :storage-provider const/default-storage-type
                                 :system-stats-interval-ms 5000
                                 ;; Optional: list of filters to auto-register at startup
                                 ;; [{:name :deny-all
                                 ;;   :priority 0
                                 ;;   :impl 'bumblebee.mqtt.filters.impl/make-deny-all-filter
                                 ;;   :args []
                                 ;;   :validate? true}]
                                 :filters []}}))

(defn get-config [] @config)

(defn valid? [config]
  (if (s/valid? ::config config)
    true
    (do
      (println "Invalid configuration!")
      (s/explain ::config config))))

(comment
  (get-config))
