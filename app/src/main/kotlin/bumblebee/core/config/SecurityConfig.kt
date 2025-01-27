package bumblebee.core.config

import bumblebee.core.Constants
import bumblebee.core.security.User


data class SecurityConfig(
    var authManagerClass: String = Constants.AUTH_ANONYMOUS,
    var users: MutableList<User?>? = null,
)