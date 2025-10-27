(ns bumblebee.ui.core
  (:require
   [bumblebee.ui.auth :as auth]
   [bumblebee.ui.chunks :as chunks]
   [bumblebee.ui.components.navbar :as navbar]
   [bumblebee.ui.router :as router]
   #_{:clj-kondo/ignore [:unused-namespace]}
   ["react" :as react]
   [uix.core :refer [$ defui] :as uix]
   [uix.dom :as dom]
   [uix.preload]))

(def route->component
  {:home chunks/Home
   :about chunks/About
   :admin chunks/Admin
   :mqtt-lab chunks/MqttLab
   :login chunks/Login})

(defui app-root []
  (let [[route set-route] (uix.core/use-state @router/current)
        [authed set-authed] (uix.core/use-state (auth/authed?))]
    (uix.core/use-effect
      (fn []
        (auth/load!)
        (router/start!)
        (let [_ (add-watch router/current ::root (fn [_ _ _ v] (set-route v)))
              _ (add-watch auth/state ::auth (fn [_ _ _ _] (set-authed (auth/authed?))))]
          (fn []
            (remove-watch router/current ::root)
            (remove-watch auth/state ::auth)
            (router/stop!))))
      [])
    (let [name (get-in route [:data :name])
          requires-auth? (true? (get-in route [:data :requires-auth]))
          unauthorized? (and requires-auth? (not authed))
          Page (get route->component name chunks/Home)]
      (uix.core/use-effect
        (fn []
          (when unauthorized?
            (auth/set-redirect! {:name name
                                 :params (:path-params route)
                                 :query (:query-params route)})
            (router/navigate! :login))
          js/undefined)
        [route unauthorized? name])
      ($ :<>
         ($ navbar/navbar)
         ($ :main {:className "container py-6"}
            ($ Page))))))

(defonce root* (atom nil))

(defn- ensure-root! []
  (when (nil? @root*)
    (when-let [el (js/document.getElementById "app")]
      (js/console.log "[ui] creating root @ #app")
      (reset! root* (uix.dom/create-root el))))
  @root*)


(defn mount! []
  (when-let [root (ensure-root!)]
    (js/console.log "[ui] mount! rendering")
    (uix.dom/render-root
     ($ uix/strict-mode
        ($ app-root))
     root)))

(defn render []
  (mount!))


(defn ^:export init []
  (js/console.log "[ui] init called")
  (router/start!)
  (render))

;; Ensure initial mount even if :init-fn hook isn't triggered.
(try
  (init)
  (catch :default _))
