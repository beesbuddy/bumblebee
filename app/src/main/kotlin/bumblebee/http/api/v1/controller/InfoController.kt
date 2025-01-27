package bumblebee.http.api.v1.controller

import bumblebee.core.Constants
import bumblebee.core.config.Config
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONObject
import jakarta.annotation.security.PermitAll
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response


@Path(InfoController.PATH)
class InfoController {
    @Inject
    lateinit var config: Config

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    fun info(): Response {
        val info = JSONObject()
        info["name"] = Constants.APP_NAME
        info["version"] = config.version
        return Response.ok()
            .entity(JSON.toJSONString(info))
            .build()
    }

    companion object {
        const val PATH = "${Constants.API_V1_PATH}/info"
    }
}
