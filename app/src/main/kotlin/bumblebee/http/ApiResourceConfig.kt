package bumblebee.http

import bumblebee.core.config.Config
import bumblebee.core.security.AuthManagerProvider
import bumblebee.core.security.IAuthManager
import bumblebee.core.security.token.AuthenticationTokenService
import org.glassfish.hk2.utilities.binding.AbstractBinder
import org.glassfish.jersey.jackson.JacksonFeature
import org.glassfish.jersey.logging.LoggingFeature
import org.glassfish.jersey.media.multipart.MultiPartFeature
import org.glassfish.jersey.server.ResourceConfig


class ApiResourceConfig(
    val config: Config,
    val authManager: IAuthManager,
    val authenticationTokenService: AuthenticationTokenService
) : ResourceConfig() {
    init {
        // DI
        register(object : AbstractBinder() {
            override fun configure() {
                bind(authManager) to AuthManagerProvider::class.java
                bind(authenticationTokenService) to AuthenticationTokenService::class.java
                bind(config) to Config::class.java
            }
        })

        // Features
        register(JacksonFeature::class.java)
        register(LoggingFeature::class.java)
        register(MultiPartFeature::class.java)

        // Controllers, mappers, filters auto configuration
        packages(true, "bumblebee.http.api.v1.filter")
        packages(true, "bumblebee.http.api.v1.mapper")
        packages(true, "bumblebee.http.api.v1.controller")
    }
}
