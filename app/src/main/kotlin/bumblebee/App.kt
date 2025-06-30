package bumblebee

import bumblebee.mqtt.MQTTFactory
import bumblebee.core.Constants
import bumblebee.core.config.Config
import bumblebee.core.inner.traffic.IInnerTraffic
import bumblebee.core.inner.traffic.NoopInnerTraffic
import bumblebee.core.security.*
import bumblebee.core.security.token.AuthenticationTokenIssuer
import bumblebee.core.security.token.AuthenticationTokenParser
import bumblebee.core.security.token.AuthenticationTokenService
import bumblebee.core.util.ConfigUtil
import bumblebee.core.util.Stopwatch
import bumblebee.http.HttpFactory
import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Encoders
import io.jsonwebtoken.security.Keys
import mu.KotlinLogging

private val log = KotlinLogging.logger {}


class App : CliktCommand() {
    private val configPath by option("-c", "--config", help = "path to configuration")
    private val passwordToHash by option("-h", "--hash", help = "hash password")
    private val generateAdminToken by option("-t", "--token", help = "generate admin token").flag(default = false)
    private val enableDashboard by option("-a", "--admin", help = "enable administration dashboard").flag(default = true)
    private val generateSecret by option("-s", "--secret", help = "generates secret to be used with jwt token").flag(default = false)

    private fun startBroker(config: Config, authManager: IAuthManager, authenticationTokenService: AuthenticationTokenService, innerTraffic: IInnerTraffic) {
        val brokerServer = MQTTFactory.createBroker(config, authManager, innerTraffic)
        brokerServer.start()
    }

    private fun startHttp(config: Config, authManager: IAuthManager, authenticationTokenService: AuthenticationTokenService, enableAdmin: Boolean) {
        val httpServer = HttpFactory.createServer(config, authManager, authenticationTokenService, enableAdmin)
        httpServer.start()
    }

    override fun run() {
        val defaultConfig = Config()

        val config = configPath?.let {
            ConfigUtil.loadFromSystemProps(it, defaultConfig)
        } ?: ConfigUtil.loadFromSystemProps(
                classPath = "classpath://config.properties",
                prefix = Constants.APP_CONFIG_PROPS_PRE,
                targetType = Config::class.java,
                defaultValue = defaultConfig
            )

        val authManager = AuthManagerProvider.initialize(config.securityConfig)

        val jwtConfig = JWTTokenConfig()

        val authenticationTokenService = AuthenticationTokenService(
            config = jwtConfig,
            tokenParser = AuthenticationTokenParser(jwtConfig, authManager),
            tokenIssuer = AuthenticationTokenIssuer(jwtConfig),
        )

        passwordToHash?.let {
            println(PasswordEncoder.hashPassword(passwordToHash))

            return@run
        }

        if (generateAdminToken) {
            println("Generating super user token...")
            val token = authenticationTokenService.issueToken(
                Constants.SUPER_USERNAME,
                authManager.role("superadmin"))
            println("Token for super user [$token]")
            return
        }

        if (generateSecret) {
            println("Generating secret for JWT token...")
            val key = Keys.secretKeyFor(SignatureAlgorithm.HS256)
            val encoded = Encoders.BASE64.encode(key.encoded)
            println("Secret for token [$encoded]")
            return
        }

        startBroker(config, authManager, authenticationTokenService, NoopInnerTraffic(config.mqttConfig.nodeName ?: Constants.MASTER_NODE_NAME))

        startHttp(config, authManager, authenticationTokenService, enableDashboard)
    }
}

fun main(args: Array<String>) {
    val stopwatch: Stopwatch = Stopwatch.start()
    App().main(args)
    stopwatch.stop()
    log.info("Bumblebee started in {} ms", stopwatch.elapsedMills())
}
