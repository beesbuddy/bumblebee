package bumblebee.http

import bumblebee.core.config.Config
import bumblebee.core.security.AuthManagerProvider
import bumblebee.core.security.IAuthManager
import bumblebee.core.security.token.AuthenticationTokenService
import bumblebee.core.util.SslContextUtil

object HttpFactory {
    fun createServer(config: Config, authManager: IAuthManager, authenticationTokenService: AuthenticationTokenService): HttpServer {
        val enableClientCA = config.sslContextConfig?.enableClientCA ?: false
        val sslContext = SslContextUtil.createSslContext(
            config = config.sslContextConfig,
            enableClientCA = enableClientCA,
        )

        val app = ApiResourceConfig(config, authManager, authenticationTokenService)

        return HttpServer(
            app = app,
            sslContext = sslContext,
            enableClientCA = enableClientCA,
        )
    }
}