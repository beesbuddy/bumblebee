(ns bumblebee.mqtt.store.in-memory.retain-store
  (:require
   [clojure.string :as str]
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.util :as util]))

(defn- split-topic [topic]
  (if (str/blank? topic)
    []
    (str/split topic #"/")))

(defn- match-topic?
  "Simple MQTT wildcard matching supporting + and #."
  [^String filter ^String topic]
  (let [f-segs (split-topic filter)
        t-segs (split-topic topic)]
    (loop [f f-segs t t-segs]
      (cond
        (empty? f) (empty? t)
        (= (first f) "#") true
        (= (first f) "+") (and (not (empty? t)) (recur (rest f) (rest t)))
        (and (not (empty? t)) (= (first f) (first t))) (recur (rest f) (rest t))
        :else false))))

(defn init []
  (let [messages (atom {})]
    (reify
      core/IRetainMessageStore
      (add-retain [_ msg]
        (swap! messages assoc (:topic msg) msg))
      (remove-retain [_ topic]
        (swap! messages dissoc topic))
      (match-retains [_ topic]
        (->> @messages
             (keep (fn [[stored-topic stored-msg]]
                     (when (match-topic? stored-topic topic)
                       stored-msg)))
             vec))
      core/ICloseableStore
      (close [_] nil))))

(comment
  (let [store (init)
        msg (util/make-common-publish-message :topic "sensors/1" :message-body "hi" :mqtt-qos 0)]
    (core/add-retain store msg)
    (core/match-retains store "sensors/1")
    (core/match-retains store "sensors/#")
    (core/remove-retain store "sensors/1")
    (core/match-retains store "sensors/#")))
