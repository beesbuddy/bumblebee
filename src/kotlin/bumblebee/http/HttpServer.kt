package bumblebee.http

import bumblebee.core.Constants
import bumblebee.core.config.Config
import bumblebee.core.config.WebConfig
import bumblebee.core.http.NettyHttpContainer
import bumblebee.core.security.IAuthManager
import bumblebee.core.security.token.AuthenticationTokenService
import bumblebee.core.util.SslContextUtil
import io.netty.bootstrap.ServerBootstrap
import io.netty.channel.Channel
import io.netty.channel.ChannelOption
import io.netty.channel.ChannelPipeline
import io.netty.channel.EventLoopGroup
import io.netty.channel.nio.NioEventLoopGroup
import io.netty.channel.socket.nio.NioServerSocketChannel
import io.netty.handler.logging.LogLevel
import io.netty.handler.logging.LoggingHandler
import io.netty.handler.ssl.SslContext
import jakarta.ws.rs.core.Application
import mu.KotlinLogging
import java.util.function.Consumer
import kotlin.concurrent.Volatile


private val log = KotlinLogging.logger {}

class HttpServer(
    app: Application,
    sslContext: SslContext? = null,
    pipelineConfigurator: Consumer<ChannelPipeline>? = null,
    enableClientCA: Boolean = false,
    enableAdmin: Boolean = false,
) {
    private val host: String
    private val port: Int

    @Volatile
    private var serverChannel: Channel? = null
    private val serverBootstrap: ServerBootstrap
    private val bossGroup: EventLoopGroup
    private val workerGroup: EventLoopGroup
    private val appContainer: NettyHttpContainer

    init {
        val webConfig: WebConfig = if (app is ApiResourceConfig) {
            app.config.webConfig
        } else {
            WebConfig()
        }

        host = webConfig.hostname
        port = webConfig.httpPort

        // TODO: Use netty config from web config
        bossGroup = NioEventLoopGroup(1)
        workerGroup = NioEventLoopGroup()
        serverBootstrap = ServerBootstrap()
        serverBootstrap.option(ChannelOption.SO_BACKLOG, 1024)
        appContainer = NettyHttpContainer(app)

        serverBootstrap
            .group(bossGroup, workerGroup)
            .channel(NioServerSocketChannel::class.java)
            .handler(LoggingHandler(LogLevel.INFO))
            .childHandler(
                HttpChannelInitializer(
                    appContainer = appContainer,
                    config = webConfig,
                    sslContext = sslContext,
                    pipelineConfigurator = pipelineConfigurator,
                    enableClientCA = enableClientCA,
                    enableAdmin = enableAdmin,
                )
            )
    }

    fun start() {
        try {
            if (port > Constants.INT_ZERO) {
                serverBootstrap.bind(host, port).sync().channel().closeFuture().addListener { stop() }

                log.info("Server started. Open your web browser and navigate to http://{}:{}/", host, port)
            } else {
                log.info("Port is not configured. Gracefully shutdown http server without binding it.")

                close()
            }
        } catch (_: InterruptedException) {
            stop()
        }
    }

    fun stop() {
        try {
            serverChannel?.let {
                it.disconnect()
                it.closeFuture().sync()
            }

            log.info("HttpServer stopped")
        } catch (e: InterruptedException) {
            log.error("Error while stopping server", e)
        } finally {
            close()
        }
    }

    private fun close() {
        bossGroup.shutdownGracefully()
        workerGroup.shutdownGracefully()
    }

    companion object Factory {
        fun create(config: Config, authManager: IAuthManager, authenticationTokenService: AuthenticationTokenService, enableAdmin: Boolean): HttpServer {
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
                enableAdmin = enableAdmin
            )
        }
    }
}
