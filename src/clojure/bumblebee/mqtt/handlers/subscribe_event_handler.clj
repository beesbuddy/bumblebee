(ns bumblebee.mqtt.handlers.subscribe-event-handler
  (:require
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.util :as util]
   [bumblebee.mqtt.store.subscription :as s]
   [bumblebee.mqtt.system :as system])
  (:import
   [io.netty.channel ChannelHandlerContext]
   [io.netty.handler.codec.mqtt
    MqttQoS
    MqttSubscribeMessage
    MqttTopicSubscription]))

(defn- send-retained-if-any!
  "Fetch retained messages for topic and publish to current subscriber."
  [retain-store ^ChannelHandlerContext ctx sub]
  (let [retained (if retain-store (core/match-retains retain-store (:topic sub)) [])]
    (doseq [m retained :when (some? m)]
      (let [msg (util/copy-common-publish-message m)
            qos (MqttQoS/valueOf (int (:mqtt-qos msg)))
            message-id (int (or (:message-id msg) 0))
            publish-msg (util/build-publish-message msg qos message-id)]
        (.writeAndFlush ctx publish-msg)))))

(defn subscribe-event-handler
  [{:keys [^ChannelHandlerContext ctx ^MqttSubscribeMessage msg] :as request}]
  (let [session-store (-> request :mqtt-store :session-store)
        sub-store (-> request :mqtt-store :subscription-store)
        retain-store (-> request :mqtt-store :retain-store)
        ch (.channel ctx)
        client-id (util/client-id ch)
        topic-subs (-> msg .payload .topicSubscriptions)]
    (if-let [_session (core/get-session session-store client-id)]
      (let [qos-results (transient [])]
        (doseq [^MqttTopicSubscription t topic-subs]
          (let [topic (.topicFilter t)
                requested-qos (.qualityOfService t)
                system-topic-match? (system/topic-filter-matches-system-topic? topic)
                granted-qos (if system-topic-match?
                              MqttQoS/AT_MOST_ONCE
                              requested-qos)
                subscription (s/make-subscription client-id topic granted-qos)
                added (core/add-subscription sub-store subscription)
                granted (if added (.value granted-qos) (.value MqttQoS/FAILURE))]
            (let [_ (conj! qos-results (int granted))])
            (when added
              (if system-topic-match?
                (do
                  (system/publish-metrics! (:mqtt-store request))
                  (send-retained-if-any! retain-store ctx subscription))
                (send-retained-if-any! retain-store ctx subscription))))
        (let [granted-list (persistent! qos-results)
              acknowledge (util/sub-ack-message (-> msg (.variableHeader) (.messageId)) granted-list)]
          (-> ctx (.writeAndFlush  acknowledge)))))
      (.close ch))))
