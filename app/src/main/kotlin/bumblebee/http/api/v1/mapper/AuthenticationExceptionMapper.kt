package bumblebee.http.api.v1.mapper

import bumblebee.core.security.AuthenticationException
import jakarta.ws.rs.core.Context
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.core.UriInfo
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider


@Provider
class AuthenticationExceptionMapper : ExceptionMapper<AuthenticationException> {
    @Context
    lateinit var uriInfo: UriInfo

    override fun toResponse(exception: AuthenticationException): Response {
        val status = Response.Status.FORBIDDEN
        val errorDetails = ApiErrorResponse(
            status = status.statusCode,
            title = status.reasonPhrase,
            message = exception.message,
            path = uriInfo.absolutePath.getPath()
        )
        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build()
    }
}
