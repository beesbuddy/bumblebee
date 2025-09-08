(ns bumblebee.mqtt.store.in-memory-messages-id-store
  (:require [bumblebee.mqtt.core :as c]))
;; MQTT message identifiers are 16-bit unsigned integers in the range 1..65535.
;; 0 is not a valid Packet Identifier. We generate IDs sequentially and wrap
;; back to 1 after reaching 65535.
;; Note: Without a "release" API, this guarantees monotonic IDs with wrap, but
;; not de-duplication across in-flight messages. That would require tracking
;; allocations and frees.

(def ^:private max-packet-id 65535)

(deftype InMemoryMessagesIdStore [config counter]
  c/IMessagesIdStore
  (get-next-message-id [_]
    ;; Atomically increment and wrap within 1..65535
    (swap! counter (fn [n]
                     (let [next (inc (long (or n 0)))
                           next' (if (> next max-packet-id) 1 next)]
                       next'))))
  c/ICloseableStore
  (close [_]
    (print (str "On in memory messages id storage close with config: " config))))

(defn new-in-memory-message-id-store
  ([] (InMemoryMessagesIdStore. {} (atom 0)))
  ([config] (InMemoryMessagesIdStore. config (atom 0))))

(comment
  (->InMemoryMessagesIdStore {} (atom 0))
  (def in-memory-messages-id-storage (new-in-memory-message-id-store))
  (repeatedly 5 #(c/get-next-message-id in-memory-messages-id-storage))
  (c/close in-memory-messages-id-storage))
