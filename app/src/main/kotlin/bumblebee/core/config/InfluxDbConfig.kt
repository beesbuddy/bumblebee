package bumblebee.core.config

data class InfluxDbConfig(
    var host: String? = null,
    var organization: String? = null,
    var matchTopic: String? = null,
    var token: String? = null,
)