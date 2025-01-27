package bumblebee.core.security

data class JWTTokenConfig(
    val validFor: Long = 36000L,
    val refreshLimit: Int = 1,
    val secret: String = "secret",
    val clockSkew: Long = 10L,
    val audience: String = "",
    val issuer: String = "",
    val authorizationClaimName: String = "authorities",
    val refreshCountClaimName: String = "refreshCount",
    val refreshLimitClaimName: String = "refreshLimit",
)


