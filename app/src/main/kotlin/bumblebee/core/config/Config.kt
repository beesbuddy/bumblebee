package bumblebee.core.config


data class Config(
    var version: String? = "0.0.0",
    var sslContextConfig: SslContextConfig? = null,
    var mqttConfig: MqttConfig = MqttConfig(),
    var nettyConfig: NettyConfig = NettyConfig(),
    var securityConfig: SecurityConfig = SecurityConfig(),
    var workerConfig: WorkerConfig = WorkerConfig(),
    var webConfig: WebConfig = WebConfig()
)
