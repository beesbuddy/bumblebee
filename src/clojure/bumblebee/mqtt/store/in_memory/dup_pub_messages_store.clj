(ns bumblebee.mqtt.store.in-memory.dup-pub-messages-store
  (:require [bumblebee.mqtt.core :as core]
            [bumblebee.mqtt.util :as util]))

(defn init []
  (let [message-cache (atom {})]
    (reify
      core/IDupPubMessagesStore
      (add-dup-pub-message [_ {:keys [target-client-id message-id] :as message}]
        (swap! message-cache assoc-in [target-client-id message-id] message))

      (get-dup-pub-messages [_ client-id]
        (-> @message-cache (get client-id) vals vec))

      (get-dup-pub-message [_ client-id message-id]
        (get-in @message-cache [client-id message-id]))

      (remove-dup-pub-message [_ client-id message-id]
        (swap! message-cache
               (fn [cache]
                 (if-let [m (get cache client-id)]
                   (let [nm (dissoc m message-id)]
                     (if (empty? nm)
                       (dissoc cache client-id)
                       (assoc cache client-id nm)))
                   cache))))

      (remove-all-dup-pub-messages [_ client-id]
        (swap! message-cache dissoc client-id))

      core/ICloseableStore
      (close [_] nil))))


(comment
  (def in-memory-dup-pub-message-store (init))
  (def common-pub-message-1 (util/make-common-publish-message :target-client-id "test" :message-id 1))
  (def common-pub-message-2 (util/make-common-publish-message :target-client-id "test" :message-id 2))

  (core/add-dup-pub-message in-memory-dup-pub-message-store common-pub-message-1)
  (core/add-dup-pub-message in-memory-dup-pub-message-store common-pub-message-2)
  (core/remove-dup-pub-message in-memory-dup-pub-message-store "test" 1)
  (core/get-dup-pub-message in-memory-dup-pub-message-store "test" 1)
  (core/get-dup-pub-message in-memory-dup-pub-message-store "test" 2)
  (core/get-dup-pub-messages in-memory-dup-pub-message-store "test")
  (core/remove-all-dup-pub-messages in-memory-dup-pub-message-store "test"))
