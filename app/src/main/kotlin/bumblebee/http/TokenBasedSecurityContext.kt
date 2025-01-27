package bumblebee.http

import bumblebee.core.security.AuthenticatedUserDetails
import jakarta.ws.rs.core.SecurityContext
import java.security.Principal


class TokenBasedSecurityContext(
    private val authenticatedUserDetails: AuthenticatedUserDetails,
    private val secure: Boolean
) : SecurityContext {
    override fun getUserPrincipal(): Principal {
        return authenticatedUserDetails
    }

    override fun isUserInRole(roleName: String): Boolean {
        return authenticatedUserDetails.role.name == roleName
    }

    override fun isSecure(): Boolean {
        return secure
    }

    override fun getAuthenticationScheme(): String {
        return "Bearer"
    }
}