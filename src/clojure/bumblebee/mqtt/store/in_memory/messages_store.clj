(ns bumblebee.mqtt.store.in-memory.messages-store
  (:require
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.store.in-memory.messages-id-store :as messages-id-storage]))

(deftype InMemoryMessagesStore [config message-id-store]
  core/IMessagesIdStore
  (get-next-message-id [_ client-id]
    (core/get-next-message-id message-id-store client-id))
  core/ICloseableStore
  (close [_] (core/close message-id-store)))

;; Initialization helpers (positional arities)
(defn init
  ;; No args: create default config and ID store
  ([]
   (let [config {}
         id-store (messages-id-storage/init config)]
     (->InMemoryMessagesStore config id-store)))
  ;; One arg: config only, create ID store
  ([config]
   (->InMemoryMessagesStore config (messages-id-storage/init config)))
  ;; Two args: config and explicit ID store
  ([config message-id-store]
   (->InMemoryMessagesStore config message-id-store)))

(comment 
  (def in-memory-messages-storage (init {:test ""}))
  ;; (core/get-next-message-id in-memory-messages-storage nil)
  ;; (core/get-next-message-id in-memory-messages-storage "client-a")
  (core/close in-memory-messages-storage))
