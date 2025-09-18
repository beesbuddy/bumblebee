(ns bumblebee.mqtt.store.in-memory-subscription-store
  (:require
   [clojure.set :as set]
   [clojure.string :as str]))

(defn init []
  ;; Two indexes:
  ;; - topics -> {topic {client-id -> subscription}}
  ;; - clients -> set of topic strings
  {:topics  (atom {})
   :clients (atom {})})

(defn- add-to-set [s v]
  (if (contains? s v) s (conj s v)))

(defn add-subscription [store sub]
  (let [topic (:topic sub)
        client-id (:client-id sub)
        updated (swap! (:topics store)
                       (fn [m]
                         (update m topic (fnil assoc {}) client-id sub)))
        added? (= (get-in updated [topic client-id]) sub)]
    (swap! (:clients store)
           (fn [m]
             (update m client-id (fnil add-to-set #{}) topic)))
    added?))

(defn remove-subscription [store sub]
  (let [topic (:topic sub)
        client-id (:client-id sub)]
    (swap! (:topics store)
           (fn [m]
             (let [cur (get m topic {})
                   nxt (dissoc cur client-id)]
               (if (empty? nxt) (dissoc m topic) (assoc m topic nxt)))))
    (swap! (:clients store)
           (fn [m]
             (let [cur (get m client-id #{})
                   nxt (disj cur topic)]
               (if (empty? nxt) (dissoc m client-id) (assoc m client-id nxt)))))
    true))

(defn remove-all-subscriptions [store client-id]
  (let [topics (get @(:clients store) client-id #{})]
    (doseq [t topics]
      (swap! (:topics store)
             (fn [m]
               (let [cur (get m t {})
                     nxt (dissoc cur client-id)]
                 (if (empty? nxt) (dissoc m t) (assoc m t nxt))))))
    (swap! (:clients store) dissoc client-id)
    true))

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

(defn match-subscriptions [store ^String topic]
  (let [by-topic @(:topics store)]
    (vec (mapcat (fn [[t subs-by-client]]
                   (when (match-topic? t topic)
                     (vals subs-by-client)))
                 by-topic))))
