package bumblebee.core.util

import io.netty.channel.ChannelHandlerContext
import org.glassfish.jersey.server.ContainerRequest


object ContainerRequestUtil {
    @JvmField
    internal var CHANNEL_HANDLER_CONTEXT_PROPERTY: String = ChannelHandlerContext::class.java.getName()

    fun getChannelHandlerContext(containerRequest: ContainerRequest): ChannelHandlerContext {
        return containerRequest.getProperty(CHANNEL_HANDLER_CONTEXT_PROPERTY) as ChannelHandlerContext
    }
}
