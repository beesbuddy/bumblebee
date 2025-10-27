; TODO: Move generic utils not related to mqtt to separate namespace
(ns bumblebee.mqtt.util
  (:require
    [clojure.spec.alpha :as s])
  (:import
    [java.net InetSocketAddress]
    [java.nio.charset StandardCharsets]
    [java.time LocalDateTime]
    [java.time.format DateTimeFormatter]
    [io.netty.buffer ByteBuf Unpooled]
    [io.netty.channel Channel ChannelHandlerContext ChannelInboundHandlerAdapter SimpleChannelInboundHandler]
    [io.netty.channel.embedded EmbeddedChannel]
    [io.netty.util AttributeKey]
    [io.netty.handler.codec.mqtt
     MqttConnAckMessage
     MqttConnAckVariableHeader
     MqttConnectReturnCode
     MqttFixedHeader
     MqttMessage
     MqttMessageBuilders
     MqttMessageIdVariableHeader
     MqttMessageType
     MqttPubAckMessage
     MqttPublishMessage
     MqttPublishVariableHeader
     MqttQoS
     MqttSubAckMessage
     MqttSubAckPayload
     MqttUnsubAckMessage
     MqttVersion]))

(defn create-embedded-channel
  "Create a Netty EmbeddedChannel for tests.
  - handler-fn: fn taking {:ctx ChannelHandlerContext :msg MqttMessage}
  - pipeline-config-fn (optional): fn taking ChannelPipeline to add handlers"
  ([handler-fn]
   (create-embedded-channel handler-fn nil))
  ([handler-fn pipeline-config-fn]
   (let [ec (EmbeddedChannel.)
         on-connect-handler
         (proxy [SimpleChannelInboundHandler] [MqttMessage]
           (channelRead0 [^ChannelHandlerContext ctx ^MqttMessage msg]
             (handler-fn {:ctx ctx :msg msg})))]
     (when pipeline-config-fn
       (pipeline-config-fn (.pipeline ec)))
     (-> (.pipeline ec) (.addLast "onConnectHandler" on-connect-handler))
     (doto (.config ec)
       (.setWriteBufferLowWaterMark 5)
       (.setWriteBufferHighWaterMark 10))
     ec)))

;; -----------------------------------------------------------------------------
;; MQTT message helpers (idiomatic Clojure ports of the original Kotlin)
;; -----------------------------------------------------------------------------

(def ^:private time-formatter (DateTimeFormatter/ofPattern "yyyyMMddHHmmss"))

(defrecord CommonPublishMessage [target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name])

(defn- now-str []
  (.format (LocalDateTime/now) time-formatter))

(defn copy-common-publish-message
  "Return a shallow copy of `msg` as `CommonPublishMessage`. Accepts optional
  overrides via key/value pairs."
  ([msg]
   (map->CommonPublishMessage (into {} msg)))
  ([msg & kvs]
   (map->CommonPublishMessage (merge (into {} msg) (apply hash-map kvs)))))

(defn read-bytes-and-rewind
  "Read all readable bytes from a ByteBuf and reset reader index."
  [^ByteBuf payload]
  (let [len (.readableBytes payload)
        mark (.readerIndex payload)
        out (byte-array len)]
    (.readBytes payload out)
    (.readerIndex payload mark)
    out))

(defn mqtt-msg->comm-pub-msg [message is-will source-node-name]
  (let [payload-bytes (read-bytes-and-rewind (.payload message))
        payload-str (when payload-bytes (String. ^bytes payload-bytes StandardCharsets/UTF_8))]
    (->CommonPublishMessage
      nil
      (-> message (.variableHeader) (.topicName))
      (-> message (.variableHeader) (.packetId))
      payload-str
      (-> message (.fixedHeader) (.qosLevel) (.value))
      (-> message (.fixedHeader) (.isRetain))
      is-will
      (now-str)
      source-node-name)))

(defn make-common-publish-message
  [& {:keys [target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name]
      :or   {create-time (now-str)}}]
  (->CommonPublishMessage target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name))

(defn build-publish-message
  "Create an `MqttPublishMessage` from `CommonPublishMessage` using the
  provided QoS (enum) and message-id integer."
  [^CommonPublishMessage msg ^MqttQoS qos message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBLISH false qos (boolean (:is-retain msg)) 0)
        variable-header (MqttPublishVariableHeader. (:topic msg) (int message-id))
        payload-bytes (if-let [body (:message-body msg)]
                        (.getBytes ^String body StandardCharsets/UTF_8)
                        (byte-array 0))]
    (MqttPublishMessage. fixed-header variable-header (doto (Unpooled/buffer (alength ^bytes payload-bytes))
                                                        (.writeBytes ^bytes payload-bytes)))))

;; Netty channel attribute helpers (ported from Kotlin NettyUtil)
(def ^AttributeKey ATTR-CLIENT-ID (AttributeKey/valueOf "clientId"))
(def ^AttributeKey ATTR-USER-NAME (AttributeKey/valueOf "userName"))

(defn client-id
  "Get or set `clientId` attribute on a Netty `Channel`.
  - (client-id ch) -> String
  - (client-id ch v) -> sets and returns v"
  ([^Channel ch]
   (some-> (.attr ch ATTR-CLIENT-ID) (.get)))
  ([^Channel ch v]
   (doto (.attr ch ATTR-CLIENT-ID)
     (.set v))
   v))

(defn user-name
  "Get or set `userName` attribute on a Netty `Channel`.
  - (user-name ch) -> String
  - (user-name ch v) -> sets and returns v"
  ([^Channel ch]
   (some-> (.attr ch ATTR-USER-NAME) (.get)))
  ([^Channel ch v]
   (doto (.attr ch ATTR-USER-NAME)
     (.set v))
   v))

