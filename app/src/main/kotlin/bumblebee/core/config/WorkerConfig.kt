package bumblebee.core.config

data class WorkerConfig(
    var tinyFluxConfig: TinyFluxConfig? = null,
    var loggingConfig: LoggingConfig? = null
)
