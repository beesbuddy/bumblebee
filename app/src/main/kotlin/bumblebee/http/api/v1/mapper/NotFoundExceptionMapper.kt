package bumblebee.http.api.v1.mapper

import jakarta.ws.rs.NotFoundException
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider


@Suppress("UNUSED_PARAMETER")
@Provider
class NotFoundExceptionMapper : ExceptionMapper<NotFoundException> {
    override fun toResponse(exception: NotFoundException): Response {
        val json = """{ "error": "Resource not found", "status": 404 }"""
        return Response.status(Response.Status.NOT_FOUND)
            .entity(json)
            .type("application/json")
            .build()
    }
}
