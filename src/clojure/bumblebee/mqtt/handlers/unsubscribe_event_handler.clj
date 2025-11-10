(ns bumblebee.mqtt.handlers.unsubscribe-event-handler
  (:require
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.util :as util]
   [bumblebee.mqtt.store.subscription :as s])
  (:import
   [io.netty.channel ChannelHandlerContext]
   [io.netty.handler.codec.mqtt MqttUnsubscribeMessage]))

(defn unsubscribe-event-handler
  [{:keys [^ChannelHandlerContext ctx ^MqttUnsubscribeMessage msg] :as request}]
  (let [session-store (-> request :mqtt-store :session-store)
        sub-store (-> request :mqtt-store :subscription-store)
        ch (.channel ctx)
        client-id (util/client-id ch)
        topics (seq (some-> msg .payload .topics))]
    (when (and (seq topics)
               (core/get-session session-store client-id))
      (doseq [topic topics
              :let [subscription (s/make-subscription client-id topic)]]
        (core/remove-subscription sub-store subscription))
      (let [unsubscribe-msg (util/unsub-ack-message (-> msg .variableHeader .messageId))]
        (.writeAndFlush ch unsubscribe-msg)))))

