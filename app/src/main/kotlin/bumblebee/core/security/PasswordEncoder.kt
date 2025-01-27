package bumblebee.core.security

import org.mindrot.jbcrypt.BCrypt


class PasswordEncoder {
    companion object {
        fun hashPassword(plainTextPassword: String?): String {
            val salt: String? = BCrypt.gensalt()
            return BCrypt.hashpw(plainTextPassword, salt)
        }

        fun checkPassword(plainTextPassword: String?, hashedPassword: String?): Boolean {
            if (hashedPassword == null || !hashedPassword.startsWith("$2a$")) {
                return false
            }
            return BCrypt.checkpw(plainTextPassword, hashedPassword)
        }
    }

}
