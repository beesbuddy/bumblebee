 (ns dev.filters-demo
  (:require [bumblebee.mqtt.filters :as fx])
  (:import [io.netty.channel ChannelHandlerContext]
           [java.net InetSocketAddress]))

;; Predicate used with :when to run filter only for loopback clients
(defn loopback?
  [ev]
  (let [^ChannelHandlerContext ctx (:ctx ev)
        ch (when ctx (.channel ctx))
        addr (when ch (.remoteAddress ch))
        host (when (instance? InetSocketAddress addr)
               (.getHostString ^InetSocketAddress addr))]
    (boolean (#{"127.0.0.1" "::1"} host))))

#_(def not-loopback? (complement loopback?))

;; Filter body: deny publish/subscribe (a demo behavior)
(defn make-deny-pub-sub-filter
  []
  (fn [{:keys [type] :as ev}]
    (if (#{:publish :subscribe} type)
      {:action :deny}
      {:action :next :event ev})))

(defn make-allow-local-filter []
  (fn [evt] {:action :next :event evt}))

;; Enable/disable helpers demonstrating :types + :when usage
(defn enable!
  ([] (enable! 10))
  ([priority]
   (fx/add! ::allow-all-loopback priority (make-allow-local-filter)
            {:types #{:connect :publish :subscribe}
             :when loopback?})))

(defn disable!
  []
  (fx/remove! ::demo))

(comment
  (enable! 10)
  (disable!)
  )

