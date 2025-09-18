(ns bumblebee.services.auth.oauth (:require [bumblebee.auth :as base]))

(defrecord OAuthAuth [client-id deps]
  base/Auth
  (authenticate [_ _] 
    ;; ... your logic ...
    true))

(base/auth-reg-register!
 (base/auth-reg-default-key)
 (fn [{:keys [client-id deps]}] (->OAuthAuth client-id deps)))
