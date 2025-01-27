package bumblebee.core.util

import bumblebee.core.Constants.CLIENT_ID
import bumblebee.core.Constants.USER_NAME
import cn.hutool.core.util.StrUtil
import io.netty.buffer.ByteBufAllocator
import io.netty.channel.Channel
import io.netty.channel.ChannelHandler
import io.netty.handler.ssl.SslContext
import io.netty.handler.ssl.SslHandler
import io.netty.util.AttributeKey
import java.net.InetSocketAddress


object NettyUtil {
    val ATTR_CLIENT_ID: AttributeKey<String> = AttributeKey.valueOf(CLIENT_ID)
    private val ATTR_USER_NAME: AttributeKey<String> = AttributeKey.valueOf(USER_NAME)

    fun clientInfo(channel: Channel, clientId: String?, userName: String?) {
        clientId(channel, clientId)
        userName(channel, userName)
    }

    fun clientId(channel: Channel, clientId: String?) {
        channel.attr(ATTR_CLIENT_ID).set(clientId)
    }

    fun clientId(channel: Channel): String {
        return channel.attr(ATTR_CLIENT_ID).get()
    }

    fun userName(channel: Channel, userName: String?) {
        channel.attr(ATTR_USER_NAME).set(userName)
    }

    fun userName(channel: Channel): String {
        return channel.attr(ATTR_USER_NAME).get()
    }

    fun getRemoteIp(channel: Channel): String {
        try {
            val socketAddr = channel.remoteAddress() as InetSocketAddress
            return socketAddr.address.hostAddress
        } catch (ignored: Throwable) {
        }
        return StrUtil.EMPTY
    }

    fun buildSslHandler(alloc: ByteBufAllocator, sslContext: SslContext, needClientAuth: Boolean): ChannelHandler {
        val sslEngine = sslContext.newEngine(alloc)
        sslEngine.useClientMode = false
        if (needClientAuth) {
            sslEngine.needClientAuth = true
        }
        return SslHandler(sslEngine)
    }
}

