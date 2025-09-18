package bumblebee.mqtt

import bumblebee.core.codec.MqttWebSocketCodec
import bumblebee.core.Constants
import bumblebee.core.MqttMessagesDispatcher
import bumblebee.core.config.Config
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelInitializer
import io.netty.channel.socket.SocketChannel
import io.netty.handler.codec.http.HttpContentCompressor
import io.netty.handler.codec.http.HttpObjectAggregator
import io.netty.handler.codec.http.HttpServerCodec
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler
import io.netty.handler.codec.mqtt.MqttDecoder
import io.netty.handler.codec.mqtt.MqttEncoder
import io.netty.handler.ssl.SslContext
import io.netty.handler.timeout.IdleStateHandler


class MQTTChannelInitializer(
    private val useSsl: Boolean = false,
    private val protocolType: Constants.ServerProtocolType,
    private val config: Config,
    private val sslContext: SslContext?,
    private val mqttMessagesDispatcher: MqttMessagesDispatcher,
) : ChannelInitializer<SocketChannel>() {
    @Throws(Exception::class)
    override fun initChannel(channel: SocketChannel) {
        val pipeline = channel.pipeline()
        pipeline.addFirst(
            Constants.HANDLER_IDLE_STATE,
            IdleStateHandler(
                0,
                0,
                config.nettyConfig.channelTimeoutSeconds
            )
        )

        if (useSsl && sslContext != null) {
            val enableClientCA: Boolean = config.sslContextConfig?.enableClientCA ?: false
            pipeline.addLast(
                Constants.HANDLER_HTTPS,
                NettyUtil.buildSslHandler(
                    channel.alloc(),
                    sslContext,
                    enableClientCA
                )
            )
        }

        if (Constants.ServerProtocolType.WEB_SOCKET === protocolType) {
            pipeline.addLast(Constants.HANDLER_HTTP_SERVER_CODEC, HttpServerCodec())
            pipeline.addLast(Constants.HANDLER_HTTP_OBJECT_AGGREGATOR, HttpObjectAggregator(1048576))
            pipeline.addLast(Constants.HANDLER_COMPRESSOR, HttpContentCompressor())
            pipeline.addLast(
                Constants.HANDLER_WEBSOCKET_PROTOCOL,
                WebSocketServerProtocolHandler(
                    config.mqttConfig.webSocketPath,
                    Constants.MQTT_SUB_PROTOCOL_CSV_LIST,
                    true,
                    65536
                )
            )
            pipeline.addLast(Constants.HANDLER_WEBSOCKET_PROTOCOL_CODEC, MqttWebSocketCodec())
        }
        pipeline.addLast(Constants.HANDLER_MQTT_DECODER, MqttDecoder())
        pipeline.addLast(Constants.HANDLER_MQTT_ENCODER, MqttEncoder.INSTANCE)
        pipeline.addLast(Constants.HANDLER_MQTT_MAIN, mqttMessagesDispatcher)
    }
}