package bumblebee.http.api.v1.controller

import bumblebee.core.Constants
import bumblebee.core.config.Config
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONObject
import jakarta.annotation.security.RolesAllowed
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response


@Path(AdminController.PATH)
class AdminController {
    @Inject
    lateinit var config: Config

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("superadmin")
    fun module(): Response {
        val info = JSONObject()
        info["module"] = "ADMIN"
        info["version"] = config.version
        return Response.ok()
            .entity(JSON.toJSONString(info))
            .build()
    }

    companion object {
        const val PATH = "${Constants.API_V1_PATH}/admin"
    }
}