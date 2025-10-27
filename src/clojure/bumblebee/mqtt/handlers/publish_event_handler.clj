(ns bumblebee.mqtt.handlers.publish-event-handler
  (:require
   [clojure.string :as str]
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.util :as util]
   [bumblebee.mqtt.system :as system])
  (:import
    [io.netty.channel ChannelFuture ChannelHandlerContext]
    [io.netty.handler.codec.mqtt
     MqttPublishMessage
     MqttQoS]
    (io.netty.util.concurrent Future GenericFutureListener)))

(defn- mqtt-qos->int
  [pub-msg sub]
  (let [msg-qos (:mqtt-qos pub-msg)
        sub-qos (.value ^MqttQoS (:qos sub))]
    (^[int] MqttQoS/valueOf (util/min-qos msg-qos sub-qos))))

(defn- store-dup-message!
  [dup-store pub-msg target-client-id message-id]
  (when dup-store
    (core/add-dup-pub-message dup-store
                              (util/copy-common-publish-message
                               pub-msg
                               :target-client-id target-client-id
                               :message-id message-id))))

(defn- publish-to-subscriber!
  [session-store dup-store message-id-store pub-msg sub]
  (let [target-client-id (:client-id sub)
        session (core/get-session session-store target-client-id)]
    (when session
      (let [msg-for-target (util/copy-common-publish-message pub-msg :target-client-id target-client-id)
            qos (mqtt-qos->int msg-for-target sub)
            qos-level (.value qos)
            has-message-id? (and (pos? qos-level) message-id-store)
            message-id (if has-message-id?
                         (core/get-next-message-id message-id-store target-client-id)
                         0)
            publish-msg (util/build-publish-message msg-for-target qos message-id)]
        (when has-message-id?
          (store-dup-message! dup-store msg-for-target target-client-id message-id))
        (let [write-future (core/send-msg session publish-msg)]
          (when (and dup-store has-message-id? (instance? ChannelFuture write-future))
            (.addListener ^ChannelFuture write-future
                          (reify GenericFutureListener
                            (operationComplete [_ future]
                              (when (.isSuccess ^Future future)
                                (core/remove-dup-pub-message dup-store target-client-id message-id)))))))
          true))))

(defn- publish-to-subscribers!
  [subscription-store session-store dup-store message-id-store pub-msg]
  (let [matches (when subscription-store
                  (core/match-subscriptions subscription-store (:topic pub-msg)))]
    (doseq [sub matches :when sub]
      (publish-to-subscriber! session-store dup-store message-id-store pub-msg sub))))

(defn- handle-retain!
  [retain-store pub-msg]
  (when (and retain-store (:is-retain pub-msg))
    (let [body (:message-body pub-msg)]
      (cond
        (:is-will pub-msg)
        (core/add-retain retain-store (util/copy-common-publish-message pub-msg))

        (or (nil? body) (str/blank? body))
        (core/remove-retain retain-store (:topic pub-msg))

        :else
        (core/add-retain retain-store (util/copy-common-publish-message pub-msg))))))

(defn publish-event-handler
  "Handle inbound MQTT PUBLISH message."
  [{:keys [^ChannelHandlerContext ctx ^MqttPublishMessage msg mqtt-store]}]
  (let [session-store (:session-store mqtt-store)
        subscription-store (:subscription-store mqtt-store)
        dup-store (:dup-pub-store mqtt-store)
        message-id-store (:message-id-store mqtt-store)
        retain-store (:retain-store mqtt-store)
        node-name (:node-name mqtt-store)
        pub-msg (util/mqtt-msg->comm-pub-msg msg false node-name)
        packet-id (-> msg .variableHeader .packetId)
        inbound-qos (int (:mqtt-qos pub-msg))]
    (when-not (system/system-topic? (:topic pub-msg))
      (publish-to-subscribers! subscription-store session-store dup-store message-id-store pub-msg)
      (handle-retain! retain-store pub-msg))
    (case inbound-qos
      1 (.writeAndFlush ctx (util/pub-ack-message packet-id))
      2 (.writeAndFlush ctx (util/pub-rec-message packet-id))
      nil)))
