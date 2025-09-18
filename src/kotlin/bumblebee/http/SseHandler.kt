package bumblebee.http

import bumblebee.core.Constants
import bumblebee.streams.MetricsStreamRegistry
import io.netty.buffer.Unpooled
import io.netty.channel.ChannelFutureListener
import io.netty.channel.ChannelHandler.Sharable
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.handler.codec.http.*
import io.netty.util.CharsetUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import mu.KotlinLogging
import kotlin.coroutines.cancellation.CancellationException

private val log = KotlinLogging.logger {}


@Sharable
class SseHandler private constructor() : SimpleChannelInboundHandler<FullHttpRequest>() {
    private val routes: Map<String, (ChannelHandlerContext, FullHttpRequest) -> Unit> = mapOf(
        Constants.SSE_PATH to ::handleHealth,
        "${Constants.SSE_PATH}/metrics" to ::handleMetrics
    )

    override fun channelRead0(ctx: ChannelHandlerContext, request: FullHttpRequest) {
        if (request.uri().isEmpty() || !request.uri().startsWith(Constants.SSE_PATH)) {
            ctx.fireChannelRead(request.retain())
        } else {
            val uri = request.uri()
            val decoder = QueryStringDecoder(uri)
            val path = decoder.path()
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

        @Suppress("UNUSED_PARAMETER")
        private fun handleHealth(ctx: ChannelHandlerContext, request: FullHttpRequest) {
            val content = Unpooled.copiedBuffer("OK", CharsetUtil.UTF_8)
            val response = DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1, HttpResponseStatus.OK, content
            ).apply {
                headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain; charset=UTF-8")
                headers().setInt(HttpHeaderNames.CONTENT_LENGTH, content.readableBytes())
            }
            ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE)
        }

        private fun handleSysTopic(ctx: ChannelHandlerContext, request: FullHttpRequest) {
        }

        private fun handleMetrics(ctx: ChannelHandlerContext, request: FullHttpRequest) {
            val lastEventId = request.headers().get("Last-Event-ID")?.toLongOrNull()
            log.info("Client last received event ID $lastEventId")

            val response = DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK)
            response.headers().apply {
                set(HttpHeaderNames.CONTENT_TYPE, "text/event-stream; charset=UTF-8")
                set(HttpHeaderNames.CACHE_CONTROL, "no-cache")
                set(HttpHeaderNames.CONNECTION, HttpHeaderValues.KEEP_ALIVE)
                set(HttpHeaderNames.TRANSFER_ENCODING, HttpHeaderValues.CHUNKED)
            }

            ctx.write(response)
            ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)

            val uri = request.uri()
            val decoder = QueryStringDecoder(uri)
            val params = decoder.parameters()
            val orgId = params["orgId"]?.firstOrNull()

            if (null != orgId) {
                val flow = MetricsStreamRegistry.getOrCreateFlow(orgId)

                val job = CoroutineScope(Dispatchers.IO).launch {
                    try {
                        flow.collectLatest { data ->
                            if (!ctx.channel().isActive) {
                                this.cancel()
                            }
                            val content = Unpooled.copiedBuffer(data + "\n", CharsetUtil.UTF_8)
                            val chunk = DefaultHttpContent(content)
                            ctx.writeAndFlush(chunk)
                        }
                    } catch (_: CancellationException) {
                        log.warn("SSE stream cancelled for org=$orgId")
                    } catch (e: Throwable) {
                        log.error("SSE error", e)
                    } finally {
                        ctx.close()
                    }
                }

                ctx.channel().closeFuture().addListener {
                    job.cancel()
                }
            }
        }

        @Suppress("UNUSED_PARAMETER")
        private fun sendNotFound(ctx: ChannelHandlerContext, request: FullHttpRequest) {
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
