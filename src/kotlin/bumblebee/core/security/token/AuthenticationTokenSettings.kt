package bumblebee.core.security.token


internal class AuthenticationTokenSettings {
    private val validFor = 36000L
    private val refreshLimit = 1
    private val refreshCount = 0
    private val secret = "secret"
    private val clockSkew = 10L
    private val audience = ""
    private val issuer = ""
    private val authorizationClaimName = "authorization"
    private val refreshCountClaimName = "refreshCount"
    private val refreshLimitClaimName = "refreshLimit"
}
