; TODO: Move to store namespace
(ns bumblebee.mqtt.core
  (:require
    [bumblebee.mqtt.util :as util])
  (:import
    (io.netty.channel Channel)))

(defprotocol ICloseableStore
  (close [this]))

(defprotocol IMessagesIdStore
  (get-next-message-id [this client-id]
    "Return the next MQTT packet identifier for `client-id`. Implementations
    should accept nil for `client-id` when a caller does not track IDs per
    client, and must keep the value within 1..65535."))

(defprotocol IDupPubMessagesStore
  (add-dup-pub-message [this message] "Add dup pub message")
  (get-dup-pub-messages [this client-id] "Get dup pub messages")
  (get-dup-pub-message [this client-id message-id] "Get dup pub message")
  (remove-dup-pub-message [this client-id message-id] "Remove dup pub message")
  (remove-all-dup-pub-messages [this client-id] "Remove dup pub messages"))

(defprotocol IRetainMessageStore
  (add-retain [this message] "Persist retained publish message")
  (remove-retain [this topic] "Remove retained message for topic")
  (match-retains [this topic] "Return retained messages matching provided topic"))

(defprotocol ISessionStore
  (add-session [this client-session] "Add a session")
  (get-session [this client-id] "Get a session by client ID")
  (get-clients-ids [this] "Get all clients ids")
  (remove-session [this client-id] "Remove a session by client ID")
  (session-count [this] "Return the session count"))

(defprotocol ISubscriptionStore
  (add-subscription [this subscription]
    "Register a subscription for the given client. Should return truthy when
    the store recorded the subscription (e.g. new or updated).")
  (remove-subscription [this subscription]
    "Remove a specific subscription instance. Should return truthy when the
    subscription was removed or the operation succeeded.")
  (remove-all-subscriptions [this client-id]
    "Remove all subscriptions held by the provided client-id.")
  (match-subscriptions [this topic]
    "Return a collection of subscriptions matching the provided topic string."))

(defprotocol IClientSession
  (is-same-channel [this next-channel] "Check if current channel is the same")
  (close-channel [this] "Close channel tied to session")
  (send-msg [this msg] "Send client message tied to session")
  (will-msg->comm-pub-msg [this] "Create a publishing message for will message")
  (clean-session? [this] "Return true if session was created as clean-session"))

(defrecord ClientSession [^Channel channel
                          client-id
                          user-name
                          clean-session
                          will-message
                          keep-alive-time-seconds
                          create-time-str]
  IClientSession
  (is-same-channel [_ next-channel]
    (identical? channel next-channel))

  (close-channel [_]
    (when channel
      (.close ^Channel channel)))

  (send-msg [_ msg]
    (when channel
      (.writeAndFlush ^Channel channel msg)))

  (will-msg->comm-pub-msg [_]
    (if (nil? will-message)
      nil
      (let [msg (util/mqtt-msg->comm-pub-msg will-message true "")]
        ;; Preserve record type by setting existing key :create-time
        (assoc msg :create-time create-time-str))))
  (clean-session? [_] (boolean clean-session)))

(comment
  (require '[clojure.test :refer [is testing]])
  (def ch1 (Object.))
  (def ch2 (Object.))
  (def session (->ClientSession ch1 "client-1" "user" true nil 60 "20240101000000"))

  (testing "is-same-channel"
           (is (true? (is-same-channel session ch1)))
           (is (false? (is-same-channel session ch2))))

  (testing "will-msg->comm-pub-msg when will-message is nil"
           (is (nil? (will-msg->comm-pub-msg session))))

  (testing "will-msg->comm-pub-msg when will-message is present"
           ;; Mock MQTT message conversion to avoid Netty MQTT types.
           (with-redefs [util/mqtt-msg->comm-pub-msg (fn [_ is-will _]
                                                       (util/make-common-publish-message
                                                         :message-id 42
                                                         :is-will is-will
                                                         :create-time "dummy"))]
             (let [session (->ClientSession ch1 "client-1" "user" true :dummy-will 60 "T")
                   msg (will-msg->comm-pub-msg session)]
               (is (instance? bumblebee.mqtt.util.CommonPublishMessage msg))
               (is (= true (:is-will msg)))
               ;; The implementation should override create-time with session's create-time
               (is (= "T" (:create-time msg)))))))

