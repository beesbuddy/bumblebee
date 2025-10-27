(ns bumblebee.shared.services.auth.password 
  (:require
   [bumblebee.shared.auth :as a]))

(defrecord PasswordAuth [credentials deps]
  a/Auth
  (authenticate [_ {:keys [user pass]}]
    (println (str user " - " pass))
    (print deps)
    true))

#_{:clj-kondo/ignore [:unresolved-var]}
(a/auth-reg-register!
 (a/auth-reg-default-key)
 (fn [{:keys [credentials deps]}] (->PasswordAuth credentials deps)))
