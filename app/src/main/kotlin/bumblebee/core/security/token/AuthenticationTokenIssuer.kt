package bumblebee.core.security.token

import bumblebee.core.security.JWTTokenConfig
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.util.*


class AuthenticationTokenIssuer(private val config: JWTTokenConfig) {
    fun issueToken(authenticationTokenDetails: AuthenticationTokenDetails): String {
        return Jwts.builder()
            .setId(authenticationTokenDetails.id)
            .setIssuer(config.issuer)
            .setAudience(config.audience)
            .setSubject(authenticationTokenDetails.username)
            .setIssuedAt(Date.from(authenticationTokenDetails.issuedDate.toInstant()))
            .setExpiration(Date.from(authenticationTokenDetails.expirationDate.toInstant()))
            .claim(config.authorizationClaimName, authenticationTokenDetails.role.name)
            .claim(config.refreshCountClaimName, authenticationTokenDetails.refreshCount)
            .claim(config.refreshLimitClaimName, authenticationTokenDetails.refreshLimit)
            .signWith(SignatureAlgorithm.HS256, config.secret)
            .compact()
    }
}