package bumblebee.core.event.message.mqtt

import bumblebee.core.util.MessageUtil
import com.alibaba.fastjson.JSONObject
import io.netty.buffer.ByteBuf
import io.netty.handler.codec.mqtt.MqttPublishMessage


class PublishEventMessage(
    private var msg: MqttPublishMessage,
    var clientId: String,
    var userName: String,
    var elapsedMills: Long = -1
) : AbstractEventMessage(msg) {
    val topic: String
        get() = msg.variableHeader().topicName()
    internal val payload: ByteBuf
        get() = msg.payload()

    override fun info(): String {
        val obj = JSONObject()
        obj["clientId"] = clientId
        obj["userName"] = userName
        obj["topic"] = topic
        obj["payload"] = String(MessageUtil.readBytesAndRewind(payload))
        return obj.toJSONString()
    }
}
