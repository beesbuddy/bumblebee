(ns bumblebee.mqtt.store.in-memory.subscription-store
  (:require
    [clojure.string :as str]
    [bumblebee.mqtt.core :as core])
  (:import (clojure.lang Atom)))

(defn- add-to-set [s v]
  (if (contains? s v) s (conj s v)))

(defn- match-topic?
  "Simple MQTT wildcard matching supporting + and #."
  [^String filter ^String topic]
  (let [f-segs (str/split filter #"/")
        t-segs (str/split topic #"/")]
    (loop [f f-segs t t-segs]
      (cond
        (empty? f) (empty? t)
        (= (first f) "#") true
        (empty? t) false
        (= (first f) "+") (recur (rest f) (rest t))
        (= (first f) (first t)) (recur (rest f) (rest t))
        :else false))))

(deftype InMemorySubscriptionStore [^Atom topics ^Atom clients]
  core/ISubscriptionStore
  (add-subscription [_ sub]
    (let [topic (:topic sub)
          client-id (:client-id sub)
          updated (swap! topics
                         (fn [m]
                           (update m topic (fnil assoc {}) client-id sub)))
          added? (= (get-in updated [topic client-id]) sub)]
      (swap! clients
             (fn [m]
               (update m client-id (fnil add-to-set #{}) topic)))
      added?))

  (remove-subscription [_ sub]
    (let [topic (:topic sub)
          client-id (:client-id sub)]
      (swap! topics
             (fn [m]
               (let [cur (get m topic {})
                     nxt (dissoc cur client-id)]
                 (if (empty? nxt) (dissoc m topic) (assoc m topic nxt)))))
      (swap! clients
             (fn [m]
               (let [cur (get m client-id #{})
                     nxt (disj cur topic)]
                 (if (empty? nxt) (dissoc m client-id) (assoc m client-id nxt)))))
      true))

  (remove-all-subscriptions [_ client-id]
    (let [client-topics (get @clients client-id #{})]
      (doseq [topic client-topics]
        (swap! topics
               (fn [m]
                 (let [cur (get m topic {})
                       nxt (dissoc cur client-id)]
                   (if (empty? nxt) (dissoc m topic) (assoc m topic nxt))))))
      (swap! clients dissoc client-id)
      true))

  (match-subscriptions [_ topic]
    (let [by-topic @topics]
      (vec (mapcat (fn [[stored-topic subs-by-client]]
                     (when (match-topic? stored-topic topic)
                       (vals subs-by-client)))
                   by-topic))))

  core/ICloseableStore
  (close [_]))

(defn init []
  (->InMemorySubscriptionStore (atom {}) (atom {})))
