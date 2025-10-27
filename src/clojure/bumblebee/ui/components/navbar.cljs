(ns bumblebee.ui.components.navbar
  (:require [uix.core :refer [$ defui use-effect use-state]]
            [bumblebee.ui.router :as router]
            [bumblebee.ui.chunks :as chunks]
            [bumblebee.ui.auth :as auth]))

(defui navbar []
  (let [[route set-route] (use-state @router/current)
        [authed set-authed] (use-state (auth/authed?))
        [remaining set-remaining] (use-state (auth/token-remaining-s))]
    (use-effect
      (fn []
        (router/start!)
        (let [_ (add-watch router/current ::nav (fn [_ _ _ v] (set-route v)))
              _ (add-watch auth/state ::auth (fn [_ _ _ _]
                                                 (set-authed (auth/authed?))
                                                 (set-remaining (auth/token-remaining-s))))
              iid (js/setInterval #(set-remaining (auth/token-remaining-s)) 1000)]
          (fn []
            (remove-watch router/current ::nav)
            (remove-watch auth/state ::auth)
            (js/clearInterval iid)
            (router/stop!))))
      [])
    (let [name (get-in route [:data :name])]
      ($ :header {:className "border-b"}
         ($ :.container {:className "py-3 flex gap-6 items-center"}
            ($ :nav {:className "flex gap-4"}
               ($ :a {:href (router/href :home)
                      :onMouseEnter chunks/preload-home
                      :className (when (= name :home) "font-bold")} "Home")
               ($ :a {:href (router/href :about)
                      :onMouseEnter chunks/preload-about
                      :className (when (= name :about) "font-bold")} "About")
               ($ :a {:href (router/href :admin)
                      :onMouseEnter chunks/preload-admin
                      :className (when (= name :admin) "font-bold")} "Admin")
               ($ :a {:href (router/href :mqtt-lab)
                      :onMouseEnter chunks/preload-mqtt
                      :className (when (= name :mqtt-lab) "font-bold")} "MQTT Lab"))
            ($ :div {:className "ml-auto flex items-center gap-3"}
               (when authed
                 ($ :span {:className "badge text-xs px-2 py-0.5 rounded bg-slate-100 border"}
                    (str "token " remaining "s")))
               (if authed
                 ($ :button {:className "px-3 py-1 border rounded"
                             :onClick auth/logout!} "Logout")
                 ($ :a {:href (router/href :login)
                        :onMouseEnter chunks/preload-login
                        :className "px-3 py-1 border rounded"} "Login")
                 )))))))
