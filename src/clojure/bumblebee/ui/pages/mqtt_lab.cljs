(ns bumblebee.ui.pages.mqtt-lab
  (:require
   ["mqtt" :refer [connect]]
   [clojure.string :as str]
   [bumblebee.mqtt.client-id :as mqtt-client-id]
   [uix.core :refer [$ defui use-effect use-ref use-state]]))

(def ^:private default-ws-port 8883)
(def ^:private default-tcp-port 1883)
(def ^:private default-ws-path "/mqtt")
(def ^:private default-host "localhost")
(def ^:private default-topic "test")

(defn mqtt-connect
  ([url opts]
   (connect url opts)))

(defn browser-host []
  (when (exists? js/window)
    (let [loc (.-location js/window)]
      (when loc (.-hostname loc)))))

(defn secure-context? []
  (when (exists? js/window)
    (= "https:" (.. js/window -location -protocol))))

(defn initial-client-config [prefix]
  {:host (or (browser-host) default-host)
   :ws-port default-ws-port
   :tcp-port default-tcp-port
   :ws-path default-ws-path
   :client-id (mqtt-client-id/random-client-id prefix)
   :username ""
   :password ""
   :keepalive 60
   :topic default-topic
   :reconnect-ms 2000})

(defn ->mqtt-options [{:keys [client-id username password keepalive]}]
  (let [opts (js-obj)]
    (aset opts "clean" true)
    (aset opts "protocolVersion" 4)
    ;; disable automatic reconnects; handled manually with backoff
    (aset opts "reconnectPeriod" 0)
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

(defn sanitize-qos [value]
  (-> (ensure-number value 0)
      (max 0)
      (min 2)))

(defn client-form-input [{:keys [label type value on-change placeholder step min max disabled?]}]
  ($ :div {:className "form-control w-full"}
     ($ :label {:className "label"}
        ($ :span {:className "label-text font-medium text-amber-900"} label))
     ($ :input (cond-> {:className "input input-bordered input-warning input-sm bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-warning/40 text-amber-900 placeholder:text-amber-900/50"
                        :type (or type "text")
                        :value (or value "")
                        :onChange on-change
                        :placeholder placeholder
                        :disabled disabled?}
                 step (assoc :step step)
                 min (assoc :min min)
                 max (assoc :max max)))))

(defn client-action-buttons [{:keys [connected? on-connect on-disconnect label connecting?]}]
  ($ :div {:className "flex flex-wrap gap-3"}
     ($ :button {:className (str "btn btn-sm "
                                 (cond
                                   connected? "btn-success"
                                   connecting? "btn-warning"
                                   :else "btn-warning"))
                 :disabled (or connected? connecting?)
                 :onClick on-connect}
        (when connecting?
          ($ :span {:className "loading loading-spinner loading-xs"} ""))
        (cond
          connected? "Connected"
          connecting? "Connecting..."
          :else (str "Connect " label)))
     ($ :button {:className (str "btn btn-sm "
                                 (if connected?
                                   "btn-outline btn-error"
                                   "btn-outline btn-error opacity-60 pointer-events-none"))
                 :disabled (not connected?)
                 :onClick on-disconnect}
        "Disconnect")))

(defn subscribe-client! [client topic qos cb]
  (when client
    (.subscribe client topic (clj->js {:qos qos})
                (fn [err]
                  (cb err)))))

(defn unsubscribe-client! [client topic cb]
  (when client
    (.unsubscribe client topic
                  (fn [err]
                    (cb err)))))

(defn publish-message! [client {:keys [topic message qos retain]} cb]
  (when client
    (.publish client topic message (clj->js {:qos qos :retain retain})
              (fn [err]
                (cb err)))))

(def max-log-entries 200)

(def ^:private retry-delay-sequence [1000 2000 5000])

(def ^:private status-badge-styles
  {:connected {:label "Connected" :class "badge badge-success badge-sm gap-2"}
   :connecting {:label "Connecting" :class "badge badge-warning badge-sm gap-2"}
   :closing {:label "Closing" :class "badge badge-warning badge-sm gap-2"}
   :error {:label "Error" :class "badge badge-error badge-sm gap-2"}
   :disconnected {:label "Disconnected" :class "badge badge-outline badge-sm gap-2 border-amber-300 text-amber-900"}
   :idle {:label "Idle" :class "badge badge-outline badge-sm gap-2 border-amber-200 text-amber-900/80"}})

(defn next-retry-delay [attempt]
  (let [base-count (count retry-delay-sequence)]
    (cond
      (< attempt 2) 0
      (<= attempt (inc base-count))
      (nth retry-delay-sequence (- attempt 2))
      :else (let [overflow (- attempt (inc base-count))
                  last-delay (last retry-delay-sequence)]
              (* last-delay (js/Math.pow 2 overflow))))))

(defn reset-retry-state!
  ([retry-ref] (reset-retry-state! retry-ref {:closing? false}))
  ([retry-ref {:keys [closing?] :or {closing? false}}]
   (when-let [timer (:timer @retry-ref)]
     (js/clearTimeout timer))
   (reset! retry-ref {:attempt 0 :timer nil :closing? closing?})))

(defui status-badge [{:keys [status retrying?]}]
  (let [{:keys [label class]} (get status-badge-styles (or status :idle) (get status-badge-styles :idle))]
    ($ :span {:className class}
       label
       (when retrying?
         ($ :span {:className "loading loading-spinner loading-xs ml-1"} "")))))

(defui heading []
  ($ :section {:className "rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 p-6 shadow-sm"}
     ($ :div {:className "flex flex-col gap-6 md:flex-row md:items-center md:justify-between"}
        ($ :div {:className "space-y-4"}
           ($ :h1 {:className "text-4xl font-black text-amber-900"}
              "MQTT Test Lab")
           ($ :p {:className "max-w-2xl text-base leading-relaxed text-amber-900/80"}
              "Spin up twin MQTT clients, validate broker connectivity, and inspect payloads in real time. Configure WebSocket endpoints, subscribe to topics, and publish messages without leaving the dashboard."))
        ($ :div {:className "flex flex-wrap gap-2"}
           ($ :span {:className "badge badge-warning badge-outline badge-lg"} "WebSocket only")
           ($ :span {:className "badge badge-info badge-outline badge-lg"} "Dual client simulator")
           ($ :span {:className "badge badge-success badge-outline badge-lg"} "Live activity log")))))

(defn checkbox-input [{:keys [label checked? on-change hint disabled?]}]
  ($ :div {:className "form-control"}
     ($ :label {:className (str "label cursor-pointer justify-start gap-3 "
                                (when disabled? "opacity-60"))}
        ($ :input {:type "checkbox"
                   :checked (boolean checked?)
                   :className "checkbox checkbox-warning"
                   :onChange on-change
                   :disabled disabled?})
        ($ :span {:className "label-text font-medium text-amber-900"} label))
     (when hint
       ($ :span {:className "label-text-alt text-xs text-amber-900/60"} hint))))

(defn text-area-input [{:keys [label value on-change placeholder rows]}]
  ($ :div {:className "form-control w-full"}
     ($ :label {:className "label"}
        ($ :span {:className "label-text font-medium text-amber-900"} label))
     ($ :textarea (cond-> {:className "textarea textarea-bordered textarea-warning textarea-sm font-mono leading-relaxed bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-warning/40 text-amber-900 placeholder:text-amber-900/50"
                           :value (or value "")
                           :onChange on-change
                           :placeholder placeholder}
                    rows (assoc :rows rows)))))

(defui client-card [{:keys [title state body footer description]}]
  ($ :div {:className "card bg-amber-50 border border-amber-200 shadow-sm"}
     ($ :div {:className "card-body space-y-6"}
        ($ :div {:className "flex items-start justify-between gap-4"}
           ($ :div {:className "space-y-1"}
              ($ :h2 {:className "text-2xl font-semibold text-amber-900"} title)
              (when description
                ($ :p {:className "text-sm text-amber-900/70"} description)))
           ($ :div {:className "flex flex-col items-end gap-1 text-amber-900"}
              ($ status-badge state)
              ($ :span {:className "text-xs text-amber-900/60 max-w-[220px] text-right leading-tight"}
                 (format-status state))))
        body
        (when footer
          ($ :div {:className "pt-2 border-t border-amber-200"} footer)))))

(defui client-connection-form
  [{:keys [config set-config state label on-connect on-disconnect]}]
  (let [connected? (= :connected (:status state))
        connecting? (or (= :connecting (:status state))
                        (:retrying? state))]
    ($ :div {:className "space-y-6"}
       ($ :div {:className "grid gap-4 md:grid-cols-2"}
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
       ($ :p {:className "text-xs text-amber-900/60"}
          "Connections use WebSocket transport; MQTT/TCP fallback is not supported."))))

(defui subscriber-subscription-form
  [{:keys [form set-form on-subscribe on-unsubscribe connected? clear-error!]}]
  ($ :div {:className "space-y-4"}
     ($ :h3 {:className "text-xl font-semibold text-amber-900"} "Subscription")
     ($ :div {:className "grid gap-4 md:grid-cols-2"}
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
                                               qos (sanitize-qos v)]
                                           (clear-error!)
                                           (set-form #(assoc % :qos qos))))})
        ($ :div {:className "sm:col-span-2 flex flex-wrap items-center gap-3"}
           ($ :button {:className "btn btn-sm btn-warning"
                       :disabled (not connected?)
                       :onClick on-subscribe}
              "Subscribe")
           ($ :button {:className "btn btn-sm btn-outline btn-error"
                       :disabled (or (not connected?) (str/blank? (:topic form)))
                       :onClick (fn [e]
                                  (.preventDefault e)
                                  (when on-unsubscribe
                                    (on-unsubscribe)))}
              "Unsubscribe")
           ($ :span {:className "text-xs text-amber-900/60"}
              (if connected?
                "Subscribe the connected client to the topic above."
                "Connect before subscribing."))))))

(defui subscriber-subscriptions-panel [{:keys [subscriptions on-unsubscribe connected?]}]
  ($ :div {:className "space-y-3"}
     ($ :h3 {:className "text-xl font-semibold text-amber-900"} "Active Subscriptions")
     (if (seq subscriptions)
       ($ :div {:className "flex flex-wrap gap-2"}
          (for [topic (sort subscriptions)]
            ($ :div {:key topic
                     :className "flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-900"}
               ($ :span {:className "font-medium"} topic)
               (when on-unsubscribe
                 ($ :button {:className "btn btn-ghost btn-xs text-amber-900 hover:text-error"
                             :title "Unsubscribe"
                             :disabled (not connected?)
                             :onClick #(on-unsubscribe topic)}
                    "x")))))
       ($ :p {:className "text-sm text-amber-900/60 italic"}
          "No topics subscribed yet."))))

(defui subscriber-messages-panel [{:keys [messages]}]
  ($ :div {:className "space-y-4"}
     ($ :h3 {:className "text-xl font-semibold text-amber-900"} "Message Log")
     (if (seq messages)
       ($ :div {:className "max-h-64 overflow-y-auto rounded-xl border border-amber-200 bg-amber-50/80 divide-y divide-amber-200/70"}
          (for [{:keys [topic payload qos timestamp]} (reverse messages)]
            (let [key (str timestamp "-" topic "-" (hash payload))]
              ($ :div {:key key :className "p-3 space-y-2 text-sm text-amber-900"}
                 ($ :div {:className "flex items-center justify-between text-xs text-amber-900/60"}
                    ($ :span (or timestamp ""))
                    ($ :span {:className "badge badge-warning badge-outline badge-xs"} (str "QoS " (or qos 0))))
                 ($ :div {:className "flex flex-wrap items-center gap-2 text-xs text-amber-900/70"}
                    ($ :span {:className "badge badge-outline badge-xs border-amber-300 text-amber-900"} topic))
                 ($ :pre {:className "whitespace-pre-wrap break-words rounded-lg bg-amber-100/80 p-3 font-mono text-sm text-amber-900"}
                    (or payload ""))))))
       ($ :p {:className "text-sm text-amber-900/60 italic"}
          "No messages received yet."))))

(defui publisher-publish-form
  [{:keys [form set-form on-publish status connected? clear-status!]}]
  (let [{:keys [pending? error ok?]} status]
    ($ :div {:className "space-y-4"}
       ($ :h3 {:className "text-xl font-semibold text-amber-900"} "Publish Message")
       ($ :div {:className "grid gap-4 md:grid-cols-2"}
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
                                                 qos (sanitize-qos v)]
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
          ($ :div {:className "sm:col-span-2 flex flex-wrap items-center justify-between gap-3"}
             (checkbox-input {:label "Retain message?"
                              :checked? (:retain form)
                              :on-change (fn [e]
                                           (let [v (.. e -target -checked)]
                                             (clear-status!)
                                             (set-form #(assoc % :retain v))))
                              :disabled? (not connected?)})
             ($ :button {:className (str "btn btn-sm "
                                         (cond
                                           pending? "btn-warning"
                                           connected? "btn-success"
                                           :else "btn-warning"))
                         :disabled (or (not connected?) pending?)
                         :onClick on-publish}
                (when pending?
                  ($ :span {:className "loading loading-spinner loading-xs"} ""))
                (cond
                  pending? "Publishing..."
                  connected? "Publish"
                  :else "Publish"))))
       (cond
         pending? ($ :div {:className "alert alert-warning py-2 text-sm"} "Publishing message…")
         error ($ :div {:className "alert alert-error py-2 text-sm"} error)
         ok? ($ :div {:className "alert alert-warning py-2 text-sm"} "Message published successfully.")))))

(defui connection-log-panel [{:keys [entries]}]
  ($ :div {:className "card bg-amber-50 border border-amber-200 shadow-sm"}
     ($ :div {:className "card-body space-y-4"}
        ($ :div {:className "flex items-center justify-between"}
           ($ :h2 {:className "text-2xl font-semibold text-amber-900"} "Connection Log")
           ($ :span {:className "text-xs text-amber-900/60"}
              (let [cnt (count entries)]
                (str cnt " event" (when (not= 1 cnt) "s")))))
        (if (seq entries)
          ($ :ul {:className "space-y-3 text-sm text-amber-900/80"}
             (for [{:keys [ts event target transport url message]} (reverse entries)]
               (let [key (str ts "-" event "-" target "-" (or transport "none"))
                     transport-label (when transport (str/capitalize transport))]
                 ($ :li {:key key :className "rounded-xl border border-amber-200 bg-amber-100/80 p-3 space-y-2"}
                    ($ :div {:className "flex items-center justify-between text-xs text-amber-900/60"}
                       ($ :span ts)
                       ($ :span {:className "badge badge-warning badge-outline badge-xs"}
                          (str (str/capitalize target) " • " (str/capitalize event))))
                    (when transport-label
                      ($ :div {:className "text-xs text-amber-900/70"} (str "Transport: " transport-label)))
                    (when (seq url)
                      ($ :div {:className "text-xs break-all text-amber-900/70"} (str "URL: " url)))
                    (when (seq message)
                      ($ :div {:className "text-xs text-amber-900/70"} (str "Message: " message)))))))
          ($ :p {:className "text-sm text-amber-900/60 italic"}
             "Connect a client to populate the log.")))))

(defui subscriber-section
  [{:keys [config set-config state on-connect on-disconnect form set-form on-subscribe on-unsubscribe subscriptions messages clear-error!]}]
  (let [connected? (= :connected (:status state))]
    ($ client-card
       {:title "Subscriber Client"
        :description "Monitor subscriptions and inspect incoming payloads."
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
                                                  :on-unsubscribe on-unsubscribe
                                                  :connected? connected?
                                                  :clear-error! clear-error!})
                 ($ subscriber-subscriptions-panel {:subscriptions subscriptions
                                                    :on-unsubscribe on-unsubscribe
                                                    :connected? connected?})
                 (when-let [err (:error state)]
                   ($ :div {:className "alert alert-error py-2 text-sm"} err))
                 ($ subscriber-messages-panel {:messages messages}))})))

(defui publisher-section
  [{:keys [config set-config state on-connect on-disconnect form set-form on-publish publish-status clear-status!]}]
  (let [connected? (= :connected (:status state))]
    ($ client-card
       {:title "Publisher Client"
        :description "Send test payloads to your broker to verify routing and QoS."
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
        [pub-state set-pub-state] (use-state {:status :disconnected :transport :websocket :url nil :error nil :retrying? false})
        [sub-state set-sub-state] (use-state {:status :disconnected :transport :websocket :url nil :error nil :retrying? false})
        [sub-form set-sub-form] (use-state {:topic "" :qos 0})
        [pub-form set-pub-form] (use-state {:topic "" :message "" :qos 0 :retain false})
        [messages set-messages] (use-state [])
        [subscriptions set-subscriptions] (use-state #{})
        [publish-status set-publish-status] (use-state {:pending? false :error nil :ok? false})
        [connection-log set-connection-log] (use-state [])
        pub-retry-state (use-ref {:attempt 0 :timer nil :closing? false})
        sub-retry-state (use-ref {:attempt 0 :timer nil :closing? false})
        retry-ref-for (fn [target]
                        (case target
                          :publisher pub-retry-state
                          :subscriber sub-retry-state))
        clear-retry-state!
        (fn [target & [opts]]
          (let [{:keys [closing?] :or {closing? false}} (or opts {})]
            (reset-retry-state! (retry-ref-for target) {:closing? closing?})))]

    (use-effect
     (fn []
       (fn []
         (when-let [client @pub-client]
           (stop-client! client)
           (reset! pub-client nil))
         (when-let [client @sub-client]
           (stop-client! client)
           (reset! sub-client nil))
         (reset-retry-state! pub-retry-state)
         (reset-retry-state! sub-retry-state)
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
                              :publisher (set-pub-state {:status :connected :transport transport :url url :error nil :retrying? false})
                              :subscriber (set-sub-state {:status :connected :transport transport :url url :error nil :retrying? false}))
                            (update-log! {:event "connected" :target (name target) :transport (some-> transport name) :url url})
                            (clear-retry-state! target))
          handle-close! (fn [target]
                          (case target
                            :publisher (set-pub-state (fn [s] (assoc s :status :disconnected :error nil :retrying? false)))
                            :subscriber (set-sub-state (fn [s] (assoc s :status :disconnected :error nil :retrying? false))))
                          (update-log! {:event "closed" :target (name target)}))
          handle-error! (fn [target transport err]
                          (let [msg (or (some-> err (.-message)) (str err))
                                client (case target
                                         :publisher @pub-client
                                         :subscriber @sub-client)]
                            (when client
                              (stop-client! client)
                              (case target
                                :publisher (reset! pub-client nil)
                                :subscriber (reset! sub-client nil)))
                            (update-log! {:event "error"
                                          :target (name target)
                                          :transport (some-> transport name)
                                          :message msg})
                            (case target
                              :publisher (set-pub-state (fn [s] (assoc s :status :error :transport transport :error msg :retrying? false)))
                              :subscriber (set-sub-state (fn [s] (assoc s :status :error :transport transport :error msg :retrying? false))))
                            msg))
          disconnect-client! (fn [target]
                               (let [client-ref (case target
                                                  :publisher pub-client
                                                  :subscriber sub-client)
                                     state (case target
                                             :publisher pub-state
                                             :subscriber sub-state)
                                     state-setter (case target
                                                    :publisher set-pub-state
                                                    :subscriber set-sub-state)]
                                 (state-setter {:status :closing
                                                :transport (:transport state)
                                                :url (:url state)
                                                :error nil
                                                :retrying? false})
                                 (clear-retry-state! target {:closing? true})
                                 (when-let [client @client-ref]
                                   (stop-client! client)
                                   (reset! client-ref nil))
                                 (state-setter {:status :disconnected :transport :websocket :url nil :error nil :retrying? false})
                                 (when (= target :subscriber)
                                   (set-subscriptions #{})))
                               (update-log! {:event "disconnect" :target (name target)}))
          subscribe-topic!
          (letfn [(do-subscribe [form {:keys [suppress-blank?] :or {suppress-blank? false}}]
                    (let [form (or form {})
                          topic (if (contains? form :topic) (:topic form) (:topic sub-form))
                          qos (sanitize-qos (if (contains? form :qos) (:qos form) (:qos sub-form)))
                          client @sub-client]
                      (set-sub-state (fn [s] (assoc s :error nil)))
                      (cond
                        (str/blank? topic)
                        (when-not suppress-blank?
                          (set-sub-state (fn [s] (assoc s :error "Topic required"))))
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
                                                               :message (str "topic=" topic " qos=" qos)}))))))))]
            (fn
              ([form] (do-subscribe form {}))
              ([form opts] (do-subscribe form opts))))
          unsubscribe-topic!
          (letfn [(do-unsubscribe [form {:keys [suppress-blank?] :or {suppress-blank? false}}]
                    (let [form (or form {})
                          topic (if (contains? form :topic) (:topic form) (:topic sub-form))
                          client @sub-client]
                      (set-sub-state (fn [s] (assoc s :error nil)))
                      (cond
                        (str/blank? topic)
                        (when-not suppress-blank?
                          (set-sub-state (fn [s] (assoc s :error "Topic required"))))
                        (nil? client)
                        (set-sub-state (fn [s] (assoc s :error "Subscriber client is not connected")))
                        :else
                        (unsubscribe-client! client topic
                                             (fn [err]
                                               (if err
                                                 (let [msg (cond
                                                             (instance? js/Error err) (.-message err)
                                                             (string? err) err
                                                             :else (str err))]
                                                   (set-sub-state (fn [s] (assoc s :error msg))))
                                                 (do
                                                   (set-subscriptions #(disj % topic))
                                                   (set-sub-state (fn [s] (assoc s :error nil)))
                                                   (update-log! {:event "unsubscribed"
                                                                 :target "subscriber"
                                                                 :message (str "topic=" topic)}))))))))]
            (fn
              ([form] (do-unsubscribe form {}))
              ([form opts] (do-unsubscribe form opts))))
          publish-topic! (fn [form]
                           (let [form (or form {})
                                 topic (if (contains? form :topic) (:topic form) (:topic pub-form))
                                 message (if (contains? form :message) (:message form) (:message pub-form))
                                 qos (sanitize-qos (if (contains? form :qos) (:qos form) (:qos pub-form)))
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
                                  retry-ref (retry-ref-for target)
                                  max-attempts 3]
                              (letfn [(clear-timer! []
                                        (when-let [id (:timer @retry-ref)]
                                          (js/clearTimeout id))
                                        (swap! retry-ref assoc :timer nil))
                                      (message-handler [_ topic payload packet]
                                        (set-messages
                                         (fn [entries]
                                           (->> (conj entries {:topic topic
                                                               :payload payload
                                                               :qos (some-> packet .-qos)
                                                               :timestamp (.toISOString (js/Date.))})
                                                (take-last max-log-entries)
                                                vec))))
                                      (attach-and-record [client url transport attempt]
                                        (let [client-with-handlers (attach-handlers! client
                                                                                     {:on-connect (fn [_ _]
                                                                                                    (handle-connect! target {:transport transport :url url}))
                                                                                      :on-close (fn []
                                                                                                  (handle-close! target)
                                                                                                  (let [data @retry-ref
                                                                                                        closing? (:closing? data)
                                                                                                        attempt' (max 1 (:attempt data))
                                                                                                        timer (:timer data)]
                                                                                                    (when (and (not closing?)
                                                                                                               (< attempt' max-attempts)
                                                                                                               (nil? timer))
                                                                                                      (schedule-retry! "Connection closed" attempt'))))
                                                                                      :on-error (fn [_ err]
                                                                                                  (let [data @retry-ref
                                                                                                        closing? (:closing? data)
                                                                                                        msg (handle-error! target transport err)]
                                                                                                    (when (not closing?)
                                                                                                      (schedule-retry! msg attempt))))
                                                                                      :on-message (when (= target :subscriber)
                                                                                                    message-handler)})]
                                          (when-let [old @client-ref]
                                            (stop-client! old))
                                          (reset! client-ref client-with-handlers)
                                          (update-log! {:event "connecting"
                                                        :target (name target)
                                                        :transport (some-> transport name)
                                                        :url url})))
                                      (schedule-retry! [last-error attempt]
                                        (if (>= attempt max-attempts)
                                          (let [base-msg (if (seq last-error)
                                                           (str "Failed to connect after " attempt " attempts. Last error: " last-error)
                                                           (str "Failed to connect after " attempt " attempts."))
                                                final-msg (str base-msg " No further retries will be attempted.")]
                                            (clear-timer!)
                                            (swap! retry-ref assoc :attempt attempt)
                                            (state-setter (fn [s] (assoc s :status :error :error final-msg :retrying? false)))
                                            (update-log! {:event "retry-exhausted"
                                                          :target (name target)
                                                          :message (str "attempts=" attempt " exhausted")}))
                                          (let [next-attempt (inc attempt)
                                                delay-ms (js/Math.round (next-retry-delay next-attempt))
                                                existing (:timer @retry-ref)
                                                message (if (seq last-error)
                                                          (str last-error " — retrying in " delay-ms "ms (attempt "
                                                               next-attempt " of " max-attempts ").")
                                                          (str "Retrying in " delay-ms "ms (attempt "
                                                               next-attempt " of " max-attempts ")."))]
                                            (state-setter (fn [s] (assoc s :status :error :error message :retrying? true)))
                                            (when-not existing
                                              (let [timer (js/setTimeout
                                                            (fn []
                                                              (swap! retry-ref assoc :timer nil)
                                                              (start-attempt! next-attempt))
                                                            delay-ms)]
                                                (swap! retry-ref assoc :timer timer)
                                                (update-log! {:event "retry-scheduled"
                                                              :target (name target)
                                                              :message (str "attempt=" next-attempt " delayMs=" delay-ms)}))))))
                                      (connect-ws [attempt]
                                        (state-setter {:status :connecting :transport :websocket :url nil :error nil :retrying? true})
                                        (let [{:keys [client url transport]} (connect-websocket! cfg)]
                                          (attach-and-record client url transport attempt)))
                                      (start-attempt! [attempt]
                                        (clear-timer!)
                                        (swap! retry-ref assoc :attempt attempt :closing? false)
                                        (connect-ws attempt))]
                                (clear-retry-state! target)
                                (start-attempt! 1))))
          clear-sub-error! #(set-sub-state (fn [s] (assoc s :error nil)))
          clear-publish-status! #(set-publish-status (fn [s] (assoc s :error nil :ok? false)))]

      ($ :div {:className "space-y-10 pb-10"}
         (heading)
         ($ :div {:className "grid gap-8 lg:grid-cols-2 xl:gap-10"}
            ($ subscriber-section {:config sub-config
                                   :set-config set-sub-config
                                   :state sub-state
                                   :on-connect (fn []
                                                 (connect-client! :subscriber sub-config)
                                                 (subscribe-topic! sub-form {:suppress-blank? true}))
                                   :on-disconnect (fn [] (disconnect-client! :subscriber))
                                   :form sub-form
                                   :set-form set-sub-form
                                   :on-subscribe (fn [] (subscribe-topic! sub-form))
                                   :on-unsubscribe (fn
                                                     ([] (unsubscribe-topic! sub-form))
                                                     ([topic] (unsubscribe-topic! {:topic topic} {:suppress-blank? true})))
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
