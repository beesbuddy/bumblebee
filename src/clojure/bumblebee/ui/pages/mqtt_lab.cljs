(ns bumblebee.ui.pages.mqtt-lab
  (:require
   ["mqtt" :refer [connect]] 
   [clojure.string :as str]
   [uix.core :refer [$ defui use-effect use-ref use-state]]
   [cljs.pprint :as pprint]))

(defn mqtt-connect
  ([url opts]
   (connect url opts)))

(def default-ws-port 8883)
(def default-tcp-port 1883)
(def default-ws-path "/mqtt")

(defn browser-host []
  (when (exists? js/window)
    (let [loc (.-location js/window)]
      (when loc (.-hostname loc)))))

(defn secure-context? []
  (when (exists? js/window)
    (= "https:" (.. js/window -location -protocol))))

;; (defn random-client-id [prefix]
;;   (str prefix "-" (random-uuid)))

(defn initial-client-config [prefix]
  {:host (or (browser-host) "localhost")
   :ws-port default-ws-port
   :tcp-port default-tcp-port
   :ws-path default-ws-path
   :client-id "test"
   :username ""
   :password ""
   :keepalive 60
   :topic "test"
   :reconnect-ms 2000})

(defn ->mqtt-options [{:keys [client-id username password keepalive reconnect-ms]}]
  (let [opts (js-obj)]
    (aset opts "clean" true)
    (aset opts "protocolVersion" 4)
    (aset opts "reconnectPeriod" (or reconnect-ms 2000))
    (aset opts "keepalive" (or keepalive 60))
    (when (seq client-id) (aset opts "clientId" client-id))
    (when (seq username) (aset opts "username" username))
    (when (seq password) (aset opts "password" password))
    opts))

(defn attach-handlers! [client {:keys [on-connect on-reconnect on-error on-close on-message]}]
  (when on-connect
    (.on client "connect" (fn [conn]
                             (on-connect client conn))))
  (when on-reconnect
    (.on client "reconnect" (fn [] (on-reconnect client))))
  (.on client "error" (fn [err]
                         (when on-error (on-error client err))))
  (.on client "close" (fn []
                         (when on-close (on-close client))))
  (when on-message
    (.on client "message"
         (fn [topic payload packet]
           (let [data (try
                        (.toString payload)
                        (catch :default _
                          (str payload)))]
             (on-message client topic data packet)))))
  client)

(defn connect-websocket! [{:keys [host ws-port ws-path] :as cfg}]
  (let [protocol (if (secure-context?) "wss" "ws")
        port (or ws-port (if (secure-context?) 8443 8883))
        url (str protocol "://" (or host "localhost")
                 (when port (str ":" port))
                 (or ws-path default-ws-path))
        opts (->mqtt-options cfg)
        client (mqtt-connect url opts)]
    {:client client
     :transport :websocket
     :url url}))

(defn connect-tcp! [{:keys [host tcp-port] :as cfg}]
  (let [url (str "mqtt://" (or host "localhost")
                 (when tcp-port (str ":" tcp-port)))
        opts (->mqtt-options cfg)
        client (mqtt-connect url opts)]
    {:client client
     :transport :mqtt
     :url url}))

(defn stop-client! [client]
  (when client
    (.removeAllListeners client)
    (.end client true)))

(defn format-status [{:keys [status transport url error]}]
  (let [base (case status
               :connected (str "Connected via " (name transport) (when url (str " (" url ")")))
               :connecting (str "Connecting via " (name transport) "...")
               :closing "Disconnecting..."
               :disconnected "Disconnected"
               :error "Connection error"
               "Idle")
        err-msg (when (= status :error)
                  (cond
                    (string? error) error
                    (and error (.-message ^js error)) (.-message ^js error)
                    error (str error)
                    :else nil))]
    (if err-msg
      (str base " – " err-msg)
      base)))

(defn ensure-number [v default-val]
  (let [parsed (js/parseInt v 10)]
    (if (js/isNaN parsed) default-val parsed)))

(defn client-form-input [{:keys [label type value on-change placeholder step min]}]
  ($ :label {:className "flex flex-col text-sm gap-1"}
     ($ :span {:className "font-medium text-slate-600"} label)
     ($ :input (cond-> {:className "border rounded px-3 py-2"
                        :type (or type "text")
                        :value (or value "")
                        :onChange on-change
                        :placeholder placeholder}
                 step (assoc :step step)
                 min (assoc :min min)))))

