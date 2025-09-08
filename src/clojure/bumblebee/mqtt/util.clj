(ns bumblebee.mqtt.util
  (:require [clojure.spec.alpha :as s])
  (:import
   [io.netty.buffer ByteBuf]
   [io.netty.channel ChannelHandlerContext SimpleChannelInboundHandler]
   [io.netty.channel.embedded EmbeddedChannel]
   [io.netty.handler.codec.mqtt
    MqttConnAckMessage
    MqttConnAckVariableHeader
    MqttConnectReturnCode
    MqttFixedHeader
    MqttMessage
    MqttMessageIdVariableHeader
    MqttMessageType
    MqttPubAckMessage
    MqttQoS
    MqttSubAckMessage
    MqttSubAckPayload
    MqttUnsubAckMessage]))

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
   (let [fixed-header   (MqttFixedHeader. MqttMessageType/CONNACK false MqttQoS/AT_MOST_ONCE false 0)
         variable-header (MqttConnAckVariableHeader. return-code (boolean session-present?))]
     (MqttConnAckMessage. fixed-header variable-header))))

(defn sub-ack-message
  "Build an MQTT SUBACK message.
  - message-id: int
  - qos-list: seq of ints (granted QoS levels)"
  [message-id qos-list]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/SUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))
        payload      (MqttSubAckPayload. (int-array (map int qos-list)))]
    (MqttSubAckMessage. fixed-header id-header payload)))

(defn pub-ack-message
  "Build an MQTT PUBACK message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttPubAckMessage. fixed-header id-header)))

(defn pub-rec-message
  "Build an MQTT PUBREC message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBREC false MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn pub-comp-message
  "Build an MQTT PUBCOMP message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBCOMP false MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn pub-rel-message
  "Build an MQTT PUBREL message.
  - is-dup?: boolean to mark message as duplicate"
  [message-id is-dup?]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PUBREL (boolean is-dup?) MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttMessage. fixed-header id-header)))

(defn unsub-ack-message
  "Build an MQTT UNSUBACK message."
  [message-id]
  (let [fixed-header (MqttFixedHeader. MqttMessageType/UNSUBACK false MqttQoS/AT_MOST_ONCE false 0)
        id-header    (MqttMessageIdVariableHeader/from (int message-id))]
    (MqttUnsubAckMessage. fixed-header id-header)))

(defn ping-resp-message
  "Build an MQTT PINGRESP message."
  []
  (let [fixed-header (MqttFixedHeader. MqttMessageType/PINGRESP false MqttQoS/AT_MOST_ONCE false 0)]
    (MqttMessage. fixed-header)))

(defn read-bytes-and-rewind
  "Read all readable bytes from a ByteBuf and reset reader index."
  [^ByteBuf payload]
  (let [len  (.readableBytes payload)
        mark (.readerIndex payload)
        out  (byte-array len)]
    (.readBytes payload out)
    (.readerIndex payload mark)
    out))

(defn copy-bytes
  "Return a shallow copy of the given byte array."
  ^bytes [^bytes bytes]
  (aclone bytes))


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
