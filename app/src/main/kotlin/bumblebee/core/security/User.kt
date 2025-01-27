package bumblebee.core.security


data class User(
    var userId: String? = null,
    var userName: String? = null,
    var password: String? = null,
    var role: Role? = null,
) {
    companion object {
        infix fun from(map: HashMap<*, *>): User {
            return User(
                userId = map["userId"] as String,
                userName = map["userName"] as String,
                password = map["password"] as String,
                role = Role.from(map["role"] as HashMap<*, *>),
            )
        }
    }
}
