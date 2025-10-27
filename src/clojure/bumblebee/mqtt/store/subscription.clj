; TODO: Move to store namespace
(ns bumblebee.mqtt.store.subscription
  (:import [io.netty.handler.codec.mqtt MqttQoS]))

(defrecord Subscription
  [client-id topic qos create-time-str])

(defn make-subscription
  "Create an idiomatic Clojure subscription value.
  Defaults QoS to AT_LEAST_ONCE and create-time-str to empty."
  ([client-id topic]
   (->Subscription client-id topic MqttQoS/AT_LEAST_ONCE ""))
  ([client-id topic qos]
   (->Subscription client-id topic qos ""))
  ([client-id topic qos create-time-str]
   (->Subscription client-id topic qos create-time-str)))