(defn client-info
  "Convenience: set both client-id and user-name on a channel."
  [^Channel ch client-id-val user-name-val]
  (client-id ch client-id-val)
  (user-name ch user-name-val)
  nil)

(defn remote-ip
  "Return remote IP address string for the given Netty channel, or empty string."
  [^Channel ch]
  (try
    (let [^InetSocketAddress sa (.remoteAddress ch)]
      (-> sa .getAddress .getHostAddress))
    (catch Throwable _ "")))

(defn min-qos
  "Return the minimum of two QoS levels (ints)."
  [qos1 qos2]
  (min (int qos1) (int qos2)))

(defn conn-ack-message
  "Build an MQTT CONNACK message.
  - return-code: `MqttConnectReturnCode`
  - session-present?: boolean (defaults to false)"
  ([^MqttConnectReturnCode return-code]
   (conn-ack-message return-code false))
  ([^MqttConnectReturnCode return-code session-present?]
   (let [fixed-header (MqttFixedHeader. MqttMessageType/CONNACK false MqttQoS/AT_MOST_ONCE false 0)
         variable-header (MqttConnAckVariableHeader. return-code (boolean session-present?))]
     (MqttConnAckMessage. fixed-header variable-header))))

(defn sub-ack-message
  "Build an MQTT SUBACK message.
  - message-id: int
  - qos-list: seq of ints (granted QoS levels)"
  [message-id qos-list]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/SUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))
        payload (MqttSubAckPayload. (int-array (map int qos-list)))]
    (MqttSubAckMessage. fixed-header id-header payload)))

(defn pub-ack-message
  "Build an MQTT PUBACK message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttPubAckMessage. fixed-header id-header)))

(defn pub-rec-message
  "Build an MQTT PUBREC message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBREC false MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn pub-comp-message
  "Build an MQTT PUBCOMP message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBCOMP false MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn pub-rel-message
  "Build an MQTT PUBREL message.
  - is-dup?: boolean to mark message as duplicate"
  [message-id is-dup?]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBREL (boolean is-dup?) MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn unsub-ack-message
  "Build an MQTT UNSUBACK message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/UNSUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttUnsubAckMessage. fixed-header id-header)))

(defn ping-resp-message
  "Build an MQTT PINGRESP message."
  []
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PINGRESP false MqttQoS/AT_MOST_ONCE false 0)]
    (MqttMessage. fixed-header)))

(defn copy-bytes
  "Return a shallow copy of the given byte array."
  ^bytes [^bytes bytes]
  (aclone bytes))

(defn send-message-to-channel [ec client_id username password]
  (let [msg (-> (MqttMessageBuilders/connect)
                (.protocolVersion MqttVersion/MQTT_3_1_1)
                (.clientId client_id)
                (.username username)
                (.password (.getBytes password))
                (.cleanSession true)
                (.build))]
    (.writeInbound ec (into-array Object [msg]))))

(defn tap [^String label]
  (proxy [ChannelInboundHandlerAdapter] []
    (channelRead
      ([^ChannelHandlerContext ctx msg]
       (println (str "[" label "] inbound: " (class msg)))
       (.fireChannelRead ctx msg)))))

(s/def ::defnr
  (s/cat :name simple-symbol?
         :doc (s/? string?)
         :attr-map (s/? map?)
         :fn-tails (s/+ any?)))

(defmacro defnr
  "Defines a new function as [[defn]], but old references will refer to new versions when reloaded.

  This will construct a phantom var that's used for the lookup, so calls to
  functions defined with this macro will have an additional layer of
  indirection as compared to normal functions. This should also work in
  production environments compiled with direct linking turned on.
  I do not recommend using this macro, but it can be useful for beginners
  who are learning how to write webservers or other persistent applications
  and don't want to worry about having a bad reloadability experience.
  Instead of using this, I recommend learning about Clojure's evaluation
  model, which will allow you to have the same benefits as using this
  macro, but without any magic."
  [& args]
  (let [args (s/conform ::defnr args)]
    `(let [v# (or (when-let [fn# (binding [*ns* ~*ns*]
                                   (resolve '~(:name args)))]
                    (-> (meta fn#) ::impl))
                  (with-local-vars [v# nil] v#))]
       (alter-var-root v# (constantly (fn ~(:name args) ~@(:fn-tails args))))
       (doto (def ~(:name args) (fn [~'& args#] (apply @v# args#)))
         (alter-meta! merge (assoc (merge {:doc ~(:doc args)}
                                          ~(:attr-map args))
                              ::impl v#))))))


(comment
  ;; Examples: Using create-embedded-channel in the REPL

  ;; 1) Minimal usage with a custom handler function
  (defn log-handler [{:keys [_ctx msg]}]
    (println "received message:" msg))

  (def log-channel (create-embedded-channel log-handler))

  ;; 2) With MQTT pipeline configured (decoder/encoder/idle handler)
  (require '[bumblebee.mqtt.channel-initializer :as ch-initilizer])
  (def ch-mqtt (create-embedded-channel log-handler ch-initilizer/configure-pipeline!))

  ;; Inspect handlers installed on the pipeline
  (let [p (.pipeline ch-mqtt)]
    [(some? (.get p io.netty.handler.timeout.IdleStateHandler))
     (some? (.get p io.netty.handler.codec.mqtt.MqttDecoder))
     (some? (.get p io.netty.handler.codec.mqtt.MqttEncoder))])
  )
