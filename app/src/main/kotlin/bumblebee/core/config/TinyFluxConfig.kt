package bumblebee.core.config

import bumblebee.core.Constants

data class TinyFluxConfig(
    var organization: String? = null,
    var className: String? = "bumblebee.mqtt.worker.tinyflux.OnEventWorker",
    var path: String? = Constants.DEFAULT_TINYFLUX_PATH,
)