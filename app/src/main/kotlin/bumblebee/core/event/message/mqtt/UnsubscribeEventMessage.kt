package bumblebee.core.event.message.mqtt

import bumblebee.core.event.message.EventMessage
import com.alibaba.fastjson.JSONObject


data class UnsubscribeEventMessage(var topic: String, var clientId: String, var userName: String) : EventMessage {
    override fun info(): String {
        return JSONObject.toJSONString(this)
    }
}
