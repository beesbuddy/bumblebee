(ns bumblebee.shared.services.auth.oauth (:require [bumblebee.shared.auth :as a]))

(defrecord OAuth [client-id deps]
  a/Auth
  (authenticate [_ _] 
    ;; ... your logic ...
    true))

(a/auth-reg-register!
 (a/auth-reg-default-key)
 (fn [{:keys [client-id deps]}] (->OAuth client-id deps)))
