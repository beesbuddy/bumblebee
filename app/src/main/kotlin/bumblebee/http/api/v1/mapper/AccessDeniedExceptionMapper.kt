package bumblebee.http.api.v1.mapper

import jakarta.ws.rs.core.Context
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.core.UriInfo
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider
import java.nio.file.AccessDeniedException

@Provider
class AccessDeniedExceptionMapper : ExceptionMapper<AccessDeniedException?> {
    @Context
    lateinit var uriInfo: UriInfo

    override fun toResponse(exception: AccessDeniedException?): Response {
        val status = Response.Status.FORBIDDEN
        val errorDetails = ApiErrorResponse(
            status = status.statusCode,
            title = status.reasonPhrase,
            message = "You don't have enough permissions to perform this action.",
            path = uriInfo.absolutePath.getPath()
        )
        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build()
    }
}
