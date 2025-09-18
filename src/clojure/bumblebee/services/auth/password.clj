(ns bumblebee.services.auth.password
  (:require [bumblebee.auth :as base]))

(defrecord PasswordAuth [credentials deps]
  base/Auth
  (authenticate [_ {:keys [user pass]}]
    (println (str user " - " pass))
    (print deps)
    true))

;; Register under the default module-based key (=> :password)
(base/auth-reg-register!
 (base/auth-reg-default-key)         ;; => :password derived from ns
 (fn [{:keys [credentials deps]}] (->PasswordAuth credentials deps)))
