(ns bumblebee.ui.pages.mqtt-lab
  (:require
   ["mqtt" :refer [connect]]
   [clojure.string :as str]
   [uix.core :refer [$ defui use-effect use-ref use-state]]))

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
    (.on client "reconnect" (fn []
                              (on-reconnect client))))
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

(defn client-form-input [{:keys [label type value on-change placeholder step min max]}]
  ($ :label {:className "flex flex-col text-sm gap-1"}
     ($ :span {:className "font-medium text-slate-600"} label)
     ($ :input (cond-> {:className "border rounded px-3 py-2"
                        :type (or type "text")
                        :value (or value "")
                        :onChange on-change
                        :placeholder placeholder}
                 step (assoc :step step)
                 min (assoc :min min)
                 max (assoc :max max)))))

(defn client-action-buttons [{:keys [connected? on-connect on-disconnect label connecting?]}]
  ($ :div {:className "flex gap-3"}
     ($ :button {:className (str "px-3 py-1 rounded border"
                                 (if connected?
                                   " bg-green-600 text-white border-green-600"
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

(defn checkbox-input [{:keys [label checked? on-change hint disabled?]}]
  (let [class-name (cond-> "flex items-center gap-2 text-sm"
                     disabled? (str " text-slate-400"))]
    ($ :label {:className class-name}
       ($ :input {:type "checkbox"
                  :checked (boolean checked?)
                  :onChange on-change
                  :disabled disabled?})
       ($ :span {:className "font-medium text-slate-600"} label)
       (when hint
         ($ :span {:className "text-xs text-slate-500"} hint)))))

(defn text-area-input [{:keys [label value on-change placeholder rows]}]
  ($ :label {:className "flex flex-col text-sm gap-1"}
     ($ :span {:className "font-medium text-slate-600"} label)
     ($ :textarea (cond-> {:className "border rounded px-3 py-2 font-mono text-sm"
                           :value (or value "")
                           :onChange on-change
                           :placeholder placeholder}
                    rows (assoc :rows rows)))))

(defui client-card [{:keys [title state body footer]}]
  ($ :div {:className "border rounded-lg p-4 space-y-4"}
     ($ :div {:className "flex items-center justify-between"}
        ($ :h2 {:className "text-xl font-semibold"} title)
        ($ :span {:className "text-xs text-slate-500"} (format-status state)))
     (when-let [err (:error state)]
       ($ :div {:className "text-sm text-red-600"} err))
     body
     (when footer footer)))

(defui client-connection-form
  [{:keys [config set-config state label on-connect on-disconnect]}]
  (let [connected? (= :connected (:status state))
        connecting? (= :connecting (:status state))]
    ($ :div {:className "space-y-4"}
       ($ :div {:className "grid gap-3 sm:grid-cols-2"}
          (client-form-input {:label "Host"
                              :value (:host config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :host v))))})
          (client-form-input {:label "WebSocket Port"
                              :type "number"
                              :min 0
                              :step 1
                              :value (:ws-port config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :ws-port (ensure-number v default-ws-port)))))})
          (client-form-input {:label "WebSocket Path"
                              :value (:ws-path config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :ws-path (if (str/blank? v) default-ws-path v)))))})

          (client-form-input {:label "TCP Port"
                              :type "number"
                              :min 0
                              :step 1
                              :value (:tcp-port config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :tcp-port (ensure-number v default-tcp-port)))))})
          (client-form-input {:label "Client ID"
                              :value (:client-id config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :client-id v))))})
          (client-form-input {:label "Keepalive (s)"
                              :type "number"
                              :min 0
                              :step 1
                              :value (:keepalive config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :keepalive (ensure-number v 60)))))})
          (client-form-input {:label "Reconnect (ms)"
                              :type "number"
                              :min 0
                              :step 100
                              :value (:reconnect-ms config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :reconnect-ms (ensure-number v 2000)))))})
          (client-form-input {:label "Username"
                              :value (:username config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :username v))))})
          (client-form-input {:label "Password"
                              :type "password"
                              :value (:password config)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (set-config #(assoc % :password v))))})
          ($ :div {:className "sm:col-span-2"}
             (client-action-buttons {:connected? connected?
                                     :connecting? connecting?
                                     :label label
                                     :on-connect on-connect
                                     :on-disconnect on-disconnect})))
       ($ :p {:className "text-xs text-slate-500"}
          "WebSocket is attempted first; MQTT/TCP is used automatically if WebSocket fails."))))

