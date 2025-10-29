(ns bumblebee.shared.services.auth.oauth (:require [bumblebee.shared.auth :as a]))

(defrecord OAuth [client-id deps]
  a/Auth
  (authenticate [_ _] 
    ;; TODO: Implement OAuth authentication flow here
    true))

(a/auth-reg-register!
 (a/auth-reg-default-key)
 (fn [{:keys [client-id deps]}] (->OAuth client-id deps)))
