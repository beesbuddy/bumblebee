(ns bumblebee.mqtt.store
  (:require
   [bumblebee.mqtt.store.in-memory.messages-id-store :as messages-id-store]
   [bumblebee.mqtt.store.in-memory.messages-store :as messages-store]
   [bumblebee.mqtt.config :as cfg]
   [bumblebee.mqtt.core :as core]))

(defonce instance
  (atom nil))

(defn- make-memory-instance [config]
  (messages-store/init config (messages-id-store/init config)))

(defmulti get-instance
  "Return a storage instance for the given config. Memoizes a singleton in
  `instance`. Use `close-instance!` to dispose and reset the memoized instance."
  (fn [config] (-> config :mqtt-config :storage-provider)))

(defmethod get-instance :memory [config]
  (when-not (cfg/valid? config)
    (throw (ex-info "Invalid configuration" {:config config})))
  (or @instance
      (reset! instance (make-memory-instance config))))

(defmethod get-instance :sqlite [config]
  (if (cfg/valid? config)
    (throw (ex-info "Not implemented for given type" {:type :sqlite}))
    (throw (ex-info "Invalid configuration" {:config config}))))

(defmethod get-instance :default [config]
  (throw (ex-info "Unknown storage provider"
                  {:provider (-> config :mqtt-config :storage-provider)})))

(defn close-instance! []
  (when-let [inst @instance]
    (try
      (when (satisfies? core/ICloseableStore inst)
        (core/close inst))
      (finally (reset! instance nil)))))

(comment
  (def config (cfg/get-config))
  (-> config :mqtt-config :hostname)
  (-> config :mqtt-config :storage-provider)
  (def storage (get-instance config))
  ;; (core/get-next-message-id storage)
  (close-instance!))
