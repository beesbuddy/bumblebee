package bumblebee.http.api.v1.filter

import bumblebee.core.Constants.TOKEN_NAME
import bumblebee.core.security.AuthenticatedUserDetails
import bumblebee.core.security.token.AuthenticationTokenService
import bumblebee.http.TokenBasedSecurityContext
import jakarta.annotation.Priority
import jakarta.inject.Inject
import jakarta.ws.rs.Priorities
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import jakarta.ws.rs.core.HttpHeaders
import jakarta.ws.rs.ext.Provider


@Provider
@Priority(Priorities.AUTHENTICATION)
class AuthenticationFilter : ContainerRequestFilter {
    @Inject
    lateinit var authenticationTokenService: AuthenticationTokenService

    override fun filter(requestContext: ContainerRequestContext) {
        val authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION)

        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_NAME)) {
            val authenticationToken = authorizationHeader.substring(TOKEN_NAME.length)
            handleTokenBasedAuthentication(authenticationToken, requestContext)
        }
    }

    private fun handleTokenBasedAuthentication(authenticationToken: String, requestContext: ContainerRequestContext) {
        val authenticationTokenDetails = authenticationTokenService.parseToken(authenticationToken)
        val authenticatedUserDetails =
            AuthenticatedUserDetails(authenticationTokenDetails.username, authenticationTokenDetails.role)
        val isSecure = requestContext.securityContext.isSecure
        val securityContext = TokenBasedSecurityContext(authenticatedUserDetails, isSecure)
        requestContext.securityContext = securityContext
    }
}
