(ns bumblebee.shared.auth
  (:require [bumblebee.shared.registry :refer [defregistry bind-deps]]))

(defprotocol Auth
  (authenticate [this opts]))

(defregistry auth-reg
  {:prefix "bumblebee.shared.services.auth"  
   ;; optional: provide a different key function:
   ;; :key-fn (fn [{:keys [ns name]}] (keyword (name name)))
   :cache? true})

(comment
  (require '[bumblebee.auth :as base])
  (base/auth-reg-load-all!)

  (def wrap-pwd-deps (bind-deps base/auth-reg {:db "db" :http "http"}))
  (def pwd (wrap-pwd-deps :password))
  
  (def oauth (base/auth-reg-get :oauth {:client-id "abc"}))

  (authenticate pwd {:user "viktornar" :pass "viktornar"})

  ;; List registered implementations
  (base/auth-reg-impls)
  ;; => (:password :oauth)

  ;; Clear instance cache if you need to rebuild instances (e.g., config changed)
  (base/auth-reg-clear!)
  )
