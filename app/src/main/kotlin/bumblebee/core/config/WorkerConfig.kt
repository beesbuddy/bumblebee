package bumblebee.core.config

data class WorkerConfig(
    var tinyFluxConfig: TinyFluxConfig? = TinyFluxConfig(),
    var loggingConfig: LoggingConfig? = LoggingConfig()
)
