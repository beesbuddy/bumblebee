package bumblebee.core.security


data class AccessControl(var scope: String? = null, var permission: Permission? = Permission.NONE, var type: Type) {
    companion object {
        fun from(map: HashMap<*, *>): AccessControl {
            return AccessControl(
                scope = map["scope"] as String,
                permission = Permission.from(map["permission"] as String),
                type = Type.entries[(map["type"] as String).toInt()]
            )
        }
    }

    enum class Type {
        NONE,
        MQTT,
        WEB;
    }
}

enum class Permission(val value: String) {
    NONE("none"),
    READ("read"),
    WRITE("write"),
    DELETE("delete"),
    UPDATE("update");

    companion object {
        fun from(value: String): Permission = entries.firstOrNull { it.value == value.lowercase() } ?: NONE
    }
}
