package bumblebee.core.config


data class SslContextConfig(
    var sslKeyFilePath: String,
    var sslKeyStoreType: String,
    var sslManagerPwd: String,
    var sslStorePwd: String,
    var enableClientCA: Boolean = false,
)