(defui subscriber-subscription-form
  [{:keys [form set-form on-subscribe connected? clear-error!]}]
  ($ :div {:className "space-y-3"}
     ($ :h3 {:className "text-lg font-semibold"} "Subscription")
     ($ :div {:className "grid gap-3 sm:grid-cols-2"}
        (client-form-input {:label "Topic"
                            :value (:topic form)
                            :on-change (fn [e]
                                         (let [v (.. e -target -value)]
                                           (clear-error!)
                                           (set-form #(assoc % :topic v))))})
        (client-form-input {:label "QoS"
                            :type "number"
                            :min 0
                            :max 2
                            :step 1
                            :value (:qos form)
                            :on-change (fn [e]
                                         (let [v (.. e -target -value)
                                               qos (-> (ensure-number v 0)
                                                       (max 0)
                                                       (min 2))]
                                           (clear-error!)
                                           (set-form #(assoc % :qos qos))))})
        ($ :div {:className "sm:col-span-2 flex items-center gap-3"}
           ($ :button {:className (str "px-3 py-1 rounded border"
                                       (if connected?
                                         " bg-sky-600 text-white border-sky-600"
                                         " bg-slate-100"))
                       :disabled (not connected?)
                       :onClick on-subscribe}
              "Subscribe")
           ($ :span {:className "text-xs text-slate-500"}
              (if connected?
                "Subscribe the connected client to the topic above."
                "Connect before subscribing."))))))

(defui subscriber-subscriptions-panel [{:keys [subscriptions]}]
  ($ :div {:className "space-y-2"}
     ($ :h3 {:className "text-lg font-semibold"} "Active Subscriptions")
     (if (seq subscriptions)
       ($ :ul {:className "list-disc list-inside text-sm text-slate-600 space-y-1"}
          (for [topic (sort subscriptions)]
            ($ :li {:key topic} topic)))
       ($ :p {:className "text-sm text-slate-500 italic"}
          "No topics subscribed yet."))))

(defui subscriber-messages-panel [{:keys [messages]}]
  ($ :div {:className "space-y-2"}
     ($ :h3 {:className "text-lg font-semibold"} "Message Log")
     (if (seq messages)
       ($ :div {:className "max-h-64 overflow-y-auto border rounded-md bg-slate-50 divide-y"}
          (for [{:keys [topic payload qos timestamp]} (reverse messages)]
            (let [key (str timestamp "-" topic "-" (hash payload))]
              ($ :div {:key key :className "p-3 space-y-1 text-sm"}
                 ($ :div {:className "flex items-center justify-between text-xs text-slate-500"}
                    ($ :span (str (or timestamp "") " • " topic))
                    ($ :span (str "QoS " (or qos 0))))
                 ($ :pre {:className "whitespace-pre-wrap break-words font-mono text-sm"}
                    (or payload ""))))))
       ($ :p {:className "text-sm text-slate-500 italic"}
          "No messages received yet."))))

(defui publisher-publish-form
  [{:keys [form set-form on-publish status connected? clear-status!]}]
  (let [{:keys [pending? error ok?]} status]
    ($ :div {:className "space-y-3"}
       ($ :h3 {:className "text-lg font-semibold"} "Publish Message")
       ($ :div {:className "grid gap-3 sm:grid-cols-2"}
          (client-form-input {:label "Topic"
                              :value (:topic form)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)]
                                             (clear-status!)
                                             (set-form #(assoc % :topic v))))})
          (client-form-input {:label "QoS"
                              :type "number"
                              :min 0
                              :max 2
                              :step 1
                              :value (:qos form)
                              :on-change (fn [e]
                                           (let [v (.. e -target -value)
                                                 qos (-> (ensure-number v 0)
                                                         (max 0)
                                                         (min 2))]
                                             (clear-status!)
                                             (set-form #(assoc % :qos qos))))})
          ($ :div {:className "sm:col-span-2"}
             (text-area-input {:label "Payload"
                               :rows 6
                               :value (:message form)
                               :on-change (fn [e]
                                            (let [v (.. e -target -value)]
                                              (clear-status!)
                                              (set-form #(assoc % :message v))))
                               :placeholder "Enter the payload to publish"}))
          ($ :div {:className "sm:col-span-2 flex items-center justify-between gap-3"}
             (checkbox-input {:label "Retain message?"
                              :checked? (:retain form)
                              :on-change (fn [e]
                                           (let [v (.. e -target -checked)]
                                             (clear-status!)
                                             (set-form #(assoc % :retain v))))
                              :disabled? (not connected?)})
             ($ :button {:className (str "px-3 py-1 rounded border"
                                         (cond
                                           pending? " bg-slate-100 border-slate-200 text-slate-500"
                                           connected? " bg-emerald-600 text-white border-emerald-600"
                                           :else " bg-slate-100"))
                         :disabled (or (not connected?) pending?)
                         :onClick on-publish}
                (cond
                  pending? "Publishing..."
                  connected? "Publish"
                  :else "Publish"))))
       (cond
         pending? ($ :div {:className "text-sm text-slate-500"} "Publishing message…")
         error ($ :div {:className "text-sm text-red-600"} error)
         ok? ($ :div {:className "text-sm text-green-600"} "Message published successfully.")))))

(defui connection-log-panel [{:keys [entries]}]
  ($ :div {:className "border rounded-lg p-4 space-y-3"}
     ($ :div {:className "flex items-center justify-between"}
        ($ :h2 {:className "text-xl font-semibold"} "Connection Log")
        ($ :span {:className "text-xs text-slate-500"}
           (let [cnt (count entries)]
             (str cnt " event" (when (not= 1 cnt) "s")))))
     (if (seq entries)
       ($ :ul {:className "space-y-2 text-sm text-slate-600"}
          (for [{:keys [ts event target transport url message]} (reverse entries)]
            (let [key (str ts "-" event "-" target "-" (or transport "none"))
                  transport-label (when transport (str/capitalize transport))]
              ($ :li {:key key :className "border rounded px-3 py-2 bg-slate-50 space-y-1"}
                 ($ :div {:className "flex items-center justify-between text-xs text-slate-500"}
                    ($ :span ts)
                    ($ :span (str (str/capitalize target) " • " (str/capitalize event))))
                 (when transport-label
                   ($ :div (str "Transport: " transport-label)))
                 (when (seq url)
                   ($ :div (str "URL: " url)))
                 (when (seq message)
                   ($ :div (str "Message: " message)))))))
       ($ :p {:className "text-sm text-slate-500 italic"}
          "Connect a client to populate the log."))))

(defui subscriber-section
  [{:keys [config set-config state on-connect on-disconnect form set-form on-subscribe subscriptions messages clear-error!]}]
  (let [connected? (= :connected (:status state))]
    ($ client-card
       {:title "Subscriber Client"
        :state state
        :body ($ :div {:className "space-y-6"}
                 ($ client-connection-form {:config config
                                            :set-config set-config
                                            :state state
                                            :label "subscriber"
                                            :on-connect on-connect
                                            :on-disconnect on-disconnect})
                 ($ subscriber-subscription-form {:form form
                                                  :set-form set-form
                                                  :on-subscribe on-subscribe
                                                  :connected? connected?
                                                  :clear-error! clear-error!})
                 ($ subscriber-subscriptions-panel {:subscriptions subscriptions})
                 ($ subscriber-messages-panel {:messages messages}))})))

(defui publisher-section
  [{:keys [config set-config state on-connect on-disconnect form set-form on-publish publish-status clear-status!]}]
  (let [connected? (= :connected (:status state))]
    ($ client-card
       {:title "Publisher Client"
        :state state
        :body ($ :div {:className "space-y-6"}
                 ($ client-connection-form {:config config
                                            :set-config set-config
                                            :state state
                                            :label "publisher"
                                            :on-connect on-connect
                                            :on-disconnect on-disconnect})
                 ($ publisher-publish-form {:form form
                                            :set-form set-form
                                            :status publish-status
                                            :on-publish on-publish
                                            :connected? connected?
                                            :clear-status! clear-status!}))})))

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
                                (take-last 64)
                                vec))))
          handle-connect! (fn [target {:keys [transport url]}]
                            (case target
                              :publisher (set-pub-state {:status :connected :transport transport :url url :error nil})
                              :subscriber (set-sub-state {:status :connected :transport transport :url url :error nil}))
                            (update-log! {:event "connected" :target (name target) :transport (some-> transport name) :url url})
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
                            (update-log! {:event "error"
                                          :target (name target)
                                          :transport (some-> transport name)
                                          :message msg})
                            (case target
                              :publisher (set-pub-state (fn [s] (assoc s :status :error :transport transport :error msg)))
                              :subscriber (set-sub-state (fn [s] (assoc s :status :error :transport transport :error msg))))
                            (when (and (= transport :websocket)
                                       (not connected?)
                                       (not @fallback-ref))
                              (reset! fallback-ref true)
                              (fallback-fn))))
          disconnect-client! (fn [target]
                               (let [client-ref (case target
                                                  :publisher pub-client
                                                  :subscriber sub-client)
                                     state (case target
                                             :publisher pub-state
                                             :subscriber sub-state)
                                     state-setter (case target
                                                    :publisher set-pub-state
                                                    :subscriber set-sub-state)
                                     fallback-ref (case target
                                                    :publisher pub-fallback?
                                                    :subscriber sub-fallback?)]
                                 (state-setter {:status :closing
                                                :transport (:transport state)
                                                :url (:url state)
                                                :error nil})
                                 (when-let [client @client-ref]
                                   (stop-client! client)
                                   (reset! client-ref nil))
                                 (state-setter {:status :disconnected :transport :websocket :url nil :error nil})
                                 (case target
                                   :publisher (reset! pub-fallback? false)
                                   :subscriber (do
                                                 (reset! sub-fallback? false)
                                                 (set-subscriptions #{}))))
                               (update-log! {:event "disconnect" :target (name target)}))
          subscribe-topic! (fn [form]
                             (let [form (or form {})
                                   topic (if (contains? form :topic) (:topic form) (:topic sub-form))
                                   qos (if (contains? form :qos) (:qos form) (:qos sub-form))
                                   client @sub-client]
                               (set-sub-state (fn [s] (assoc s :error nil)))
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
                                                          (set-sub-state (fn [s] (assoc s :error nil)))
                                                          (update-log! {:event "subscribed"
                                                                        :target "subscriber"
                                                                        :message (str "topic=" topic " qos=" qos)}))))))))
          publish-topic! (fn [form]
                           (let [form (or form {})
                                 topic (if (contains? form :topic) (:topic form) (:topic pub-form))
                                 message (if (contains? form :message) (:message form) (:message pub-form))
                                 qos (if (contains? form :qos) (:qos form) (:qos pub-form))
                                 retain (if (contains? form :retain) (:retain form) (:retain pub-form))
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
                                 (publish-message! client {:topic topic
                                                           :message message
                                                           :qos qos
                                                           :retain retain}
                                                   (fn [err]
                                                     (if err
                                                       (let [msg (cond
                                                                   (instance? js/Error err) (.-message err)
                                                                   (string? err) err
                                                                   :else (str err))]
                                                         (set-publish-status {:pending? false :error msg :ok? false}))
                                                       (do
                                                         (set-publish-status {:pending? false :error nil :ok? true})
                                                         (update-log! {:event "published"
                                                                       :target "publisher"
                                                                       :message (str "topic=" topic " qos=" qos " retain=" retain)})))))))))
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
                                                      (set-messages
                                                       (fn [entries]
                                                         (->> (conj entries {:topic topic
                                                                             :payload payload
                                                                             :qos (some-> packet .-qos)
                                                                             :timestamp (.toISOString (js/Date.))})
                                                              (take-last max-log-entries)
                                                              vec))))
                                    attach-and-record (fn [client url transport err-fn]
                                                        (let [client-with-handlers (attach-handlers! client
                                                                                                     {:on-connect (fn [_ _]
                                                                                                                    (handle-connect! target {:transport transport :url url}))
                                                                                                      :on-close (fn [] (handle-close! target))
                                                                                                      :on-error err-fn
                                                                                                      :on-message (when (= target :subscriber)
                                                                                                                    message-handler)})]
                                                          (when-let [old @client-ref]
                                                            (stop-client! old))
                                                          (reset! client-ref client-with-handlers)
                                                          (update-log! {:event "connecting"
                                                                        :target (name target)
                                                                        :transport (some-> transport name)
                                                                        :url url})))
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
                                (connect-ws))))
          clear-sub-error! #(set-sub-state (fn [s] (assoc s :error nil)))
          clear-publish-status! #(set-publish-status (fn [s] (assoc s :error nil :ok? false)))]
      ($ :div {:className "space-y-6"}
         (heading)
         ($ :div {:className "grid gap-6 lg:grid-cols-2"}
            ($ subscriber-section {:config sub-config
                                   :set-config set-sub-config
                                   :state sub-state
                                   :on-connect (fn []
                                                 (connect-client! :subscriber sub-config)
                                                 (subscribe-topic! sub-form))
                                   :on-disconnect (fn [] (disconnect-client! :subscriber))
                                   :form sub-form
                                   :set-form set-sub-form
                                   :on-subscribe (fn [] (subscribe-topic! sub-form))
                                   :subscriptions subscriptions
                                   :messages messages
                                   :clear-error! clear-sub-error!})
            ($ publisher-section {:config pub-config
                                  :set-config set-pub-config
                                  :state pub-state
                                  :on-connect (fn [] (connect-client! :publisher pub-config))
                                  :on-disconnect (fn [] (disconnect-client! :publisher))
                                  :form pub-form
                                  :set-form set-pub-form
                                  :on-publish (fn [] (publish-topic! pub-form))
                                  :publish-status publish-status
                                  :clear-status! clear-publish-status!}))
         ($ connection-log-panel {:entries connection-log})
         ($ :div {:className "pb-1"})))))