(defn client-action-buttons [{:keys [connected? on-connect on-disconnect label connecting?]}]
  ($ :div {:className "flex gap-3"}
     ($ :button {:className (str "px-3 py-1 rounded border"
                                 (if connected? " bg-green-600 text-white border-green-600"
                                     " bg-slate-100"))
                 :disabled (or connected? connecting?)
                 :onClick on-connect}
        (cond
          connected? "Connected"
          connecting? "Connecting..."
          :else (str "Connect " label)))
     ($ :button {:className "px-3 py-1 rounded border"
                 :disabled (not connected?)
                 :onClick on-disconnect}
        "Disconnect")))

(defn subscribe-client! [client topic qos cb]
  (when client
    (.subscribe client topic (clj->js {:qos qos})
                (fn [err]
                  (cb err)))))

(defn publish-message! [client {:keys [topic message qos retain]} cb]
  (when client
    (.publish client topic message (clj->js {:qos qos :retain retain})
              (fn [err]
                (cb err)))))

(def max-log-entries 200)

(defui heading []
       ($ :div {:className "space-y-8"}
          ($ :div {:className "space-y-2"}
             ($ :h1 {:className "text-3xl font-bold"} "MQTT Test Lab")
             ($ :p {:className "text-slate-600"}
                "Create publisher and subscriber clients, then publish test messages. "
                "The UI prefers WebSocket connections and falls back to TCP MQTT if WebSocket fails."))))


