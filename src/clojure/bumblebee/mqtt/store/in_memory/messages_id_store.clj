(ns bumblebee.mqtt.store.in-memory.messages-id-store
  (:require [bumblebee.mqtt.core :as c]))
;; MQTT message identifiers are 16-bit unsigned integers in the range 1..65535.
;; 0 is not a valid Packet Identifier. We generate IDs sequentially and wrap
;; back to 1 after reaching 65535.
;; Note: Without a "release" API, this guarantees monotonic IDs with wrap, but
;; not de-duplication across in-flight messages. That would require tracking
;; allocations and frees.

(def ^:private max-packet-id 65535)

(defn- next-id [current]
  (let [candidate (inc (long (or current 0)))]
    (if (> candidate max-packet-id) 1 candidate)))

(defn- bump-counter! [counters client-id]
  (let [cid (or client-id ::global)
        result (atom 0)]
    (swap! counters
           (fn [m]
             (let [next (next-id (get m cid 0))]
               (reset! result next)
               (assoc m cid next))))
    @result))

(deftype InMemoryMessagesIdStore [config counters]
  c/IMessagesIdStore
  (get-next-message-id [_ client-id]
    (bump-counter! counters client-id))
  c/ICloseableStore
  (close [_]
    (print (str "On in memory messages id storage close with config: " config))))

(defn init
  ([] (InMemoryMessagesIdStore. {} (atom {})))
  ([config] (InMemoryMessagesIdStore. config (atom {}))))

(comment
  (def in-memory-messages-id-storage (init))
  ;; (repeatedly 5 #(c/get-next-message-id in-memory-messages-id-storage nil))
  ;; (repeatedly 5 #(c/get-next-message-id in-memory-messages-id-storage "client-42"))
  (c/close in-memory-messages-id-storage))
