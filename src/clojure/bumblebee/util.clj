(ns bumblebee.util)

(defn add-shutdown-hook! [f]
  (.addShutdownHook (Runtime/getRuntime)
                    (Thread. f)))