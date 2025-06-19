package bumblebee.http

import bumblebee.core.Constants
import io.netty.buffer.Unpooled
import io.netty.channel.ChannelFutureListener
import io.netty.channel.ChannelHandler.Sharable
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.handler.codec.http.*
import io.netty.util.CharsetUtil
import mu.KotlinLogging
import java.util.concurrent.TimeUnit

private val log = KotlinLogging.logger {}


@Sharable
class SseHandler private constructor() : SimpleChannelInboundHandler<FullHttpRequest>() {
    private val routes: Map<String, (ChannelHandlerContext, FullHttpRequest) -> Unit> = mapOf(
        Constants.SSE_PATH to ::handleHealth,
        "${Constants.SSE_PATH}/timestamp" to ::handleTimestamp
    )

    override fun channelRead0(ctx: ChannelHandlerContext, request: FullHttpRequest) {
        if (request.uri().isEmpty() || !request.uri().startsWith(Constants.SSE_PATH)) {
            ctx.fireChannelRead(request.retain())
        } else {
            val uri = request.uri()
            val decoder = QueryStringDecoder(uri)
            val path = decoder.path()
//            val params = decoder.parameters()
//            val q = params["q"]?.firstOrNull()
//            val limit = params["limit"]?.firstOrNull()?.toIntOrNull()

            val handler = routes[path] ?: ::sendNotFound
            handler(ctx, request)
        }
    }

    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        cause.printStackTrace()
        ctx.close()
    }

    companion object {
        internal val INSTANCE = SseHandler()

        private fun handleHealth(ctx: ChannelHandlerContext, _request: FullHttpRequest) {
            val content = Unpooled.copiedBuffer("OK", CharsetUtil.UTF_8)
            val response = DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1, HttpResponseStatus.OK, content
            ).apply {
                headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain; charset=UTF-8")
                headers().setInt(HttpHeaderNames.CONTENT_LENGTH, content.readableBytes())
            }
            ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE)
        }

        private fun handleTimestamp(ctx: ChannelHandlerContext, request: FullHttpRequest) {
            val lastEventId = request.headers().get("Last-Event-ID")?.toLongOrNull()
            log.info("Client last received event ID {0}, lastEventId")

            val response = DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK)
            response.headers().apply {
                set(HttpHeaderNames.CONTENT_TYPE, "text/event-stream; charset=UTF-8")
                set(HttpHeaderNames.CACHE_CONTROL, "no-cache")
                set(HttpHeaderNames.CONNECTION, HttpHeaderValues.KEEP_ALIVE)
                set(HttpHeaderNames.TRANSFER_ENCODING, HttpHeaderValues.CHUNKED)
            }

            ctx.write(response)
            ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)

            // Start sending events, using an event ID
            val startId = (lastEventId ?: 0L) + 1
            val scheduler = ctx.executor()
            var eventId = startId

            scheduler.scheduleAtFixedRate({
                if (ctx.channel().isActive) {
                    val data = "id: $eventId\ndata: Event $eventId at ${System.currentTimeMillis()}\n\n"
                    val content = Unpooled.copiedBuffer(data, CharsetUtil.UTF_8)
                    val chunk = DefaultHttpContent(content)
                    ctx.writeAndFlush(chunk)
                    eventId++
                }
            }, 0, 2, TimeUnit.SECONDS)
        }

        private fun sendNotFound(ctx: ChannelHandlerContext, _request: FullHttpRequest) {
            val content = Unpooled.copiedBuffer("404 Not Found", CharsetUtil.UTF_8)
            val response = DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1, HttpResponseStatus.NOT_FOUND, content
            ).apply {
                headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain; charset=UTF-8")
                headers().setInt(HttpHeaderNames.CONTENT_LENGTH, content.readableBytes())
            }
            ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE)
        }
    }
}
