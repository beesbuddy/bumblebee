(ns bumblebee.mqtt.channel-initializer-test
  (:require
    [clojure.test :refer [deftest is testing]]
    [bumblebee.mqtt.channel-initializer :as ci]
    [bumblebee.mqtt.config :as cfg])
  (:import
    [io.netty.channel.embedded EmbeddedChannel]
    [io.netty.handler.codec.http HttpServerCodec]
    [io.netty.handler.codec.http.websocketx WebSocketServerProtocolConfig WebSocketServerProtocolHandler]
    [io.netty.handler.codec.mqtt MqttDecoder MqttEncoder]))

(deftest configure-tcp-pipeline
  (let [ch (EmbeddedChannel.)
        pipeline (.pipeline ch)
        config (cfg/get-config)]
    (ci/configure-pipeline! pipeline {:protocol-type :tcp :config config})
    (is (instance? MqttDecoder (.get pipeline "mqttDecoder")))
    (is (instance? MqttEncoder (.get pipeline "mqttEncoder")))
    (is (nil? (.get pipeline "httpServerCodec")))))

(deftest configure-web-socket-pipeline
  (let [ch (EmbeddedChannel.)
        pipeline (.pipeline ch)
        config (cfg/get-config)]
    (ci/configure-pipeline! pipeline {:protocol-type :web-socket :config config})

    (testing "adds HTTP handlers for websocket handshake"
      (is (instance? HttpServerCodec (.get pipeline "httpServerCodec"))))

    (testing "installs MQTT codecs"
      (is (instance? MqttDecoder (.get pipeline "mqttDecoder")))
      (is (instance? MqttEncoder (.get pipeline "mqttEncoder"))))

    (testing "installs websocket bridge when available"
      (let [handler (.get pipeline "websocketProtocolCodec")
            codec-class (try
                          (Class/forName "io.netty.handler.codec.mqtt.MqttWebSocketCodec")
                          (catch Throwable _ nil))]
        (when codec-class
          (is (instance? codec-class handler)))))

    (testing "websocket handler allows prefix path matching"
      (let [handler (.get pipeline "websocketProtocol")]
        (when (instance? WebSocketServerProtocolHandler handler)
          (let [cfg (.config ^WebSocketServerProtocolHandler handler)]
            (is (= "/mqtt" (.websocketPath ^WebSocketServerProtocolConfig cfg)))
            (is (.checkStartsWith ^WebSocketServerProtocolConfig cfg))))))))

(deftest configure-web-socket-path-normalization
  (let [ch (EmbeddedChannel.)
        pipeline (.pipeline ch)
        config (assoc-in (cfg/get-config) [:mqtt-config :web-socket-path] "mqtt3")]
    (ci/configure-pipeline! pipeline {:protocol-type :web-socket :config config})
    (let [handler (.get pipeline "websocketProtocol")]
      (when (instance? WebSocketServerProtocolHandler handler)
        (let [cfg (.config ^WebSocketServerProtocolHandler handler)]
          (is (= "/mqtt3" (.websocketPath ^WebSocketServerProtocolConfig cfg)))
          (is (.checkStartsWith ^WebSocketServerProtocolConfig cfg)))))))
