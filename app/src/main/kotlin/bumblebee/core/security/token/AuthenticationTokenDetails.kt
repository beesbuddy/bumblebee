package bumblebee.core.security.token

import bumblebee.core.security.Role
import java.time.ZonedDateTime


class AuthenticationTokenDetails(
    val id: String,
    val username: String,
    val role: Role,
    val issuedDate: ZonedDateTime,
    val expirationDate: ZonedDateTime,
    val refreshCount: Int,
    val refreshLimit: Int
) {
    val isEligibleForRefreshment: Boolean
        get() = refreshCount < refreshLimit
}
