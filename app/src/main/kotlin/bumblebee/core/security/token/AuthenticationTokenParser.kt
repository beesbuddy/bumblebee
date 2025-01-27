package bumblebee.core.security.token

import bumblebee.core.security.IAuthManager
import bumblebee.core.security.Role
import bumblebee.core.security.JWTTokenConfig
import bumblebee.core.security.Permission
import io.jsonwebtoken.*
import java.time.ZoneId
import java.time.ZonedDateTime


class AuthenticationTokenParser(private val config: JWTTokenConfig, private val authManager: IAuthManager) {
    fun parseToken(token: String?): AuthenticationTokenDetails {
        return try {
            val claims: Claims = Jwts.parser()
                .setSigningKey(config.secret)
                .requireAudience(config.audience)
                .setAllowedClockSkewSeconds(config.clockSkew)
                .parseClaimsJws(token)
                .body

            AuthenticationTokenDetails(
                id = extractTokenIdFromClaims(claims),
                username = extractUsernameFromClaims(claims),
                role = extractAuthorizationFromClaims(claims),
                issuedDate = extractIssuedDateFromClaims(claims),
                expirationDate = extractExpirationDateFromClaims(claims),
                refreshCount = extractRefreshCountFromClaims(claims),
                refreshLimit = extractRefreshLimitFromClaims(claims),
            )
        } catch (e: UnsupportedJwtException) {
            throw InvalidAuthenticationTokenException("Invalid token", e)
        } catch (e: MalformedJwtException) {
            throw InvalidAuthenticationTokenException("Invalid token", e)
        } catch (e: IllegalArgumentException) {
            throw InvalidAuthenticationTokenException("Invalid token", e)
        } catch (e: SignatureException) {
            throw InvalidAuthenticationTokenException("Invalid token", e)
        } catch (e: ExpiredJwtException) {
            throw InvalidAuthenticationTokenException("Expired token", e)
        } catch (e: InvalidClaimException) {
            throw InvalidAuthenticationTokenException("Invalid value for claim \"" + e.claimName + "\"", e)
        } catch (e: Exception) {
            throw InvalidAuthenticationTokenException("Invalid token", e)
        }
    }

    private fun extractTokenIdFromClaims(claims: Claims): String {
        return claims[Claims.ID] as String
    }

    private fun extractUsernameFromClaims(claims: Claims): String {
        return claims.subject
    }

    private fun extractAuthorizationFromClaims(claims: Claims): Role {
        val roleName = claims.getOrDefault(config.authorizationClaimName, "") as String

        return authManager.role(roleName)
    }

    private fun extractIssuedDateFromClaims(claims: Claims): ZonedDateTime {
        return ZonedDateTime.ofInstant(claims.issuedAt.toInstant(), ZoneId.systemDefault())
    }

    private fun extractExpirationDateFromClaims(claims: Claims): ZonedDateTime {
        return ZonedDateTime.ofInstant(claims.expiration.toInstant(), ZoneId.systemDefault())
    }

    private fun extractRefreshCountFromClaims(claims: Claims): Int {
        return claims[config.refreshCountClaimName] as Int
    }

    private fun extractRefreshLimitFromClaims(claims: Claims): Int {
        return claims[config.refreshLimitClaimName] as Int
    }
}
