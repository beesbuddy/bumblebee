package bumblebee.core.event.message.mqtt

import com.alibaba.fastjson.JSONObject
import io.netty.handler.codec.mqtt.MqttConnectMessage


class ConnectEventMessage(private val msg: MqttConnectMessage) : AbstractEventMessage(msg) {
    val clientId: String
        get() = msg.payload().clientIdentifier()
    val isCleanSession: Boolean
        get() = msg.variableHeader().isCleanSession
    val keepAlive: Int
        get() = msg.variableHeader().keepAliveTimeSeconds()
    val isPasswordFlag: Boolean
        get() = msg.variableHeader().hasPassword()
    val protocolVersion: Byte
        get() = msg.variableHeader().version().toByte()
    val protocolName: String
        get() = msg.variableHeader().name()
    val isUserFlag: Boolean
        get() = msg.variableHeader().hasUserName()
    val isWillFlag: Boolean
        get() = msg.variableHeader().isWillFlag
    val willQos: Byte
        get() = msg.variableHeader().willQos().toByte()
    val isWillRetain: Boolean
        get() = msg.variableHeader().isWillRetain
    val userName: String?
        get() = msg.payload().userName()
    val password: ByteArray?
        get() = msg.payload().passwordInBytes()
    val willTopic: String
        get() = msg.payload().willTopic()
    val willMessage: ByteArray
        get() = msg.payload().willMessageInBytes()

    override fun info(): String {
        val obj = JSONObject()
        obj["clientId"] = clientId
        obj["userName"] = userName
        return obj.toJSONString()
    }
}
