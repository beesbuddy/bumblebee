package bumblebee.http

import bumblebee.core.Constants.HANDLER_CHUNKED_WRITER
import bumblebee.core.Constants.HANDLER_HTTP_OBJECT_AGGREGATOR
import bumblebee.core.Constants.HANDLER_HTTP_SERVER_CODEC
import bumblebee.core.Constants.HANDLER_SSL
import bumblebee.core.config.WebConfig
import bumblebee.core.http.HttpServerHandler
import bumblebee.core.http.NettyHttpContainer
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelInitializer
import io.netty.channel.ChannelPipeline
import io.netty.channel.socket.SocketChannel
import io.netty.handler.codec.http.HttpObjectAggregator
import io.netty.handler.codec.http.HttpServerCodec
import io.netty.handler.ssl.SslContext
import io.netty.handler.stream.ChunkedWriteHandler
import java.util.function.Consumer


class HttpChannelInitializer(
    val appContainer: NettyHttpContainer,
    val config: WebConfig,
    val pipelineConfigurator: Consumer<ChannelPipeline>?,
    val sslContext: SslContext?,
    val enableClientCA: Boolean = false,
    val enableAdmin: Boolean = false,
) : ChannelInitializer<SocketChannel?>() {
    @Throws(Exception::class)
    override fun initChannel(channel: SocketChannel?) {
        val pipeline: ChannelPipeline = channel?.pipeline()!!
        pipeline.addLast(HANDLER_HTTP_SERVER_CODEC, HttpServerCodec())
        pipeline.addLast(HANDLER_HTTP_OBJECT_AGGREGATOR, HttpObjectAggregator(1048576))
        pipeline.addLast(HANDLER_CHUNKED_WRITER, ChunkedWriteHandler())
        val useSsl = null != sslContext

        if (useSsl) {
            pipeline.addLast(
                HANDLER_SSL,
                NettyUtil.buildSslHandler(
                    channel.alloc(),
                    sslContext,
                    enableClientCA
                )
            )
        }

        if (enableAdmin) {
            pipeline.addLast(HANDLER_UI, UIPageHandler.INSTANCE)
        }
        pipeline.addLast(HANDLER_SSE_SERVER, SseHandler.INSTANCE)
        pipeline.addLast(HANDLER_HTTP_SERVER, HttpServerHandler(appContainer, useSsl))

        pipelineConfigurator?.accept(pipeline)
    }

    companion object {
        val HANDLER_UI: String = UIPageHandler::class.java.getName()
        val HANDLER_SSE_SERVER: String = SseHandler::class.java.getName()
        val HANDLER_HTTP_SERVER: String = HttpServerHandler::class.java.getName()
    }
}
