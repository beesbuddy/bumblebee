(ns bumblebee.mqtt.client-id
  (:require [clojure.string :as str]))

(def max-length 23)
(def min-random-length 6)
(def default-random-length 12)
(def ^:private default-prefix "mqtt")
(def ^:private charset
  (vec "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"))
(def ^:private charset-size (count charset))
(def ^:private allowed-chars (set charset))

(defn- sanitize-prefix [prefix]
  (let [trimmed (-> (or prefix "")
                    str
                    str/trim)]
    (->> trimmed
         (filter allowed-chars)
         (apply str))))

(defn random-client-id
  "Generate an MQTT-compliant client identifier up to 23 characters long.
  Optional `prefix` will be sanitized to alphanumerics and prepended."
  ([] (random-client-id nil))
  ([prefix]
   (let [sanitized (sanitize-prefix prefix)
         base (if (seq sanitized) sanitized default-prefix)
         base-max-length (- max-length min-random-length)
         base (subs base 0 (min (count base) (max base-max-length 0)))
         available (- max-length (count base))
         random-length (cond
                         (<= available 0) 0
                         (< available min-random-length) available
                         :else (min default-random-length available))
         random-str (apply str (repeatedly random-length
                                           #(nth charset (rand-int charset-size))))]
     (str base random-str))))
