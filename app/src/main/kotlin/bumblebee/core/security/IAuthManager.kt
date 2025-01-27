package bumblebee.core.security

interface IAuthManager {
    fun authenticatedUser(userId: String, userName: String, password: String): User? = null
    fun authorized(userId: String, acType: AccessControl.Type, scope: String, permission: Permission) = false

    fun isAuthenticated(userName: String?, password: String?, clientId: String?): Boolean
    fun authorization(clientId: String?, scope: String?, type: AccessControl.Type): Role {
        return Role()
    }

    fun role(roleName: String): Role {
        return Role()
    }
}