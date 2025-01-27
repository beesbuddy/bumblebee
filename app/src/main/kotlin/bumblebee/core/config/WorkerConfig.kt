package bumblebee.core.config

data class WorkerConfig(
    var influxDbConfig: InfluxDbConfig? = InfluxDbConfig(),
    var loggingConfig: LoggingConfig? = LoggingConfig()
)
