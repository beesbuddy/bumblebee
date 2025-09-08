(ns bumblebee.mqtt.handlers.connect-event-handler
  (:require
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.store :refer [get-instance]]
   [bumblebee.mqtt.config :refer [get-config]]
   [bumblebee.mqtt.util :as util]) 
  (:import
   [io.netty.handler.codec.mqtt
    MqttConnectMessage
    MqttConnectReturnCode
    MqttVersion]
   [io.netty.handler.codec.mqtt MqttMessageBuilders]))


(defn send-message-to-channel [ec client_id username password]
  (let [msg (-> (MqttMessageBuilders/connect)
                (.protocolVersion MqttVersion/MQTT_3_1_1)
                (.clientId client_id)
                (.username username)
                (.password (.getBytes password))
                (.cleanSession true)
                (.build))]
    (.writeInbound ec (into-array Object [msg]))))

;; Middleware related logic
(defn wrap-mqtt-store [handler]
  (let [mqtt-store {:store {:instance (get-instance (get-config))}}]
    (fn [request] 
      (handler (assoc request :mqtt-store (:store mqtt-store))))))

;; Handler related logic
(defn connect-event-handler [request]
  (let [ctx (:ctx request)
        msg (:msg request)
        store (-> request :mqtt-store :instance)]
    (when (and (instance? MqttConnectMessage msg) ctx)
      (println "On connect event with: " (core/get-next-message-id store))
      (let [connack-message (util/conn-ack-message MqttConnectReturnCode/CONNECTION_ACCEPTED false)]
        (println "Generated ConnAck message:" connack-message)
        (-> ctx (.writeAndFlush connack-message))))))

(comment

  (def cfg (get-config))
  (print (-> cfg :mqtt-config :storage-provider))

  (def mqtt-store (get-instance cfg))
  (print mqtt-store)

  (print (core/get-next-message-id mqtt-store))

  (let [ec (util/create-embedded-channel (wrap-mqtt-store connect-event-handler))]
    (send-message-to-channel ec "clientId" "username" "password")
    (let [response (.readOutbound ec)]
      (println "Outbound response type: " (.. response fixedHeader messageType toString)))))
