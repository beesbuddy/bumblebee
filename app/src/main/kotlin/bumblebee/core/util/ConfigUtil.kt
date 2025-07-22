package bumblebee.core.util

import bumblebee.core.Constants
import bumblebee.core.config.Config
import bumblebee.core.security.AccessControl
import bumblebee.core.security.AccessControl.Type
import bumblebee.core.security.Permission
import bumblebee.core.security.Role
import bumblebee.core.security.User
import bumblebee.db.Acls
import bumblebee.db.DbProvider
import bumblebee.db.Roles
import bumblebee.db.Users
import cn.hutool.core.util.CharsetUtil
import cn.hutool.core.util.StrUtil
import cn.hutool.setting.dialect.Props
import okhttp3.internal.toImmutableList
import org.jetbrains.exposed.v1.core.JoinType
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import kotlin.collections.get


object ConfigUtil {
    fun loadFromSystemProps(configFilePath: String, defaultConfig: Config): Config {
        if (StrUtil.isBlank(configFilePath)) {
            return defaultConfig
        }

        val props = Props.getProp(configFilePath, CharsetUtil.CHARSET_UTF_8)

        return props.toBean(Config::class.java)
    }

    fun <T> loadFromSystemProps(
        classPath: String,
        prefix: String = Constants.APP_CONFIG_PROPS_PRE,
        targetType: Class<T>?,
        defaultValue: T
    ): T {
        val props = Props.getProp(classPath, CharsetUtil.CHARSET_UTF_8)

        return if (props.isEmpty) {
            defaultValue
        } else props.toBean(targetType, prefix)
    }

    fun loadFromDatabase(defaultConfig: Config = Config()): Config {
        return transaction(DbProvider.db) {
            val query = Users
                .join(Roles, JoinType.INNER, Users.roleName, Roles.name)
                .join(Acls, JoinType.LEFT, Roles.name, Acls.roleName)
                .selectAll()

            val grouped = query.groupBy { it[Users.id] }

            val users = grouped.map { (userId, rows) ->
                val first = rows.first()

                val acls = rows.map { row ->
                    row[Acls.scope].let {
                        AccessControl(
                            scope = row[Acls.scope],
                            permission = Permission.from(row[Acls.permission]),
                            type = Type.entries[(row[Acls.type])]
                        )
                    }
                }

                User(userId = userId, userName = first[Users.username], password = first[Users.password], role = Role(
                    name = first[Roles.name],
                    description = first[Roles.description],
                    acl = acls
                ))
            }.toImmutableList()

            defaultConfig.securityConfig.users = users as MutableList<User?>?


            return@transaction defaultConfig
        }
    }
}
