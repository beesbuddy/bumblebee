(ns bumblebee.mqtt.handlers.disconnect-event-handler
  (:require [bumblebee.mqtt.util :as util]
            [bumblebee.mqtt.core :as core])
  (:import
    [io.netty.channel ChannelHandlerContext]
    [io.netty.handler.codec.mqtt MqttMessage]
    [bumblebee.mqtt.core ClientSession]))

(defn disconnect-event-handler
  [{:keys [^ChannelHandlerContext ctx ^MqttMessage _msg] :as request}]
  (let [session-store (-> request :mqtt-store :session-store)
        subscriptions (-> request :mqtt-store :subscription-store)
        dup-store (-> request :mqtt-store :dup-pub-store)
        ch (.channel ctx)]
    (.flush ch)
    (let [client-id (util/client-id ch)
          ^ClientSession client-session (core/get-session session-store client-id)]
      (if (nil? client-session)
        (.close ch)
        (if (not (core/is-same-channel client-session ch))
          (core/close-channel client-session)
          (do
            (when (core/clean-session? client-session)
              (when subscriptions
                (core/remove-all-subscriptions subscriptions client-id))
              (when dup-store
                (core/remove-all-dup-pub-messages dup-store client-id)))
            (core/close-channel client-session)
            (core/remove-session session-store client-id)))))))
