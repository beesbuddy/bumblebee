package bumblebee.core.event.message.mqtt

import bumblebee.core.event.message.EventMessage
import bumblebee.core.subscription.Subscription
import com.alibaba.fastjson.JSONObject


data class SubscribeEventMessage(var subscription: Subscription, var userName: String) : EventMessage {
    val clientId: String = subscription.clientId
    val topic: String = subscription.topic

    override fun info(): String {
        return JSONObject.toJSONString(this)
    }
}
