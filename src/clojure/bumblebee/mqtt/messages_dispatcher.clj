(ns bumblebee.mqtt.messages-dispatcher
  (:require
    [bumblebee.mqtt.config :as cfg]
    [bumblebee.mqtt.handlers.connect-event-handler :as connect]
    [bumblebee.mqtt.handlers.disconnect-event-handler :as disconnect]
    [bumblebee.mqtt.handlers.subscribe-event-handler :as subscribe]
    [bumblebee.mqtt.handlers.publish-event-handler :as publish]
    [bumblebee.mqtt.filters :as fx]
    [bumblebee.mqtt.store.in-memory.session-store :as sess]
    [bumblebee.mqtt.store.in-memory.subscription-store :as subs]
    [bumblebee.mqtt.store.in-memory.dup-pub-messages-store :as dup]
    [bumblebee.mqtt.store.in-memory.messages-id-store :as mid]
    [bumblebee.mqtt.store.in-memory.retain-store :as retain])
  (:import
    [io.netty.channel ChannelHandlerContext ChannelInboundHandlerAdapter ChannelHandler ChannelPipeline]
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
     MqttPublishMessage
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
  - :connect-event-processor fn taking {:ctx ... :msg ...}
  - :disconnect-event-processor fn taking {:ctx ... :msg ...}
  - :subscribe-event-processor fn taking {:ctx ... :msg ...}"
  ([] (new-messages-dispatcher {:config                     (cfg/get-config)
                                :stores                     {:session-store      (sess/init)
                                                             :subscription-store (subs/init)
                                                             :dup-pub-store      (dup/init)
                                                             :message-id-store   (mid/init)
                                                             :retain-store       (retain/init)}
                                :connect-event-processor    connect/connect-event-handler
                                :disconnect-event-processor disconnect/disconnect-event-handler
                                :subscribe-event-processor  subscribe/subscribe-event-handler
                                :publish-event-processor    publish/publish-event-handler}))
  ([{:keys [config stores connect-event-processor disconnect-event-processor subscribe-event-processor publish-event-processor]
     :or   {config                     (cfg/get-config)
            stores                     {:session-store      (sess/init)
                                        :subscription-store (subs/init)
                                        :dup-pub-store      (dup/init)
                                        :message-id-store   (mid/init)
                                        :retain-store       (retain/init)}
            connect-event-processor    connect/connect-event-handler
            disconnect-event-processor disconnect/disconnect-event-handler
            subscribe-event-processor  subscribe/subscribe-event-handler
            publish-event-processor    publish/publish-event-handler}}]
   (let [store-bundle (if (:node-name stores)
                        stores
                        (assoc stores :node-name (-> config :mqtt-config :node-name)))]
     (proxy [ChannelInboundHandlerAdapter] []
       (channelRead [^ChannelHandlerContext ctx ^MqttMessage msg]
         (when-not (message-not-decoded? msg ctx)
           (let [mt (-> msg .fixedHeader .messageType)
                 evt-type (condp = mt
                           MqttMessageType/CONNECT :connect
                           MqttMessageType/PUBLISH :publish
                           MqttMessageType/SUBSCRIBE :subscribe
                           MqttMessageType/UNSUBSCRIBE :unsubscribe
                           MqttMessageType/DISCONNECT :disconnect
                           MqttMessageType/PINGREQ :pingreq
                           :other)
                 res (fx/apply-chain {:type evt-type :ctx ctx :msg msg})
                 req-base {:ctx ctx :msg msg :mqtt-store store-bundle}]
             (case (:action res)
               :deny (do (when-let [r (:reply res)] (.writeAndFlush ctx r)) (.close ctx))
               :close (.close ctx)
               ;; :handled nil
               :next (let [msg' (or (get-in res [:event :msg]) msg)]
                       (try

                         (cond
                           (= MqttMessageType/CONNECT mt)
                           (connect-event-processor (assoc req-base :msg ^MqttConnectMessage msg'))
                           (= MqttMessageType/PUBLISH mt)
                           (publish-event-processor (assoc req-base :msg ^MqttPublishMessage msg'))
                           (= MqttMessageType/DISCONNECT mt)
                           (disconnect-event-processor (assoc req-base :msg msg'))
                           (= MqttMessageType/SUBSCRIBE mt)
                           (subscribe-event-processor (assoc req-base :msg msg'))
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
                   (.fireChannelRead ctx msg))))))))))

;; Simple sanity test (comment-only, run in REPL)
(comment
  (require '[bumblebee.mqtt.util :as util :refer [send-message-to-channel]])
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
  (send-message-to-channel ec "clientId" "username" "password")

  ;; Read outbound response (should be CONNACK)
  (let [^Object resp (.readOutbound ^EmbeddedChannel ec)
        msg (if (instance? ByteBuf resp)
              ;; If encoder ran, decode ByteBuf back to MqttMessage to inspect
              (let [decoder (MqttDecoder.)
                    ^"[Lio.netty.channel.ChannelHandler;" handlers (into-array ChannelHandler [decoder])
                    ^EmbeddedChannel dec-ch (EmbeddedChannel. handlers)]
                (.writeInbound dec-ch (into-array Object [resp]))
                (.readInbound dec-ch))
              resp)]
    (println "Outbound response type:" (.. ^MqttMessage msg fixedHeader messageType toString))))