(defui sub-widget [{:keys [sub-state sub-config set-sub-config sub-form set-sub-form connect-client! subscribe-topic! set-sub-state sub-client set-subscriptions subscriptions messages]}]

       ($ :div {:className "border rounded-lg p-4 space-y-4"}
          ($ :div {:className "flex items-center justify-between"}
             ($ :h2 {:className "text-xl font-semibold"} "Subscriber Client")
             ($ :span {:className "text-xs text-slate-500"}
                (format-status sub-state)))
          ($ :div {:className "grid gap-3 sm:grid-cols-2"}
             (client-form-input {:label "Host"
                                 :value (:host sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :host v))))})
             (client-form-input {:label "WebSocket Port"
                                 :type "number"
                                 :min 0
                                 :value (:ws-port sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :ws-port (ensure-number v default-ws-port)))))})
             (client-form-input {:label "WebSocket Path"
                                 :value (:ws-path sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :ws-path (if (str/blank? v) default-ws-path v)))))})

             (client-form-input {:label "Client ID"
                                 :value (:client-id sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :client-id v))))})
             (client-form-input {:label "Keepalive (s)"
                                 :type "number"
                                 :min 0
                                 :value (:keepalive sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :keepalive (ensure-number v 60)))))})
             (client-form-input {:label "Topic"
                                 :value (:topic sub-form)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-form #(assoc % :topic v))))})
             (client-form-input {:label "Username"
                                 :value (:username sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :username v))))})
             (client-form-input {:label "Password"
                                 :type "password"
                                 :value (:password sub-config)
                                 :on-change (fn [e]
                                              (let [v (.. e -target -value)]
                                                (set-sub-config #(assoc % :password v))))})
             (client-action-buttons {:connected? (= :connected (:status sub-state))
                                     :connecting? (= :connecting (:status sub-state))
                                     :label "subscriber"
                                     :on-connect (fn []
                                                   (connect-client! :subscriber sub-config)
                                                   (subscribe-topic!))
                                     :on-disconnect (fn []
                                                      (set-sub-state {:status :closing :transport (:transport sub-state) :url (:url sub-state) :error nil})
                                                      (when-let [client @sub-client]
                                                        (stop-client! client)
                                                        (reset! sub-client nil))
                                                      (set-sub-state {:status :disconnected :transport :websocket :url nil :error nil})
                                                      (set-subscriptions #{}))}))

          (when-let [err (:error sub-state)]
            ($ :div {:className "text-sm text-red-600"} err))

          (when (seq subscriptions)
            ($ :div {:className "text-sm text-slate-600"}
               ($ :span {:className "font-medium"} "Active subscriptions: ")
               ($ :span (str/join ", " (sort subscriptions)))))
          (when (seq messages)
            ($ :div {:className "text-sm text-slate-600"}
               ($ :span {:className "font-medium"} "Active messages: ")
               ($ :span (str/join "\n" (sort messages)))))))

(defui page []
  (let [pub-client (use-ref nil)
        sub-client (use-ref nil)
        [pub-config set-pub-config] (use-state (initial-client-config "pub"))
        [sub-config set-sub-config] (use-state (initial-client-config "sub"))
        [pub-state set-pub-state] (use-state {:status :disconnected :transport :websocket :url nil :error nil})
        [sub-state set-sub-state] (use-state {:status :disconnected :transport :websocket :url nil :error nil})
        [sub-form set-sub-form] (use-state {:topic "" :qos 0})
        [pub-form set-pub-form] (use-state {:topic "" :message "" :qos 0 :retain false})
        [messages set-messages] (use-state [])
        [subscriptions set-subscriptions] (use-state #{})
        [publish-status set-publish-status] (use-state {:pending? false :error nil :ok? false})
        [connection-log set-connection-log] (use-state [])
        pub-fallback? (use-ref false)
        sub-fallback? (use-ref false)]

    (use-effect
     (fn []
       (fn []
         (when-let [client @pub-client]
           (stop-client! client)
           (reset! pub-client nil))
         (when-let [client @sub-client]
           (stop-client! client)
           (reset! sub-client nil))
         (set-messages [])
         (set-subscriptions #{})))
     [])

    (let [update-log! (fn [entry]
                        (set-connection-log
                         (fn [log]
                           (->> (conj log (assoc entry :ts (.toISOString (js/Date.))))
                                (take-last 32)
                                vec))))
          handle-connect! (fn [target {:keys [transport url]}]
                            (case target
                              :publisher (set-pub-state {:status :connected :transport transport :url url :error nil})
                              :subscriber (set-sub-state {:status :connected :transport transport :url url :error nil}))
                            (update-log! {:event "connected" :target (name target) :transport (name transport) :url url})
                            (case target
                              :publisher (reset! pub-fallback? false)
                              :subscriber (reset! sub-fallback? false)))
          handle-close! (fn [target]
                          (case target
                            :publisher (set-pub-state (fn [s] (assoc s :status :disconnected :error nil)))
                            :subscriber (set-sub-state (fn [s] (assoc s :status :disconnected :error nil))))
                          (update-log! {:event "closed" :target (name target)})
                          (case target
                            :publisher (reset! pub-fallback? false)
                            :subscriber (reset! sub-fallback? false)))
          handle-error! (fn [target transport err fallback-fn fallback-ref]
                          (let [msg (or (some-> err (.-message)) (str err))
                                client (case target
                                         :publisher @pub-client
                                         :subscriber @sub-client)
                                connected? (when client (.-connected client))]
                            (update-log! {:event "error" :target (name target) :transport (name transport) :message msg})
                            (case target
                              :publisher (set-pub-state (fn [s] (assoc s :status :error :transport transport :error msg)))
                              :subscriber (set-sub-state (fn [s] (assoc s :status :error :transport transport :error msg))))
                            (when (and (= transport :websocket)
                                       (not connected?)
                                       (not @fallback-ref))
                              (reset! fallback-ref true)
                              (fallback-fn))))
          subscribe-topic! (fn []
                             (let [{:keys [topic qos]} sub-form
                                   client @sub-client]
                               (cond
                                 (str/blank? topic)
                                 (set-sub-state (fn [s] (assoc s :error "Topic required")))

                                 (nil? client)
                                 (set-sub-state (fn [s] (assoc s :error "Subscriber client is not connected")))

                                 :else
                                 (subscribe-client! client topic qos
                                                    (fn [err]
                                                      (if err
                                                        (let [msg (cond
                                                                    (instance? js/Error err) (.-message err)
                                                                    (string? err) err
                                                                    :else (str err))]
                                                          (set-sub-state (fn [s] (assoc s :error msg))))
                                                        (do
                                                          (set-subscriptions #(conj % topic))
                                                          (set-sub-state (fn [s] (assoc s :error nil))))))))))
          publish-topic! (fn []
                           (let [{:keys [topic message qos retain]} pub-form
                                 client @pub-client]
                             (cond
                               (str/blank? topic)
                               (set-publish-status {:pending? false :error "Topic required" :ok? false})

                               (not= :connected (:status pub-state))
                               (set-publish-status {:pending? false :error "Publisher is not connected" :ok? false})

                               (nil? client)
                               (set-publish-status {:pending? false :error "Publisher client is not connected" :ok? false})

                               :else
                               (do
                                 (set-publish-status {:pending? true :error nil :ok? false})
                                 (publish-message! client {:topic   topic
                                                           :message message
                                                           :qos     qos
                                                           :retain  retain}
                                                   (fn [err]
                                                     (if err
                                                       (let [msg (cond
                                                                   (instance? js/Error err) (.-message err)
                                                                   (string? err) err
                                                                   :else (str err))]
                                                         (set-publish-status {:pending? false :error msg :ok? false}))
                                                       (set-publish-status {:pending? false :error nil :ok? true}))))))))
          connect-client! (fn [target cfg]
                            (let [client-ref (case target
                                               :publisher pub-client
                                               :subscriber sub-client)
                                  state-setter (case target
                                                 :publisher set-pub-state
                                                 :subscriber set-sub-state)
                                  fallback-ref (case target
                                                 :publisher pub-fallback?
                                                 :subscriber sub-fallback?)]
                              (reset! fallback-ref false)
                              (let [message-handler (fn [_ topic payload packet]
                                                      (set-messages (fn [entries]
                                                                      (->> (conj entries {:topic     topic
                                                                                          :payload   payload
                                                                                          :qos       (some-> packet .-qos)
                                                                                          :timestamp (.toISOString (js/Date.))})
                                                                           (take-last max-log-entries)
                                                                           vec))))
                                    attach-and-record (fn [client url transport err-fn]
                                                        (let [client-with-handlers (attach-handlers! client
                                                                                                     {:on-connect (fn [_ _]
                                                                                                                    (handle-connect! target {:transport transport :url url}))
                                                                                                      :on-close   (fn [] (handle-close! target))
                                                                                                      :on-error   err-fn
                                                                                                      :on-message (when (= target :subscriber)
                                                                                                                    message-handler)})]
                                                          (when-let [old @client-ref]
                                                            (stop-client! old))
                                                          (reset! client-ref client-with-handlers)
                                                          (update-log! {:event     "connecting"
                                                                        :target    (name target)
                                                                        :transport (name transport)
                                                                        :url       url})))
                                    connect-tcp (fn []
                                                  (state-setter {:status :connecting :transport :mqtt :url nil :error nil})
                                                  (let [{:keys [client url transport]} (connect-tcp! cfg)]
                                                    (attach-and-record client url transport
                                                                       (fn [_ err]
                                                                         (handle-error! target transport err (fn [] nil) fallback-ref)))))
                                    connect-ws (fn []
                                                 (state-setter {:status :connecting :transport :websocket :url nil :error nil})
                                                 (let [{:keys [client url transport]} (connect-websocket! cfg)]
                                                   (attach-and-record client url transport
                                                                      (fn [_ err]
                                                                        (handle-error! target transport err connect-tcp fallback-ref)))))]
                                (connect-ws))))]

      ($ :div
         (if (= :connect (:status sub-state)) ($ :span "connected") ($ :span "disconnected"))
         (heading)
         ($ :div {:className "border rounded-lg p-4 space-y-4"}
            ($ :div {:className "flex items-center justify-between"}
               ($ :h2 {:className "text-xl font-semibold"} "Subscriber Client")
               ($ :span {:className "text-xs text-slate-500"}
                  (format-status sub-state)))
            ($ :div {:className "grid gap-3 sm:grid-cols-2"}
               (client-form-input {:label "Host"
                                   :value (:host sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :host v))))})
               (client-form-input {:label "WebSocket Port"
                                   :type "number"
                                   :min 0
                                   :value (:ws-port sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :ws-port (ensure-number v default-ws-port)))))})
               (client-form-input {:label "WebSocket Path"
                                   :value (:ws-path sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :ws-path (if (str/blank? v) default-ws-path v)))))})
         
               (client-form-input {:label "Client ID"
                                   :value (:client-id sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :client-id v))))})
               (client-form-input {:label "Keepalive (s)"
                                   :type "number"
                                   :min 0
                                   :value (:keepalive sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :keepalive (ensure-number v 60)))))})
               (client-form-input {:label "Topic"
                                   :value (:topic sub-form)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-form #(assoc % :topic v))))})
               (client-form-input {:label "Username"
                                   :value (:username sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :username v))))})
               (client-form-input {:label "Password"
                                   :type "password"
                                   :value (:password sub-config)
                                   :on-change (fn [e]
                                                (let [v (.. e -target -value)]
                                                  (set-sub-config #(assoc % :password v))))})
               (client-action-buttons {:connected? (= :connected (:status sub-state))
                                       :connecting? (= :connecting (:status sub-state))
                                       :label "subscriber"
                                       :on-connect (fn []
                                                     (connect-client! :subscriber sub-config)
                                                     (subscribe-topic!))
                                       :on-disconnect (fn []
                                                        (set-sub-state {:status :closing :transport (:transport sub-state) :url (:url sub-state) :error nil})
                                                        (when-let [client @sub-client]
                                                          (stop-client! client)
                                                          (reset! sub-client nil))
                                                        (set-sub-state {:status :disconnected :transport :websocket :url nil :error nil})
                                                        (set-subscriptions #{}))}))
         
            (when-let [err (:error sub-state)]
              ($ :div {:className "text-sm text-red-600"} err))
         
            (when #break(seq subscriptions)
              ($ :div {:className "text-sm text-slate-600"}
                 ($ :span {:className "font-medium"} "Active subscriptions: ")
                 ($ :span (str/join ", " (sort subscriptions)))))
            (when (seq messages)
              ($ :div {:className "text-sm text-slate-600"}
                 ($ :span {:className "font-medium"} "Active messages: ")
                 ($ :span (str/join "\n" (sort messages))))))))))
