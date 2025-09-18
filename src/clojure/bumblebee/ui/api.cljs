(ns bumblebee.ui.api
  (:require ["axios" :as axios]
            [bumblebee.ui.auth :as auth]))

(defonce client
  (doto (axios/create #js {})
    (.interceptors.request.use
      (fn [config]
        (when-let [t (:token @auth/state)]
          (set! (.. config -headers -Authorization) (str "Bearer " (:access t))))
        config))))

(defn get-json [url]
  (.then (.get client url) (fn [resp] (.-data resp))))
