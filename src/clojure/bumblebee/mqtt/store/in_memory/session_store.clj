(ns bumblebee.mqtt.store.in-memory.session-store
  (:require
   [bumblebee.mqtt.core :as c :refer [ICloseableStore ISessionStore]]))

(deftype InMemorySessionStore [sessions]
  ISessionStore 
  (add-session [_ client-session] 
    (swap! sessions assoc (:client-id client-session) client-session))
  (get-session [_ client-id]
    (@sessions client-id))
  (get-clients-ids [_] (keys @sessions))
  (remove-session [_ client-id]
    (swap! sessions dissoc client-id))
  (session-count [_]
    (count @sessions))
  ICloseableStore
  (close [_]))

(defn init []
  (->InMemorySessionStore (atom {})))

(comment
  (def store (init))
  (c/add-session store (c/->ClientSession nil 1 "username" true true nil nil))
  (c/add-session store (c/->ClientSession nil 2 "username" true true nil nil))
  (-> (c/get-session store 1) .toString)
  (c/get-clients-ids store)
  (c/session-count store)
  (c/remove-session store 1))
