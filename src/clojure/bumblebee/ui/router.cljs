(ns bumblebee.ui.router
  (:require
   [reitit.frontend :as rf]
   [reitit.frontend.easy :as rfe]))

(def routes
  [["/" {:name :home}]
   ["/about" {:name :about}]
   ["/admin" {:name :admin :requires-auth true}]
   ["/mqtt-lab" {:name :mqtt-lab :requires-auth true}]
   ["/login" {:name :login}]])

(def router (rf/router routes))

(defonce current (atom nil))
(defonce started? (atom false))

(defn start! []
  (when (compare-and-set! started? false true)
    (rfe/start!
      router
      (fn [m] (reset! current m))
      {:use-fragment true})))

(defn stop! []
  (reset! started? false))

(defn href [name & [params query]]
  (rfe/href name params query))

(defn navigate! [name & [params query]]
  (rfe/push-state name params query))
