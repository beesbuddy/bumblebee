package bumblebee.core.http

import bumblebee.core.Constants
import bumblebee.core.util.ContainerRequestUtil
import io.netty.buffer.ByteBuf
import io.netty.buffer.ByteBufInputStream
import io.netty.buffer.ByteBufOutputStream
import io.netty.channel.ChannelFutureListener
import io.netty.channel.ChannelHandler.Sharable
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.ChannelInboundHandlerAdapter
import io.netty.handler.codec.http.*
import io.netty.handler.codec.rtsp.RtspResponseStatuses
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.core.UriBuilder
import mu.KotlinLogging
import org.glassfish.jersey.internal.PropertiesDelegate
import org.glassfish.jersey.server.ApplicationHandler
import org.glassfish.jersey.server.ContainerRequest
import org.glassfish.jersey.server.ContainerResponse
import org.glassfish.jersey.server.ResourceConfig
import org.glassfish.jersey.server.spi.Container
import java.net.URI
import java.net.URISyntaxException


private val log = KotlinLogging.logger {}

@Sharable
class HttpServerHandler(container: NettyHttpContainer, private val useSsl: Boolean) :
    ChannelInboundHandlerAdapter(), Container {
    private val applicationHandler: ApplicationHandler = container.applicationHandler

    override fun channelReadComplete(ctx: ChannelHandlerContext) {
        ctx.flush()
    }

    override fun channelRead(ctx: ChannelHandlerContext, msg: Any) {
        if (msg is HttpRequest) {
            if (HttpUtil.is100ContinueExpected(msg)) {
                ctx.write(DefaultFullHttpResponse(HttpVersion.HTTP_1_1, RtspResponseStatuses.CONTINUE))
            }

            val keepAlive = HttpUtil.isKeepAlive(msg)
            val response = processRequest(ctx, msg)
            response.headers().setInt(Constants.CONTENT_LENGTH, response.content().readableBytes())

            if (!keepAlive) {
                ctx.write(response).addListener(ChannelFutureListener.CLOSE)
            } else {
                response.headers()[Constants.CONNECTION] = Constants.KEEP_ALIVE
                ctx.write(response)
            }
        }
    }

    private fun processRequest(ctx: ChannelHandlerContext, req: HttpRequest): FullHttpResponse {
        var response: FullHttpResponse
        val buffer = ctx.alloc().buffer()

        try {
            val requestContext = createContainerRequest(ctx, req)
            val contentLength =
                if (req.headers().contains(HttpHeaderNames.CONTENT_LENGTH)) HttpUtil.getContentLength(req) else -1L
            if (contentLength >= Constants.MAX_REQUEST_ENTITY_BYTES) {
                requestContext.abortWith(Response.status(Response.Status.REQUEST_ENTITY_TOO_LARGE).build())
            }
            val containerResponse = applicationHandler
                .apply(requestContext, ByteBufOutputStream(buffer))
                .get()
            response = sendResponse(containerResponse, buffer)
        } catch (e: Exception) {
            buffer.release()
            log.warn("Can't process the request", e)
            response = DefaultFullHttpResponse(req.protocolVersion(), HttpResponseStatus.INTERNAL_SERVER_ERROR)
            response.headers()[Constants.CONTENT_TYPE] = MediaType.TEXT_PLAIN
        }

        return response
    }

    @Throws(URISyntaxException::class)
    private fun createContainerRequest(ctx: ChannelHandlerContext, req: HttpRequest): ContainerRequest {
        val headers = req.headers()
        val baseUri = URI((if (useSsl) "https" else "http") + "://" + headers[HttpHeaderNames.HOST] + "/")

        val requestUri = UriBuilder.fromUri(req.uri())
            .scheme(baseUri.scheme)
            .host(baseUri.host)
            .port(baseUri.port)
            .build()
        val httpMethod = req.method().name()
        val requestContext = ContainerRequest(
            baseUri,
            requestUri,
            httpMethod,
            getSecurityContext(ctx),
            object : PropertiesDelegate {
                private val properties: MutableMap<String, Any> = HashMap()
                override fun getProperty(name: String): Any? {
                    return properties[name]
                }

                override fun getPropertyNames(): Collection<String> {
                    return properties.keys
                }

                override fun setProperty(name: String, `object`: Any) {
                    properties[name] = `object`
                }

                override fun removeProperty(name: String) {
                    properties.remove(name)
                }
            },
            getApplicationHandler().configuration
        )
        requestContext.setProperty(ContainerRequestUtil.CHANNEL_HANDLER_CONTEXT_PROPERTY, ctx)
        (req as? FullHttpRequest)?.let { processEntity(it, requestContext) }
        processRequestHeaders(headers, requestContext)
        return requestContext
    }

    private fun processEntity(req: FullHttpRequest, requestContext: ContainerRequest) {
        val content = req.content()
        if (content != null) {
            requestContext.entityStream = ByteBufInputStream(content)
        }
    }

    private fun sendResponse(containerResponse: ContainerResponse, buffer: ByteBuf): FullHttpResponse {
        val status = HttpResponseStatus.valueOf(containerResponse.status)
        val result = DefaultFullHttpResponse(HttpVersion.HTTP_1_1, status, buffer, true)
        prepareResponseHeaders(containerResponse, result)
        return result
    }

    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        log.error("Unhandled exception: ", cause)
        ctx.close()
    }

    override fun getApplicationHandler(): ApplicationHandler {
        return applicationHandler
    }

    override fun getConfiguration(): ResourceConfig {
        return applicationHandler.configuration
    }

    override fun reload() {
        reload(configuration)
    }

    override fun reload(configuration: ResourceConfig) {
        throw UnsupportedOperationException()
    }

    private fun getSecurityContext(ctx: ChannelHandlerContext): NettySecurityContext {
        return NettySecurityContext(ctx)
    }

    companion object {
        private fun processRequestHeaders(headers: HttpHeaders, requestContext: ContainerRequest) {
            for (header in headers) {
                var value = header.value
                val headerName = header.key
                if (HttpHeaderNames.CONTENT_TYPE.contentEqualsIgnoreCase(headerName) && value.indexOf(';') > 0) {
                    value = value.substring(0, value.indexOf(';'))
                }
                requestContext.headers(headerName, value)
            }
        }

        private fun prepareResponseHeaders(containerResponse: ContainerResponse, result: DefaultFullHttpResponse) {
            val containerResponseHeaders = containerResponse.headers
            val responseHeaders = result.headers()

            for ((headerName, headerValues) in containerResponseHeaders) {
                responseHeaders.add(headerName, headerValues)
            }
        }
    }
}
