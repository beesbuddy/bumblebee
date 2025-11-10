(ns bumblebee.ui.pages.login
  (:require [uix.core :refer [$ defui use-state]]
            [bumblebee.ui.auth :as auth]
            [bumblebee.ui.router :as router]
            [bumblebee.ui.components.spinner :as spinner]))

(defn- format-redirect-destination [{:keys [name params query]}]
  (when name
    (let [path (router/href name params query)]
      (if (string? path) path (str name)))))

(defui page []
  (let [[user set-user] (use-state "")
        [pass set-pass] (use-state "")
        [pending? set-pending] (use-state false)
        ; cached redirect target so form + banner stay in sync while pending
        [redirect-info set-redirect-info] (use-state (auth/take-redirect!))]
    ($ :div {:className "max-w-md mx-auto space-y-4"}
       ($ :h1 {:className "text-2xl font-bold"} "Login")
       (when-let [dest (format-redirect-destination redirect-info)]
         ($ :div {:className "alert alert-warning text-sm"}
            ($ :span {:className "font-medium"} "After login: ")
            ($ :span {:className "font-mono"} dest)))
       ($ :form {:className "space-y-3"
                 :onSubmit (fn [e]
                             (.preventDefault e)
                             (when-not pending?
                               (set-pending true)
                               (-> (auth/login-async!)
                                   (.then (fn [_]
                                            (let [{:keys [name params query] :as redirect} (auth/take-redirect!)]
                                              (set-redirect-info redirect)
                                              (if name
                                                (router/navigate! name params query)
                                                (router/navigate! :home)))))
                                    (.finally (fn [] (set-pending false))))))}
          ($ :div {:className "space-y-1"}
             ($ :label {:className "block text-sm"} "Username")
             ($ :input {:className "w-full border rounded px-2 py-1"
                        :value user
                        :onChange #(set-user (.. % -target -value))}))
          ($ :div {:className "space-y-1"}
             ($ :label {:className "block text-sm"} "Password")
             ($ :input {:type "password"
                        :className "w-full border rounded px-2 py-1"
                        :value pass
                        :onChange #(set-pass (.. % -target -value))}))
          ($ :button {:type "submit"
                      :disabled pending?
                      :className (str "px-3 py-1 border rounded " (when pending? "opacity-60 cursor-not-allowed"))}
             (if pending? "Signing in…" "Sign in")))
       (when pending?
         ($ :div {:className "pt-2"} ($ spinner/spinner {:label "Authorizing…"}))))))
