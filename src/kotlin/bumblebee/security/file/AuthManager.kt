package bumblebee.security.file

import bumblebee.core.config.SecurityConfig
import bumblebee.core.security.*
import bumblebee.core.util.ScopeUtil
import java.util.concurrent.ConcurrentHashMap


class AuthManager(config: SecurityConfig) : AuthManagerProvider(), IAuthManager {
    private val users = ConcurrentHashMap<String, User>()

    init {
        val usersUnsafe = config.users as List<*>

        usersUnsafe.forEach {
            val user: User = if (it is User) {
                it
            } else {
                User.from(it as HashMap<*, *>)
            }

            users[user.userId.toString()] = user
        }
    }

    override fun authenticatedUser(userId: String, userName: String, password: String): User? {
        users[userId]?.let {
            if (PasswordEncoder.checkPassword(password, it.password as String)) {
                return it
            }
        }

        return null
    }

    override fun authorized(userId: String, acType: AccessControl.Type, scope: String, permission: Permission): Boolean {
        users[userId]?.let {
            val ac = it.role?.acl?.filter { ac -> ac.type == acType }?.firstOrNull { ac ->
                ScopeUtil.orMatch(ScopeUtil.getMultipleScopeList(ac.scope ?: ""), ScopeUtil.getScopeList(scope))
            }

            return@authorized (ac?.permission?.ordinal ?: 0) >= permission.ordinal
        }

        return false
    }

    override fun role(roleName: String): Role {
        return users.filter { it.value.role?.name == roleName }.map { it.value.role }.firstOrNull() ?: Role()
    }

    override fun isAuthenticated(userName: String?, password: String?, userId: String?): Boolean {
        if (userName != null && password != null && userId != null) {
            users[userId]?.let {
                if (PasswordEncoder.checkPassword(password, it.password as String)) {
                    return true
                }
            }
        }

        return false
    }

    // TODO: rename to isAuthorized and return true ar false. Plus need to have a permission.  Rename clientId -> userId
    override fun authorization(clientId: String?, scope: String?, type: AccessControl.Type): Role {
        val forbidden = Role()

        if (clientId != null && scope != null) {
            val role = users[clientId.toString()]?.let {
                val ac = it.role?.acl?.filter { ac -> ac.type == type }?.firstOrNull({ ac ->
                    ScopeUtil.orMatch(ScopeUtil.getMultipleScopeList(ac.scope ?: ""), ScopeUtil.getScopeList(scope))
                })

//                ac.permission == Permission.READ

                if (ac != null) {
                    return@let it.role
                } else {
                    return@let forbidden
                }
            }

            return role ?: forbidden
        }

        return forbidden
    }
}