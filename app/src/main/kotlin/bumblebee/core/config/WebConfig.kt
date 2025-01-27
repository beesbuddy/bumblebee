package bumblebee.core.config


data class WebConfig (
     var httpPort: Int = 8080,
     var hostname: String = "localhost",
     var enableClientCA: Boolean = false,
     var sslContextConfig: SslContextConfig? = null,
)
