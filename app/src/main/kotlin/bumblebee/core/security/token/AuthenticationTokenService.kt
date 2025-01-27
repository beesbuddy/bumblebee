package bumblebee.core.security.token

import bumblebee.core.security.Role
import bumblebee.core.security.JWTTokenConfig
import java.time.ZonedDateTime
import java.util.*

class AuthenticationTokenService(
    private val config: JWTTokenConfig,
    private val tokenParser: AuthenticationTokenParser,
    private val tokenIssuer: AuthenticationTokenIssuer,
) {

    fun parseToken(token: String?): AuthenticationTokenDetails {
        return tokenParser.parseToken(token)
    }

    fun refreshToken(currentTokenDetails: AuthenticationTokenDetails): String {
        if (!currentTokenDetails.isEligibleForRefreshment) {
            throw AuthenticationTokenRefreshmentException("This token cannot be refreshed")
        }
        val issuedDate = ZonedDateTime.now()
        val expirationDate = calculateExpirationDate(issuedDate)
        val newTokenDetails = AuthenticationTokenDetails(
            id = currentTokenDetails.id,
            username = currentTokenDetails.username,
            role = currentTokenDetails.role,
            issuedDate = issuedDate,
            expirationDate = expirationDate,
            refreshCount = currentTokenDetails.refreshCount,
            refreshLimit = config.refreshLimit
        )

        return tokenIssuer.issueToken(newTokenDetails)
    }

    fun issueToken(username: String, role: Role): String {
        val id = generateTokenIdentifier()
        val issuedDate = ZonedDateTime.now()
        val expirationDate = calculateExpirationDate(issuedDate)
        val authenticationTokenDetails = AuthenticationTokenDetails(
            id = id,
            username = username,
            role = role,
            issuedDate = issuedDate,
            expirationDate = expirationDate,
            refreshCount = 0,
            refreshLimit = config.refreshLimit
        )

        return tokenIssuer.issueToken(authenticationTokenDetails)
    }

    private fun calculateExpirationDate(issuedDate: ZonedDateTime): ZonedDateTime {
        return issuedDate.plusSeconds(config.validFor)
    }

    private fun generateTokenIdentifier(): String {
        return UUID.randomUUID().toString()
    }
}