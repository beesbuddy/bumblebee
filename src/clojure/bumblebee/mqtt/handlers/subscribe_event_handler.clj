(ns bumblebee.mqtt.handlers.subscribe-event-handler
  (:require
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.store.in-memory-subscription-store :as subs]
   [bumblebee.mqtt.util :as util]
   [bumblebee.core.subscription :as s])
  (:import
   [io.netty.channel ChannelHandlerContext]
   [io.netty.handler.codec.mqtt
    MqttQoS
    MqttSubscribeMessage
    MqttTopicSubscription]))

(defn wrap-mqtt-stores [handler stores]
  (fn [request]
    (handler (assoc request :mqtt-store stores))))

(defn- send-retained-if-any!
  "Fetch retained messages for topic and publish to current subscriber."
  [retain-store ^ChannelHandlerContext ctx sub]
  (let [retained (if retain-store (core/match-retains retain-store (:topic sub)) [])]
    (doseq [m retained :when (some? m)]
      (let [msg (core/copy-common-publish-message m)
            qos (MqttQoS/valueOf (int (:mqtt-qos msg)))
            message-id (int (or (:message-id msg) 0))
            publish-msg (core/build-publish-message msg qos message-id)]
        (.writeAndFlush ctx publish-msg)))))

(defn subscribe-event-handler
  [{:keys [^ChannelHandlerContext ctx ^MqttSubscribeMessage msg] :as request}]
  (let [session-store (-> request :mqtt-store :session-store)
        sub-store (-> request :mqtt-store :subscription-store)
        retain-store (-> request :mqtt-store :retain-store)
        ch (.channel ctx)
        client-id (util/client-id ch)
        topic-subs (.. msg payload topicSubscriptions)]
    (if-let [_session (core/get-session session-store client-id)]
      (let [qos-results (transient [])]
        (doseq [^MqttTopicSubscription t topic-subs]
          (let [topic (.topicFilter t)
                qos (.qualityOfService t)
                sub (s/make-subscription client-id topic qos)
                added (subs/add-subscription sub-store sub)
                granted (if added (.value qos) (.value MqttQoS/FAILURE))]
            (conj! qos-results (int granted))
            ;; On success, fire any retained messages
            (when added
              (send-retained-if-any! retain-store ctx sub))))
        (let [granted-list (persistent! qos-results)
              suback (util/sub-ack-message (.. msg variableHeader messageId) granted-list)]
          (.writeAndFlush ctx suback)))
      (.close ch))))
