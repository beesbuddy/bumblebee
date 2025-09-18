package bumblebee.http.api.v1.mapper

import bumblebee.core.security.token.AuthenticationTokenRefreshmentException
import jakarta.ws.rs.core.Context
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.core.UriInfo
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider


@Suppress("UNUSED_PARAMETER")
@Provider
class AuthenticationTokenRefreshmentExceptionMapper : ExceptionMapper<AuthenticationTokenRefreshmentException?> {
    @Context
    lateinit var uriInfo: UriInfo

    override fun toResponse(exception: AuthenticationTokenRefreshmentException?): Response {
        val status = Response.Status.FORBIDDEN
        val errorDetails = ApiErrorResponse(
            status = status.statusCode,
            title = status.reasonPhrase,
            message = "The authentication token cannot be refreshed.",
            path = uriInfo.absolutePath.getPath(),
        )
        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build()
    }
}
