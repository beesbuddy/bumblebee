package bumblebee.core.event.message.mqtt

import bumblebee.core.Constants
import bumblebee.core.util.MessageUtil
import cn.hutool.core.date.DatePattern
import cn.hutool.core.date.DateUtil
import com.alibaba.fastjson.JSON
import io.netty.buffer.Unpooled
import io.netty.handler.codec.mqtt.*
import java.io.Serializable
import java.util.*


class CommonPublishMessage(
    var targetClientId: String? = null,
    var topic: String,
    var messageId: Int = 0,
    var messageBody: String? = null,
    var mqttQoS: Int = 0,
    var isRetain: Boolean = false,
    var isWill: Boolean = false,
    var createTimeStr: String = DateUtil.format(Date(), DatePattern.PURE_DATETIME_PATTERN),
    var sourceNodeName: String? = null,
) : Serializable {

    fun copy(): CommonPublishMessage {
        return CommonPublishMessage(
            topic = topic,
            messageId = messageId,
            messageBody = messageBody,
            mqttQoS = mqttQoS,
            isRetain = isRetain,
            isWill = isWill,
            createTimeStr = createTimeStr,
            sourceNodeName = sourceNodeName
        )
    }

    override fun toString(): String {
        return JSON.toJSONString(this)
    }

    companion object {
        fun of(sourceNodeName: String?, messageId: Int, subTopic: String, payload: String?): CommonPublishMessage {
            return CommonPublishMessage(
                topic = "${Constants.SYS_TOPIC_NAME}/${subTopic}",
                messageId = messageId,
                messageBody = payload,
                mqttQoS = 0,
                isRetain = true,
                isWill = false,
                sourceNodeName = sourceNodeName
            )
        }

        fun convert(msg: MqttPublishMessage, isWill: Boolean, sourceNodeName: String?): CommonPublishMessage {
            return CommonPublishMessage(
                topic = msg.variableHeader().topicName(),
                messageId = msg.variableHeader().packetId(),
                messageBody = String(MessageUtil.readBytesAndRewind(msg.payload())),
                mqttQoS = msg.fixedHeader().qosLevel().value(),
                isRetain = msg.fixedHeader().isRetain,
                isWill = isWill,
                sourceNodeName = sourceNodeName
            )
        }

        fun buildPubMsg(msg: CommonPublishMessage, qos: MqttQoS?, messageId: Int): MqttPublishMessage {
            val fixedHeader = MqttFixedHeader(MqttMessageType.PUBLISH, false, qos, msg.isRetain, 0)
            val variableHeader = MqttPublishVariableHeader(msg.topic, messageId)

            return MqttPublishMessage(
                fixedHeader,
                variableHeader,
                Unpooled.buffer().writeBytes(msg.messageBody?.toByteArray())
            )
        }
    }
}
