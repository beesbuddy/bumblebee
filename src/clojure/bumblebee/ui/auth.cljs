(ns bumblebee.ui.auth
  (:require
   [cljs.reader]))

(def storage-key "uix-starter.jwt")

(defonce state
  (atom {:token nil        ;; {:access "..." :refresh "..." :exp <unix-seconds>}
         :redirect nil
         :timer-id nil}))  ;; js/Timeout id for scheduled refresh

(defn now-s []
  (js/Math.floor (/ (.now js/Date) 1000)))

(defn gen-str []
  (.toString (js/Math.random) 36))

(defn token-expired? [token]
  (let [t (or token (:token @state))]
    (if-not t
      true
      (<= (:exp t) (now-s)))))

(defn token-remaining-s []
  (if-let [t (:token @state)]
    (max 0 (- (:exp t) (now-s)))
    0))

(defn authed? []
  (and (:token @state) (not (token-expired? (:token @state)))))

(defn persist! []
  (try
    (.setItem js/localStorage storage-key (pr-str (:token @state)))
    (catch :default _ nil)))

(defn load! []
  (try
    (when-let [s (.getItem js/localStorage storage-key)]
      (when-let [t (cljs.reader/read-string s)]
        (swap! state assoc :token t)))
    (catch :default _ nil)))

(add-watch state ::persist (fn [_ _ _ _] (persist!)))

(declare refresh-async!)

(defn clear-timer! []
  (when-let [id (:timer-id @state)]
    (js/clearTimeout id)
    (swap! state assoc :timer-id nil)))

(defn schedule-refresh! []
  (clear-timer!)
  (when-let [t (:token @state)]
    (let [remaining (- (:exp t) (now-s))
          delay-ms (* 1000 (max 0 (- remaining 10)))]
      (when (pos? remaining)
        (let [id (js/setTimeout (fn [] (refresh-async!)) delay-ms)]
          (swap! state assoc :timer-id id))))))

(defn set-token! [t]
  (swap! state assoc :token t)
  (schedule-refresh!))

(defn set-redirect! [target]
  (swap! state assoc :redirect target))

(defn take-redirect! []
  (let [r (:redirect @state)]
    (swap! state assoc :redirect nil)
    r))

(defn logout! []
  (clear-timer!)
  (swap! state assoc :token nil))

(defn login-async!
  "Fake login returning token valid for 60s."
  []
  (js/Promise.
    (fn [resolve _reject]
      (js/setTimeout
        (fn []
          (let [t {:access  (str "acc-" (gen-str))
                   :refresh (str "ref-" (gen-str))
                   :exp     (+ (now-s) 60)}]
            (set-token! t)
            (resolve t)))
        800))))

(defn refresh-async!
  "Fake refresh using stored refresh token. Extends expiry by 60s."
  []
  (js/Promise.
    (fn [resolve reject]
      (if-let [t (:token @state)]
        (js/setTimeout
          (fn []
            (if (token-expired? t)
              (do (logout!) (reject (js/Error. "refresh: token expired")))
              (let [t2 (assoc t
                              :access  (str "acc-" (gen-str))
                              :exp     (+ (now-s) 60))]
                (set-token! t2)
                (resolve t2))))
          500)
        (reject (js/Error. "refresh: no token"))))))
