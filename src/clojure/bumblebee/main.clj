(ns bumblebee.main
  (:gen-class) 
  (:require
   [bumblebee.mqtt.starter :refer [mqtt-start! mqtt-stop!]]
   [bumblebee.util :refer [add-shutdown-hook!]]
   [clojure.pprint :as pprint]))

(defn trim-val [v]
  (let [s (str v)]
    (if (> (count s) 50)
      (str (subs s 0 50) "...")
      s)))

(defn pprint-trimmed [m]
  (->> m
       (map (fn [[k v]] [k (trim-val v)]))
       (into (sorted-map))
       pprint/pprint))

(defn -main
  [& _args]
  (println "Starting mqtt server")
  (let [ms (mqtt-start!)]
    (pprint-trimmed ms)
    (add-shutdown-hook! (fn []
                          (println "Stopping server...")
                          (mqtt-stop!)))))