package bumblebee.core.config

import bumblebee.core.Constants

data class LoggingConfig(
    var path: String? = Constants.DEFAULT_PAYLOAD_LOGGING_PATH,
    var className: String? = "bumblebee.mqtt.worker.logging.OnEventWorker"
)