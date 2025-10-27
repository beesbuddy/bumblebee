(ns bumblebee.mqtt.system
  "Collect runtime metrics exposed through a special MQTT system topic."
  (:require
   [clojure.string :as str]
   [bumblebee.mqtt.core :as core]
   [bumblebee.mqtt.util :as util])
  (:import
    [com.sun.management OperatingSystemMXBean]
    [io.netty.handler.codec.mqtt MqttQoS]
    [java.lang.management ManagementFactory]
    [java.util.concurrent Executors ScheduledExecutorService TimeUnit ThreadFactory]))

(def system-topic "$SYS/server/info")

(defn system-topic? [topic]
  (= topic system-topic))

(defn topic-filter-matches-system-topic?
  "Return true when the provided subscription topic filter would receive
  messages published to the system topic. Supports MQTT wildcards `+` and `#`."
  [topic-filter]
  (let [f-segs (if (str/blank? topic-filter)
                 []
                 (str/split topic-filter #"/"))
        t-segs (str/split system-topic #"/")]
    (loop [f f-segs t t-segs]
      (cond
        (empty? f) (empty? t)
        (= (first f) "#") true
        (empty? t) false
        (= (first f) "+") (recur (rest f) (rest t))
        (= (first f) (first t)) (recur (rest f) (rest t))
        :else false))))

(defn- safe-percent [value]
  (let [d (double value)]
    (when (and (>= d 0.0)
               (not (Double/isNaN d))
               (not (Double/isInfinite d)))
      (* 100.0 d))))

(defn- safe-double [value]
  (let [d (double value)]
    (when (and (>= d 0.0)
               (not (Double/isNaN d))
               (not (Double/isInfinite d)))
      d)))

(defn- uptime-breakdown [uptime-ms]
  (let [total-seconds (long (/ uptime-ms 1000))
        days (quot total-seconds 86400)
        hours (mod (quot total-seconds 3600) 24)
        minutes (mod (quot total-seconds 60) 60)
        seconds (mod total-seconds 60)]
    {:days days
     :hours hours
     :minutes minutes
     :seconds seconds}))

(defn collect-stats []
  (let [runtime (Runtime/getRuntime)
        os-bean (ManagementFactory/getOperatingSystemMXBean)
        runtime-bean (ManagementFactory/getRuntimeMXBean)
        uptime (.getUptime runtime-bean)
        total (.totalMemory runtime)
        free (.freeMemory runtime)
        max (.maxMemory runtime)
        used (- total free)
        cpu-bean (when (instance? OperatingSystemMXBean os-bean)
                   ^OperatingSystemMXBean os-bean)
        cpu (let [system-load (safe-double (.getSystemLoadAverage os-bean))
                  base (cond-> {:available-processors (.getAvailableProcessors os-bean)}
                               system-load (assoc :system-load-average system-load))]
              (if cpu-bean
                (let [system-percent (safe-percent (.getSystemCpuLoad cpu-bean))
                      process-percent (safe-percent (.getProcessCpuLoad cpu-bean))]
                  (cond-> base
                    system-percent (assoc :system-percent system-percent)
                    process-percent (assoc :process-percent process-percent)))
                base))
        max-valid (when (and (> max 0) (not= max Long/MAX_VALUE)) max)
        usage-percent (when (and max-valid (pos? max-valid))
                        (* 100.0 (/ (double used) (double max-valid))))
        memory (cond-> {:used-bytes used
                        :free-bytes free
                        :total-bytes total}
                 max-valid (assoc :max-bytes max-valid)
                 usage-percent (assoc :usage-percent usage-percent))]
    {:timestamp (System/currentTimeMillis)
     :uptime-ms uptime
     :uptime (uptime-breakdown uptime)
     :memory memory
     :cpu cpu}))

(defn system-message
  "Return a map {:stats ... :message <CommonPublishMessage>} representing the
  current system metrics encoded as an MQTT message."
  ([]
   (system-message nil))
  ([node-name]
   (let [stats (collect-stats)
         payload (pr-str (cond-> stats
                           node-name (assoc :node-name node-name)))
         message (util/make-common-publish-message
                   :topic system-topic
                   :message-body payload
                   :mqtt-qos 0
                   :is-retain true
                   :source-node-name (or node-name ""))]
     {:stats stats
      :message message})))

(defn- normalize-subscription-qos
  "Return a `MqttQoS` value for the provided subscription map. Accepts
  enums, ints, and nil values, defaulting to AT_MOST_ONCE."
  [sub]
  (let [q (:qos sub)]
    (cond
      (instance? MqttQoS q) q
      (some? q) (MqttQoS/valueOf (int q))
      :else MqttQoS/AT_MOST_ONCE)))

(defn publish-metrics!
  "Generate and broadcast the retained system metrics message to all
  subscribers. Returns the stats payload when publishing succeeds."
  [{:keys [subscription-store session-store retain-store node-name message-id-store dup-pub-store]}]
  (let [{:keys [stats message]} (system-message node-name)
        retain? (and retain-store message)]
    (when retain?
      (core/add-retain retain-store message))
    (when-let [matches (when subscription-store
                         (core/match-subscriptions subscription-store system-topic))]
      (doseq [sub matches]
        (let [client-id (:client-id sub)]
          (when-let [session (core/get-session session-store client-id)]
            (let [^MqttQoS qos (normalize-subscription-qos sub)
                  qos-level (.value qos)
                  message-id (if (and (> qos-level 0) message-id-store)
                               (core/get-next-message-id message-id-store client-id)
                               0)
                  msg-for-target (util/copy-common-publish-message
                                   message
                                   :target-client-id client-id
                                   :mqtt-qos qos-level
                                   :message-id (when (pos? message-id) message-id))
                  publish-msg (util/build-publish-message msg-for-target qos message-id)]
              (when (and dup-pub-store (> qos-level 0) (pos? message-id))
                (core/add-dup-pub-message dup-pub-store msg-for-target))
              (try
                (core/send-msg session publish-msg)
                (catch Throwable ex
                  (println (str "[system] failed to deliver metrics to " client-id ": " (.getMessage ex))))))))))
    stats))

(defn- thread-factory [name]
  (reify ThreadFactory
    (newThread [_ runnable]
      (doto (Thread. runnable)
        (.setName name)
        (.setDaemon true)))))

(defn start-reporter!
  "Start a scheduled reporter that publishes system metrics every
  `interval-ms`. Returns a map {:executor ... :future ... :interval-ms ...}.
  Caller must later invoke `stop-reporter!`."
  [stores interval-ms]
  (let [interval (long (max 1000 (or interval-ms 5000)))
        executor ^ScheduledExecutorService (Executors/newSingleThreadScheduledExecutor (thread-factory "bumblebee-system-metrics"))
        _ (try
            (publish-metrics! stores)
            (catch Throwable ex
              (println (str "[system] failed to publish metrics" (.getMessage ex)))))
        task (.scheduleAtFixedRate executor
                                   (fn []
                                     (try
                                       (publish-metrics! stores)
                                       (catch Throwable ex
                                         (println (str "[system] failed to publish metrics" (.getMessage ex))))))
                                   interval
                                   interval
                                   TimeUnit/MILLISECONDS)]
    {:executor executor
     :future task
     :interval-ms interval}))

(defn stop-reporter!
  "Stop a reporter returned by `start-reporter!`."
  [{:keys [^ScheduledExecutorService executor ^java.util.concurrent.ScheduledFuture future]}]
  (when future
    (.cancel future true))
  (when executor
    (.shutdown executor)
    (try
      (.awaitTermination executor 2000 TimeUnit/MILLISECONDS)
      (catch InterruptedException _
        (.shutdownNow executor)
        (.interrupt (Thread/currentThread)))))
  :stopped)
