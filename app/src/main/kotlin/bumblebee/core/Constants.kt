package bumblebee.core


object Constants {
    const val SUPER_USERNAME = "bumblebee"

    const val API_V1_PATH = "/api/v1"
    const val SSE_PATH = "/sse"

    const val TOKEN_NAME = "Bearer "

    const val MQTT_SUB_PROTOCOL_CSV_LIST = "mqtt, mqttv3.1, mqttv3.1.1, mqttv5.0"

    const val AUTH_ANONYMOUS = "bumblebee.security.anonymous.AuthManager"
    const val AUTH_MANAGER_FILE_BASED_CLASSNAME = "bumblebee.security.file.AuthManager"

    const val DEFAULT_MQTT_STORE_CLASSNAME = "bumblebee.store.mqtt.memory.InMemoryStore"
    const val DEFAULT_WEBSOCKET_PATH = "/mqtt"
    const val DEFAULT_PAYLOAD_LOGGING_PATH = "./"

    const val TMP_NAME = "tmp"

    const val APP_NAME = "bumblebee"
    const val APP_CONFIG_PROPS_PRE = "bumblebee"

    const val INT_ZERO = 0
    const val INT_ONE = 1

    const val SCOPE_ROOT = "bumblebee-root-topic"
    const val SCOPE_MULTI = "#"
    const val SCOPE_SINGLE = "+"

    const val SLASH = "/"

    const val SCOPE_OR = "|"

    const val SYS_TOPIC_NAME = "\$SYS"
    const val SYS_TOPIC_INIT_DELAY = 10
    const val SYS_TOPIC_INTERVAL = 5

    const val MASTER_NODE_NAME = "master"

    const val HANDLER_HTTP_SERVER_CODEC = "httpServerCodec"
    const val HANDLER_HTTPS = "https"
    const val HANDLER_HTTP_OBJECT_AGGREGATOR = "httpObjectAggregator"
    const val HANDLER_IDLE_STATE = "idleStateHandler"
    const val HANDLER_MQTT_ENCODER = "mqttEncoderHandler"
    const val HANDLER_MQTT_DECODER = "mqttDecoderHandler"
    const val HANDLER_MQTT_MAIN = "mqttMainHandler"
    const val HANDLER_COMPRESSOR = "compressor"
    const val HANDLER_WEBSOCKET_PROTOCOL = "mqttWebSocketProtocol"
    const val HANDLER_WEBSOCKET_PROTOCOL_CODEC = "mqttWebSocketCodec"
    const val HANDLER_CHUNKED_WRITER = "chunkedWriterHandler"
    const val HANDLER_SSL = "ssl"

    const val CLIENT_ID = "clientId"
    const val USER_NAME = "userName"

    const val CONTENT_TYPE = "Content-Type"
    const val CONTENT_LENGTH = "Content-Length"
    const val CONNECTION = "Connection"
    const val KEEP_ALIVE = "keep-alive"

    const val MAX_REQUEST_ENTITY_BYTES = 50 * 1024 * 1024

    const val ROLE_FORBIDDEN = "forbidden"

    const val READ_ONLY_ROLE = "readOnly"

    enum class ServerProtocolType(val value: String) {
        TCP("tcp"), WEB_SOCKET("webSocket")
    }
}
