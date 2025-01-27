package bumblebee.mqtt

import bumblebee.core.Constants
import bumblebee.core.MqttMessagesDispatcher
import bumblebee.core.config.Config
import io.netty.bootstrap.ServerBootstrap
import io.netty.channel.Channel
import io.netty.channel.ChannelOption
import io.netty.channel.EventLoopGroup
import io.netty.channel.epoll.EpollEventLoopGroup
import io.netty.channel.epoll.EpollServerSocketChannel
import io.netty.channel.nio.NioEventLoopGroup
import io.netty.channel.socket.ServerSocketChannel
import io.netty.channel.socket.nio.NioServerSocketChannel
import io.netty.handler.logging.LogLevel
import io.netty.handler.logging.LoggingHandler
import io.netty.handler.ssl.SslContext
import io.netty.util.concurrent.Future
import io.netty.util.internal.StringUtil
import mu.KotlinLogging
import java.net.InetSocketAddress
import java.util.concurrent.TimeUnit


private val log = KotlinLogging.logger {}

class MQTTServer(
    private val config: Config,
    private val sslContext: SslContext?,
    private val mqttMessagesDispatcher: MqttMessagesDispatcher,
) {
    private var bossGroup: EventLoopGroup? = null
    private var workerGroup: EventLoopGroup? = null
    private var socketChannel: Class<out ServerSocketChannel?>? = null
    private var tcpChannel: Channel? = null
    private var tcpSslChannel: Channel? = null
    private var webSocketChannel: Channel? = null
    private var webSocketSslChannel: Channel? = null
    private var sysTopicEventLoop: NioEventLoopGroup? = null

    fun start() {
        initGroups()
        var startedFlag = false
        val tcpPort: Int = config.mqttConfig.tcpPort

        if (tcpPort > Constants.INT_ZERO) {
            tcpChannel = startServer(Constants.ServerProtocolType.TCP, tcpPort, false)
            startedFlag = true
        }

        val tcpSslPort: Int = config.mqttConfig.tcpSslPort

        if (tcpSslPort > Constants.INT_ZERO) {
            tcpSslChannel = startServer(Constants.ServerProtocolType.TCP, tcpSslPort, true)
            startedFlag = true
        }

        val webSocketPort: Int = config.mqttConfig.webSocketPort

        if (webSocketPort > Constants.INT_ZERO) {
            webSocketChannel =
                startServer(Constants.ServerProtocolType.WEB_SOCKET, webSocketPort, false)
            startedFlag = true
        }
        val webSocketSslPort: Int = config.mqttConfig.webSocketSslPort
        if (webSocketSslPort > Constants.INT_ZERO) {
            webSocketSslChannel =
                startServer(Constants.ServerProtocolType.WEB_SOCKET, webSocketSslPort, true)
            startedFlag = true
        }

        sysTopicEventLoop = NioEventLoopGroup()
        sysTopicEventLoop!!.scheduleAtFixedRate(
            mqttMessagesDispatcher::pubSysTopics,
            Constants.SYS_TOPIC_INIT_DELAY.toLong(),
            Constants.SYS_TOPIC_INTERVAL.toLong(),
            TimeUnit.SECONDS
        )

        if (!startedFlag) {
            stop()
        }

        Runtime.getRuntime().addShutdownHook(Thread { stop() })
    }

    private fun startServer(
        protocolType: Constants.ServerProtocolType,
        port: Int,
        useSsl: Boolean
    ): Channel {
        val MQTTChannelInitializer = MQTTChannelInitializer(
            useSsl = useSsl,
            protocolType = protocolType,
            config = config,
            mqttMessagesDispatcher = mqttMessagesDispatcher,
            sslContext = sslContext
        )

        val bootstrap = ServerBootstrap().group(bossGroup, workerGroup)
            .channel(socketChannel)
            .handler(LoggingHandler(LogLevel.INFO))
            .childHandler(MQTTChannelInitializer)
        initConnectionOptions(bootstrap)

        var socketAddress: InetSocketAddress? = InetSocketAddress(port)
        if (!StringUtil.isNullOrEmpty(config.mqttConfig.hostname)) {
            socketAddress = InetSocketAddress(config.mqttConfig.hostname, port)
        }

        val channelFuture = bootstrap.bind(socketAddress).addListener { future: Future<in Void?> ->
            if (future.isSuccess) {
                log.info(
                    "{} server started at port={} useSsl={}",
                    protocolType.name,
                    port,
                    useSsl
                )
            } else {
                log.error(
                    "{} server start failed at port={} useSsl={} errMsg={}",
                    protocolType.name,
                    port,
                    useSsl,
                    future.cause().message
                )
            }
        }
        return channelFuture.channel()
    }

    private fun initGroups() {
        if (config.nettyConfig.epoll) {
            socketChannel = EpollServerSocketChannel::class.java
            bossGroup = EpollEventLoopGroup(config.nettyConfig.bossThreads)
            workerGroup = EpollEventLoopGroup(config.nettyConfig.workerThreads)
        } else {
            socketChannel = NioServerSocketChannel::class.java
            bossGroup = NioEventLoopGroup(config.nettyConfig.bossThreads)
            workerGroup = NioEventLoopGroup(config.nettyConfig.workerThreads)
        }
    }

    private fun initConnectionOptions(bootstrap: ServerBootstrap) {
        bootstrap.childOption(ChannelOption.TCP_NODELAY, config.nettyConfig.tcpNoDelay)
        bootstrap.childOption(ChannelOption.SO_KEEPALIVE, config.nettyConfig.soKeepAlive)
        bootstrap.childOption(ChannelOption.SO_RCVBUF, config.nettyConfig.soRcvBuf)
        bootstrap.childOption(ChannelOption.SO_SNDBUF, config.nettyConfig.soSndBuf)
        bootstrap.option(ChannelOption.SO_REUSEADDR, config.nettyConfig.soReuseAddress)
        bootstrap.option(ChannelOption.SO_BACKLOG, config.nettyConfig.soBacklog)
    }

    fun stop() {
        bossGroup!!.shutdownGracefully().syncUninterruptibly()
        workerGroup!!.shutdownGracefully().syncUninterruptibly()

        if (null != tcpChannel) {
            log.info("Close tcp channel.")
            tcpChannel!!.closeFuture().syncUninterruptibly()
        }

        if (null != tcpSslChannel) {
            log.info("Close tcp ssl channel.")
            tcpSslChannel!!.closeFuture().syncUninterruptibly()
        }

        if (null != webSocketChannel) {
            log.info("Close web socket channel.")
            webSocketChannel!!.closeFuture().syncUninterruptibly()
        }

        if (null != webSocketSslChannel) {
            log.info("Close web socket ssl channel.")
            webSocketSslChannel!!.closeFuture().syncUninterruptibly()
        }

        if (null != sysTopicEventLoop) {
            sysTopicEventLoop!!.shutdownGracefully()
        }

        mqttMessagesDispatcher.close()
        log.info("MqttServer stopped.")
    }
}