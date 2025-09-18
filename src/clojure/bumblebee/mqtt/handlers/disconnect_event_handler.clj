(ns bumblebee.mqtt.handlers.disconnect-event-handler
  (:require [bumblebee.mqtt.util :as util]
            [bumblebee.mqtt.core :as core]
            [bumblebee.mqtt.store.in-memory-subscription-store :as subs])
  (:import
    [io.netty.channel ChannelHandlerContext]
    [io.netty.handler.codec.mqtt MqttMessage]
    [bumblebee.mqtt.core ClientSession]))

;; (defn wrap-mqtt-store [handler]
;;   (let [^InMemoryStore store (InMemoryStore. (bumblebee.core.config.Config.))
;;         mqtt-store {:store {:instance store}}]
;;     (fn [request]
;;       (handler (assoc request :mqtt-store (:store mqtt-store))))))

(defn disconnect-event-handler
  [{:keys [^ChannelHandlerContext ctx ^MqttMessage msg] :as request}]
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
          (do
            (core/close-channel client-session))
          (do
            (when (core/clean-session? client-session)
              (when subscriptions
                (subs/remove-all-subscriptions subscriptions client-id))
              (when dup-store
                (core/remove-all-dup-pub-messages dup-store client-id)))
            (core/close-channel client-session)
            (core/remove-session session-store client-id)))))))
