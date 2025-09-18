package bumblebee.core.security.token


class AuthenticationTokenRefreshmentException : RuntimeException {
    constructor(message: String?) : super(message)
    constructor(message: String?, cause: Throwable?) : super(message, cause)
}
