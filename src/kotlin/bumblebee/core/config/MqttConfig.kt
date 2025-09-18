package bumblebee.core.config

import bumblebee.core.Constants
import cn.hutool.core.util.IdUtil


data class MqttConfig(
    var tcpPort: Int = 1883,
    var tcpSslPort: Int = -1,
    var nodeName: String? = IdUtil.fastSimpleUUID(),
    var webSocketPath: String = Constants.DEFAULT_WEBSOCKET_PATH,
    var webSocketPort: Int = 8883,
    var webSocketSslPort: Int = -1,
    var hostname: String = "localhost",
    var storeClass: String = Constants.DEFAULT_MQTT_STORE_CLASSNAME,
    var onEventWorkers: List<String>? = null,
)
