(ns bumblebee.mqtt.core
  (:import
   [java.time LocalDateTime]
   [java.time.format DateTimeFormatter]))

(def ^:private time-formatter (DateTimeFormatter/ofPattern "yyyyMMddHHmmss"))
(defn- now-str []
  (.format (LocalDateTime/now) time-formatter))

(defprotocol ICloseableStore
  (close [this]))

(defprotocol IMessagesIdStore
  (get-next-message-id [this] "Get next message id (1..65535 with wrap)."))

(defprotocol IDupPubMessagesStore
  (add-dup-pub-message [this message] "Add dup pub message")
  (get-dup-pub-messages [this client-id] "Get dup pub messages")
  (get-dup-pub-message [this client-id message-id] "Get dup pub message")
  (remove-dup-pub-message [this client-id message-id] "Remove dup pub message")
  (remove-all-dup-pub-messages [this client-id]  "Remove dup pub messages"))

(defprotocol ISessionStore
  (add-session [this client-session] "Add a session")
  (get-session [this client-id] "Get a session by client ID")
  (get-clients-ids [this] "Get all clients ids")
  (remove-session [this client-id] "Remove a session by client ID")
  (session-count [this] "Return the session count"))

(defrecord CommonPublishMessage [target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name])

(defn mqtt-msg->comm-pub-msg [message is-will source-node-name]
  (->CommonPublishMessage
   nil
   (-> message (.variableHeader) (.topicName))
   (-> message (.variableHeader) (.packetId))
   nil
   (-> message (.fixedHeader) (.qosLevel) (.value))
   (-> message (.fixedHeader) (.isRetain))
   is-will
   (now-str)
   source-node-name))

(defn make-common-publish-message
  [& {:keys [target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name]
      :or {create-time (now-str)}}]
  (->CommonPublishMessage target-client-id topic message-id message-body mqtt-qos is-retain is-will create-time source-node-name))

(defprotocol IClientSession
  (is-same-channel [this next-channel] "Check if current channel is the same")
  (close-channel [this] "Close channel tied to session")
  (send-msg [this msg] "Send client message tied to session")
  (will-msg->comm-pub-msg [this] "Create a publish message for will message"))

(deftype ClientSession [channel client-id user-name clean-session will-message keep-alive-time-seconds create-time-str]
  IClientSession
  (is-same-channel [_ next-channel]
    (identical? channel next-channel))

  (close-channel [_]
    (.close channel))

  (send-msg [_ msg]
    (.writeAndFlush channel msg))

  (will-msg->comm-pub-msg [_]
    (if (nil? will-message)
      nil
      (let [msg (mqtt-msg->comm-pub-msg will-message true "")]
        ;; Preserve record type by setting existing key :create-time
        (assoc msg :create-time create-time-str)))))

(comment
  ;; Quick sanity checks for ClientSession behavior.
  ;; Evaluate in REPL or adapt into a clojure.test file.
  (require '[clojure.test :refer [is testing]])
  (def ch1 (Object.))
  (def ch2 (Object.))
  (def sess (->ClientSession ch1 "client-1" "user" true nil 60 "20240101000000"))

  (testing "is-same-channel"
    (is (true? (is-same-channel sess ch1)))
    (is (false? (is-same-channel sess ch2))))

  (testing "will-msg->comm-pub-msg when will-message is nil"
    (is (nil? (will-msg->comm-pub-msg sess))))

  (testing "will-msg->comm-pub-msg when will-message is present"
    ;; Mock MQTT message conversion to avoid Netty MQTT types.
    (with-redefs [mqtt-msg->comm-pub-msg (fn [_ is-will _]
                                           (make-common-publish-message
                                            :message-id 42
                                            :is-will is-will
                                            :create-time "dummy"))]
      (let [sess2 (->ClientSession ch1 "client-1" "user" true :dummy-will 60 "T")
            msg (will-msg->comm-pub-msg sess2)]
        (is (instance? CommonPublishMessage msg))
        (is (= true (:is-will msg)))
        ;; The implementation should override create-time with session's create-time
        (is (= "T" (:create-time msg))))))
  )
