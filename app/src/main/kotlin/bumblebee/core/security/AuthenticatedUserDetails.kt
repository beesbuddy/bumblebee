package bumblebee.core.security

import java.security.Principal


class AuthenticatedUserDetails(private val userName: String, val role: Role) : Principal {
    override fun getName(): String {
        return userName
    }
}
