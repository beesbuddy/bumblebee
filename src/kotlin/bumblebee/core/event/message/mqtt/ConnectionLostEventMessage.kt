package bumblebee.core.event.message.mqtt

import bumblebee.core.event.message.EventMessage
import com.alibaba.fastjson.JSONObject


data class ConnectionLostEventMessage(val clientId: String, val userName: String) : EventMessage {
    override fun info(): String {
        return JSONObject.toJSONString(this)
    }
}
