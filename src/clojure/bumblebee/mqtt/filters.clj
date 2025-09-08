(ns bumblebee.mqtt.filters
  (:require
   [clojure.spec.alpha :as s]
   [bumblebee.mqtt.util :as util])
  (:import [io.netty.handler.codec.mqtt MqttConnectReturnCode]))

;; Minimal, hot-reloadable filter chain for programmable broker behavior.
;; Public contract (stable):
;; - A filter is a pure-ish fn of 1 arg: (fn [event] result)
;; - `event` is a map: {:type :connect|:publish|:subscribe|:unsubscribe|:pingreq|:other
;;                      :ctx  io.netty.channel.ChannelHandlerContext
;;                      :msg  io.netty.handler.codec.mqtt.MqttMessage (or subtype)
;;                      ...extensible keys}
;; - `result` is a map with :action and optional payload:
;;   {:action :next    :event event'}   ; continue to next filter/handler (optionally mutated event)
;;   {:action :deny    :reply netty-msg?} ; optionally reply then close
;;   {:action :close}                    ; close connection, no reply
;;   {:action :handled}                  ; stop chain, do not forward
;;
;; Authors can either:
;; - Provide a bare fn matching the contract and call `add!`/`remove!`, or
;; - Use `deffilter` helper macro to attach name/priority metadata and register it.
;;
;; Optionally, you can validate filters during development by wrapping with `validate-filter`.

;; Specs to document and optionally validate the contract (lightweight; non-enforcing by default)
(s/def ::type #{:connect :publish :subscribe :unsubscribe :pingreq :other})
(s/def ::ctx some?)
(s/def ::msg some?)
(s/def ::event (s/keys :req-un [::type ::ctx ::msg]))
(s/def ::action #{:next :deny :close :handled})
(s/def ::reply (s/nilable some?))
(s/def ::result
  (s/and
   map?
   (s/keys :req-un [::action]
           :opt-un [::reply ::event])
   (fn [{:keys [action]}]
     (contains? #{:next :deny :close :handled} action))))

(defn validate-filter
  "Wrap a filter fn with clojure.spec checks for inputs/outputs.
  Intended for dev/debug; avoid in hot paths if performance-sensitive."
  [f]
  (fn [event]
    (when-not (s/valid? ::event event)
      (throw (ex-info "Invalid filter event" {:problems (s/explain-data ::event event)})))
    (let [res (f event)]
      (when-not (s/valid? ::result res)
        (throw (ex-info "Invalid filter result" {:problems (s/explain-data ::result res)})))
      res)))

(defonce registry (atom []))

(defn clear!
  []
  (reset! registry []))

(defn add!
  "Register a filter with `name` and optional `priority` (lower runs earlier).
  `f` must be a fn of `event -> result` per the contract. Returns the entry.

  Options (four-arity):
  - :types set|vector of event types to run on (e.g., #{:connect :publish}); nil = all
  - :when  predicate fn of event -> boolean; both :types and :when can be combined

  Examples:
  (add! ::audit 10 (fn [ev] {:action :next}))
  (add! ::auth 0 my-filter {:types #{:connect}})"
  ([name f] (add! name 0 f))
  ([name priority f] (add! name priority f nil))
  ([name priority f {:keys [types when] :as _opts}]
   (let [types' (cond
                  (nil? types) nil
                  (set? types) types
                  (vector? types) (set types)
                  :else (throw (ex-info ":types must be a set or vector of event types" {:types types})))
         entry {:name name :priority (long priority) :fn f :types types' :when when}]
     (swap! registry (fn [rs]
                       (->> (conj rs entry)
                            (sort-by :priority))))
     entry)))

(defn remove!
  [name]
  (swap! registry (fn [rs] (remove #(= name (:name %)) rs))))

(defn show
  []
  (mapv (fn [{:keys [name priority types]}]
          {:name name :priority priority :types (when types (vec types))})
        @registry))

;; Convenience: macro to define and register a filter in one place.
(defmacro deffilter
  "Define a var `name` with a filter fn body and register it.
  Options:
  - :priority int (default 0)
  - :types #{:connect :publish ...} (default all)
  - :when  predicate of event -> boolean

  Example:
  (deffilter deny-pub
    {:priority 10}
    (fn [{:keys [type] :as ev}]
      (if (= :publish type)
        {:action :deny}
        {:action :next :event ev})))"
  [sym opts fexpr]
  (let [prio (or (:priority opts) 0)
        types (:types opts)
        pred  (:when opts)]
    `(do
       (def ~sym ~fexpr)
       (add! ~(keyword (str *ns*) (name sym)) ~prio ~sym ~(cond-> {}
                                                           types (assoc :types types)
                                                           pred  (assoc :when pred))))))

;; Config-driven registration (optional; call from your bootstrap if desired)
(defn register-from-config!
  "Register filters listed under [:mqtt-config :filters].
  Each item is a map with keys:
  - :name keyword (required)
  - :priority int (optional, default 0)
  - :impl symbol|fn (required) a var pointing to a filter fn or a factory
  - :args vector (optional) passed if :impl is a factory returning a filter fn
  - :validate? boolean (optional) wrap with `validate-filter` when true

  Returns vector of registered entries. Does nothing if no filters configured."
  [config]
  (let [items (get-in config [:mqtt-config :filters])]
    (when (seq items)
      (mapv (fn [{:keys [name priority impl args validate? types when]}]
              (let [f (cond
                        (fn? impl) impl
                        (symbol? impl) (let [vf (requiring-resolve impl)]
                                         (if args (apply vf args) vf))
                        :else (throw (ex-info "Invalid :impl; must be fn or symbol" {:impl impl})))
                    f' (if validate? (validate-filter f) f)
                    when' (cond
                            (nil? when) nil
                            (fn? when) when
                            (symbol? when) (requiring-resolve when)
                            :else (throw (ex-info ":when must be fn or symbol" {:when when})))
                    opts (cond-> {}
                           types (assoc :types (if (set? types) types (set types)))
                           when' (assoc :when when'))]
                (add! name (or priority 0) f' opts)))
            items))))

(defn apply-chain
  "Run the registry over event. Returns a result map (see header)."
  [event]
  (loop [ev event, [x & xs] @registry]
    (if-not x
      {:action :next :event ev}
      (let [f (:fn x)
            types (:types x)
            pred (:when x)
            t (:type ev)
            run? (and (or (nil? types) (contains? types t))
                      (or (nil? pred)
                          (try (boolean (pred ev))
                               (catch Throwable _ false))))
            res (if-not run?
                  {:action :next :event ev}
                  (try (f ev)
                       (catch Throwable t {:action :deny :error t})))]
        (case (:action res)
          :next    (recur (or (:event res) ev) xs)
          :deny    res
          :close   res
          :handled res
          (recur ev xs))))))

;; -----------------------------------------------------------------------------
;; Built-in filters
;; -----------------------------------------------------------------------------

(defn make-deny-all-filter
  "Create a deny-all filter that, for :connect events, replies with a CONNACK
  using the provided return code (defaults to NOT_AUTHORIZED), then closes."
  ([] (make-deny-all-filter MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([^MqttConnectReturnCode return-code]
   (fn [{:keys [type] :as _ev}]
     (if (= :connect type)
       {:action :deny
        ;; session-present must be false for non-zero return codes
        :reply (util/conn-ack-message return-code false)}
       {:action :deny}))))

(defn enable-deny-all!
  "Register deny-all filter with optional priority and return code.
  Arity:
  - []               -> priority 0, NOT_AUTHORIZED
  - [priority]       -> NOT_AUTHORIZED
  - [priority code]  -> custom `MqttConnectReturnCode`"
  ([] (enable-deny-all! 0 MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([priority] (enable-deny-all! priority MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([priority ^MqttConnectReturnCode return-code]
   (add! ::deny-all priority (make-deny-all-filter return-code))))

(comment
  ;; Example filter: deny publishes to topic prefix "secure/" (pseudo, no topic read here)
  (defn example-filter [ev]
    ;; Inspect ev {:type :publish :msg ...}
    {:action :next :event ev})

  (clear!)
  (add! ::example 10 example-filter)
  (show)
  )
