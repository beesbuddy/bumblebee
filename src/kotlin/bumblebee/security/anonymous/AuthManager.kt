package bumblebee.security.anonymous

import bumblebee.core.config.SecurityConfig
import bumblebee.core.security.*


class AuthManager(private val config: SecurityConfig) : AuthManagerProvider(), IAuthManager {
    override fun isAuthenticated(userName: String?, password: String?, clientId: String?): Boolean {
        return true
    }

    override fun authorization(clientId: String?, scope: String?, type: AccessControl.Type): Role {
        return Role.createReadOnly()
    }
}