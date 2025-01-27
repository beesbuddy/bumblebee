package bumblebee.core.http

import io.netty.channel.ChannelHandlerContext
import jakarta.ws.rs.core.SecurityContext
import java.security.Principal


class NettySecurityContext(
    ctx: ChannelHandlerContext
) : SecurityContext {

    override fun isUserInRole(role: String): Boolean {
        return false
    }

    override fun isSecure(): Boolean {
        return false
    }

    override fun getUserPrincipal(): Principal? {
        return null
    }

    override fun getAuthenticationScheme(): String? {
        return null
    }
}
