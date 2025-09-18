package bumblebee.core.event.message.mqtt

import bumblebee.core.event.message.EventMessage
import com.alibaba.fastjson.JSONObject


data class PubAckEventMessage(var clientId: String, var userName: String, var messageId: Int) : EventMessage {
    override fun info(): String {
        return JSONObject.toJSONString(this)
    }
}
