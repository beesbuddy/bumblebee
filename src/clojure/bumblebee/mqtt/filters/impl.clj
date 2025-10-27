(ns bumblebee.mqtt.filters.impl
  (:require [bumblebee.mqtt.util :as util]
            [bumblebee.mqtt.filters :as filters])
  (:import (io.netty.channel ChannelHandlerContext)
           (io.netty.handler.codec.mqtt MqttConnectMessage MqttConnectReturnCode MqttSubscribeMessage MqttTopicSubscription)))

(def audit-key ::audit-filter)

(defn make-audit-filter []
  (fn [{:keys [type ctx msg] :as ev}]
    (let [ch (.channel ^ChannelHandlerContext ctx)
          cid (util/client-id ch)
          user (util/user-name ch)
          rip (util/remote-ip ch)]
      (case type
        :connect
        (let [^MqttConnectMessage cm msg
              uname (or (some-> cm .payload .userName) user)
              cid' (or (some-> cm .payload .clientIdentifier) cid)]
          (println (str "[AUDIT][CONNECT] clientId=" cid' ", userName=" uname ", remoteIp=" rip)))

        :subscribe
        (let [^MqttSubscribeMessage sm msg
              subs (map (fn [^MqttTopicSubscription ts]
                          {:topic (.topicFilter ts)
                           :qos   (.name (.qualityOfService ts))})
                        (-> sm .payload .topicSubscriptions))]
          (println (str "[AUDIT][SUBSCRIBE] clientId=" cid ", userName=" user ", remoteIp=" rip ", subs=" subs)))

        :disconnect
        (println (str "[AUDIT][DISCONNECT] clientId=" cid ", userName=" user ", remoteIp=" rip))
        :publish
        (println (str "[AUDIT][PUBLISH] clientId=" cid ", userName=" user ", remoteIp=" rip))
        nil)
      {:action :next :event ev})))

(defn enable-audit!
  "Registers (or reconfigures) the audit filter for CONNECT/SUBSCRIBE/DISCONNECT.
  If an audit filter is already present, it is removed and re-added with the given priority."
  ([] (enable-audit! 1))
  ([priority]
   (filters/remove! audit-key)
   (filters/add! audit-key priority (make-audit-filter) {:types #{:connect :subscribe :disconnect :publish}})))

(defn disable-audit!
  "Unregister audit filter."
  []
  (filters/remove! audit-key))

(def deny-all-key ::deny-all-filter)

(defn make-deny-all-filter
  "Create a deny-all filter that, for :connect events, replies with a CONNACK
  using the provided return code (defaults to NOT_AUTHORIZED), then closes."
  ([] (make-deny-all-filter MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([^MqttConnectReturnCode return-code]
   (fn [{:keys [type] :as _evt}]
     (if (= :connect type)
       {:action :deny
        :reply  (util/conn-ack-message return-code false)}
       {:action :deny}))))

(defn enable-deny-all!
  "Register deny-all filter with optional priority and return code.
  Arity:
  - []               -> priority 0, NOT_AUTHORIZED
  - [priority]       -> NOT_AUTHORIZED
  - [priority code]  -> custom `MqttConnectReturnCode`"
  ([]
   (enable-deny-all! 0 MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([priority]
   (enable-deny-all! priority MqttConnectReturnCode/CONNECTION_REFUSED_NOT_AUTHORIZED))
  ([priority ^MqttConnectReturnCode return-code]
   (filters/remove! deny-all-key)
   (filters/add! deny-all-key priority (make-deny-all-filter return-code))))

(defn disable-deny-all! []
  (filters/remove! deny-all-key))
