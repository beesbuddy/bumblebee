(ns bumblebee.mqtt.messages-dispatcher
  (:require
   [bumblebee.mqtt.config :as cfg]
   [bumblebee.mqtt.handlers.connect-event-handler :as connect]
   [bumblebee.mqtt.filters :as fx])
  (:import
   [io.netty.channel ChannelHandlerContext SimpleChannelInboundHandler ChannelHandler ChannelPipeline]
   [io.netty.channel.embedded EmbeddedChannel]
   [io.netty.buffer ByteBuf]
   [io.netty.handler.codec.mqtt
    MqttMessage
    MqttDecoder
    MqttMessageType
    MqttMessageFactory
    MqttFixedHeader
    MqttQoS
    MqttConnAckVariableHeader
    MqttConnectReturnCode
    MqttConnectMessage
    MqttUnacceptableProtocolVersionException
    MqttIdentifierRejectedException]
    [io.netty.handler.codec DecoderResult]
    [io.netty.util ReferenceCountUtil]))

(defn- message-not-decoded?
  [^MqttMessage msg ^ChannelHandlerContext ctx]
  (when (and msg (.decoderResult msg) (.isFailure ^DecoderResult (.decoderResult msg)))
    (let [cause (.cause (.decoderResult msg))
          ch (.channel ctx)]
      (cond
        (instance? MqttUnacceptableProtocolVersionException cause)
        (let [fh (MqttFixedHeader. MqttMessageType/CONNACK false MqttQoS/AT_MOST_ONCE false 0)
              vh (MqttConnAckVariableHeader. MqttConnectReturnCode/CONNECTION_REFUSED_UNACCEPTABLE_PROTOCOL_VERSION false)
              m (MqttMessageFactory/newMessage fh vh nil)]
          (.writeAndFlush ch m))

        (instance? MqttIdentifierRejectedException cause)
        (let [fh (MqttFixedHeader. MqttMessageType/CONNACK false MqttQoS/AT_MOST_ONCE false 0)
              vh (MqttConnAckVariableHeader. MqttConnectReturnCode/CONNECTION_REFUSED_IDENTIFIER_REJECTED false)
              m (MqttMessageFactory/newMessage fh vh nil)]
          (.writeAndFlush ch m))

        :else nil)
      (.close ch)
      true)))

(defn new-messages-dispatcher
  "Create a sharable MQTT messages dispatcher ChannelHandler.

  opts keys:
  - :config map (unused here but reserved for future)
  - :connect-event-processor fn taking {:ctx .. :msg ..} (defaults to wrapped connect handler)"
  ([] (new-messages-dispatcher {:config (cfg/get-config)
                       :connect-event-processor (connect/wrap-mqtt-store connect/connect-event-handler)}))
  ([{:keys [config connect-event-processor]
     :or   {config (cfg/get-config)
            connect-event-processor (connect/wrap-mqtt-store connect/connect-event-handler)

            }}]
   (proxy [SimpleChannelInboundHandler] [MqttMessage]
     (channelRead0 [^ChannelHandlerContext ctx ^MqttMessage msg]
       (when-not (message-not-decoded? msg ctx)
         (let [mt (.. msg fixedHeader messageType)
               type-kw (condp = mt
                         MqttMessageType/CONNECT :connect
                         MqttMessageType/PUBLISH :publish
                         MqttMessageType/SUBSCRIBE :subscribe
                         MqttMessageType/UNSUBSCRIBE :unsubscribe
                         MqttMessageType/PINGREQ :pingreq
                         :other)
               res (fx/apply-chain {:type type-kw :ctx ctx :msg msg})]
           (case (:action res)
             :deny (do (when-let [r (:reply res)] (.writeAndFlush ctx r)) (.close ctx))
             :close (.close ctx)
             ;:handled nil
             :next (let [msg' (or (get-in res [:event :msg]) msg)]
                     (try
                       (cond
                         (= MqttMessageType/CONNECT mt)
                         (connect-event-processor {:ctx ctx :msg ^MqttConnectMessage msg'})
                         :else
                         (do
                           ;; Forward non-CONNECT; retain to avoid release by SimpleChannelInboundHandler
                           (ReferenceCountUtil/retain msg')
                           (.fireChannelRead ctx msg')))
                       (catch Throwable ex
                         (.fireExceptionCaught ctx ex)
                         (.close ctx))))
             ;; default: forward as-is
             (do (ReferenceCountUtil/retain msg)
                 (.fireChannelRead ctx msg)))))))))

;; Simple sanity test (comment-only, run in REPL)
(comment
  (require '[bumblebee.mqtt.util :as util])
  (require '[bumblebee.mqtt.channel-initializer :as ch-init])

  ;; Build dispatcher that knows how to handle CONNECT
  (def dispatcher (new-messages-dispatcher))

  ;; Create an embedded channel with our MQTT pipeline + dispatcher
  (def ec
    (util/create-embedded-channel
     (fn [_] nil)
     (fn [pipeline]
       ;; Install decoder/encoder/idle
       (ch-init/configure-pipeline! ^ChannelPipeline pipeline)
       ;; Add our dispatcher explicitly (compat with 1-arity versions)
       (.addLast ^ChannelPipeline pipeline "mqttMain" ^ChannelHandler dispatcher))))

  ;; Send a CONNECT message into the channel
  (connect/send-message-to-channel ec "clientId" "username" "password")

  ;; Read outbound response (should be CONNACK)
  (let [^Object resp (.readOutbound ^EmbeddedChannel ec)
        msg  (if (instance? ByteBuf resp)
               ;; If encoder ran, decode ByteBuf back to MqttMessage to inspect
               (let [decoder (MqttDecoder.)
                     ^"[Lio.netty.channel.ChannelHandler;" handlers (into-array ChannelHandler [decoder])
                     ^EmbeddedChannel dec-ch (EmbeddedChannel. handlers)]
                 (.writeInbound dec-ch (into-array Object [resp]))
                 (.readInbound dec-ch))
               resp)]
    (println "Outbound response type:" (.. ^MqttMessage msg fixedHeader messageType toString)))
  )
