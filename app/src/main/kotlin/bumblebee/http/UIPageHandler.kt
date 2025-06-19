package bumblebee.http

import bumblebee.core.Constants
import bumblebee.core.util.FileUtil.toRandomAccessFile
import io.netty.channel.ChannelFutureListener
import io.netty.channel.ChannelHandler.Sharable
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.DefaultFileRegion
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.handler.codec.http.*
import io.netty.util.CharsetUtil
import mu.KotlinLogging
import java.io.FileNotFoundException
import java.io.IOException

private val log = KotlinLogging.logger {}


@Sharable
class UIPageHandler private constructor() : SimpleChannelInboundHandler<FullHttpRequest>() {
    override fun channelRead0(ctx: ChannelHandlerContext, request: FullHttpRequest) {
        if (forward(request)) {
            ctx.fireChannelRead(request.retain())
            return
        }
        if (request.decoderResult().isFailure) {
            val badRequest = DefaultFullHttpResponse(request.protocolVersion(), HttpResponseStatus.BAD_REQUEST)
            sendResponse(badRequest, ctx, true)
            return
        }
        if (!sendResource(request, ctx)) {
            val notFound = DefaultFullHttpResponse(request.protocolVersion(), HttpResponseStatus.NOT_FOUND)
            notFound.headers()[HttpHeaderNames.CONTENT_TYPE] = HttpHeaderValues.TEXT_PLAIN
            val payload = "Requested resource ${request.uri()} not found"
            notFound.content().writeCharSequence(payload, CharsetUtil.UTF_8)
            HttpUtil.setContentLength(notFound, notFound.content().readableBytes().toLong())
            sendResponse(notFound, ctx, true)
        }
    }

    companion object {
        internal val INSTANCE = UIPageHandler()
        private const val STATIC_CONTENT_PATH = "static/"

        private fun forward(request: FullHttpRequest): Boolean {
            return request.uri().contains(Constants.API_V1_PATH) ||
                    request.uri().contains(Constants.SSE_PATH) ||
                    request.headers().contains(HttpHeaderNames.UPGRADE, HttpHeaderValues.WEBSOCKET, true)
        }

        private fun sendResource(request: FullHttpRequest, ctx: ChannelHandlerContext): Boolean {
            if (request.uri().isEmpty() || !request.uri().startsWith("/")) {
                return false
            }
            var requestedResource = request.uri().substring(1)

            if (requestedResource.isEmpty()) {
                requestedResource = "index.html"
            }

            val resource = STATIC_CONTENT_PATH + requestedResource

            try {
                INSTANCE.javaClass.getClassLoader().getResourceAsStream(resource).use { `in` ->
                    if (`in` == null) {
                        return false
                    }
                    val raf = toRandomAccessFile(`in`)
                    val fileLength = raf.length()
                    val response = DefaultHttpResponse(request.protocolVersion(), HttpResponseStatus.OK)
                    HttpUtil.setContentLength(response, fileLength)
                    var contentType = "application/octet-stream"
                    if (requestedResource.endsWith("html")) {
                        contentType = "text/html; charset=UTF-8"
                    } else if (requestedResource.endsWith("css")) {
                        contentType = "text/css; charset=UTF-8"
                    } else if (requestedResource.endsWith("js")) {
                        contentType = "application/javascript"
                    }
                    response.headers()[HttpHeaderNames.CONTENT_TYPE] = contentType
                    sendResponse(response, ctx, false)
                    ctx.write(DefaultFileRegion(raf.getChannel(), 0, fileLength))
                    ctx.writeAndFlush(LastHttpContent.EMPTY_LAST_CONTENT)
                }
            } catch (fne: FileNotFoundException) {
                log.error("File not found {}", fne.message)
                return false
            } catch (io: IOException) {
                log.error("Cannot read file length {}", io.message)
                return false
            }
            return true
        }

        private fun sendResponse(response: HttpResponse, ctx: ChannelHandlerContext, autoFlush: Boolean) {
            if (HttpUtil.isKeepAlive(response)) {
                if (response.protocolVersion() == HttpVersion.HTTP_1_0) {
                    response.headers()[HttpHeaderNames.CONNECTION] = HttpHeaderValues.KEEP_ALIVE
                }
                ctx.write(response)
            } else {
                response.headers()[HttpHeaderNames.CONNECTION] = HttpHeaderValues.CLOSE
                ctx.write(response).addListener(ChannelFutureListener.CLOSE)
            }

            if (autoFlush) {
                ctx.flush()
            }
        }
    }
}
