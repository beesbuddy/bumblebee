package bumblebee.core.security

import bumblebee.core.Constants
import bumblebee.core.util.ScopeUtil


data class Role(
    val acl: List<AccessControl> = listOf(),
    val name: String? = Constants.ROLE_FORBIDDEN,
    val description: String? = null,
) {
//    fun canRead(scope: String): Boolean {
//        return acl.filter { ScopeUtil.orMatch(ScopeUtil.getMultipleScopeList(it.scope ?: ""), ScopeUtil.getScopeList(scope)) }.fold(false) { acc, ac ->
//            acc || ac.permission == Permission.UPDATE
//                    || ac.permission == Permission.WRITE
//                    || ac.permission == Permission.DELETE
//                    || ac.permission == Permission.READ
//        }
//    }
//
//    fun canDelete(scope: String): Boolean {
//        return acl.filter { it.scope == scope }.fold(false) { acc, ac ->
//            acc || ac.permission == Permission.UPDATE || ac.permission == Permission.DELETE
//        }
//    }
//
//    fun canWrite(scope: String): Boolean {
//        return acl.filter { it.scope == scope }.fold(false) { acc, ac ->
//            acc || ac.permission == Permission.WRITE
//                    || ac.permission == Permission.DELETE
//                    || ac.permission == Permission.UPDATE
//        }
//    }
//
//    fun canUpdate(scope: String): Boolean {
//        return acl.filter { it.scope == scope }.fold(false) { acc, ac ->
//            acc || ac.permission == Permission.UPDATE
//        }
//    }

    companion object {
        fun from(map: HashMap<*, *>): Role {
            val aclListUnsafe = map["acl"] as List<*>

            val acl = aclListUnsafe.map {
                val ac: AccessControl = if (it is AccessControl) {
                    it
                } else {
                    AccessControl.from(it as HashMap<*, *>)
                }

                ac
            }

            return Role(
                name = map["name"] as String,
                description = map["description"] as String,
                acl = acl,
            )
        }

        fun createReadOnly(): Role {
            return Role(
                acl = listOf(
                    AccessControl(scope = "#", permission = Permission.READ, type = AccessControl.Type.MQTT),
                    AccessControl(scope = "#", permission = Permission.READ, type = AccessControl.Type.WEB)
                ), name = Constants.READ_ONLY_ROLE, description = "Read only role")
        }
    }
}