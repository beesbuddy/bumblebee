(ns bumblebee.mqtt.handlers.connect-event-handler
  (:require
   [bumblebee.mqtt.util :as util]
   [bumblebee.mqtt.core :as core])
  (:import
   [io.netty.channel ChannelHandlerContext]
   [io.netty.handler.codec.mqtt
    MqttConnectMessage
    MqttConnectReturnCode
    MqttMessageFactory
    MqttFixedHeader
    MqttConnAckVariableHeader
    MqttMessageType
    MqttQoS]))

(defn connect-event-handler [{:keys [^ChannelHandlerContext ctx ^MqttConnectMessage msg] :as request}]
  (let [session-store (-> request :mqtt-store :session-store)]
    (when (and (instance? MqttConnectMessage msg) ctx)
      (let [payload (.payload msg)
            client-id (.clientIdentifier payload)
            user-name (or (.userName payload) "")
            clean-session (-> msg .variableHeader .isCleanSession)
            keep-alive (-> msg .variableHeader .keepAliveTimeSeconds)]
        ;; Set channel attributes for later processors (Clojure util)
        (util/client-info (.channel ctx) client-id user-name)
        ;; Register basic session in the backing store
        (let [session (core/->ClientSession (.channel ctx) client-id user-name clean-session nil keep-alive "")]
          (core/add-session session-store session))
        ;; Reply with CONNACK (accepted)
        (let [fh (MqttFixedHeader. MqttMessageType/CONNACK false MqttQoS/AT_MOST_ONCE false 0)
              vh (MqttConnAckVariableHeader. MqttConnectReturnCode/CONNECTION_ACCEPTED (not clean-session))
              connack (MqttMessageFactory/newMessage fh vh nil)]
          (.writeAndFlush ctx connack))))))

(comment
  (require '[bumblebee.mqtt.config :refer [get-config]]
           '[bumblebee.mqtt.store :refer [get-instance]])

  (defn wrap-mqtt-store [handler store]
    (fn [request]
      (handler (assoc request :mqtt-store store))))

  (def cfg (get-config))
  (print (-> cfg :mqtt-config :storage-provider))

  (def mqtt-store (get-instance cfg))
  (print mqtt-store)

  (let [ec (util/create-embedded-channel (wrap-mqtt-store connect-event-handler mqtt-store))]
    (util/send-message-to-channel ec "clientId" "username" "password")
    (let [response (.readOutbound ec)]
      (println "Outbound response type: " (.. response fixedHeader messageType toString)))))
