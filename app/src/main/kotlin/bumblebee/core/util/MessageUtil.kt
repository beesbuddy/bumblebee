package bumblebee.core.util

import cn.hutool.core.util.ArrayUtil
import io.netty.buffer.ByteBuf
import io.netty.handler.codec.mqtt.*
import kotlin.math.min


object MessageUtil {
    fun getMinQos(qos1: Int, qos2: Int): Int {
        return min(qos1.toDouble(), qos2.toDouble()).toInt()
    }
    
    fun buildConnectAckMessage(
        returnCode: MqttConnectReturnCode?,
        sessionPresent: Boolean = false
    ): MqttConnAckMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.CONNACK, false, MqttQoS.AT_MOST_ONCE, false, 0)
        val variableHeader = MqttConnAckVariableHeader(returnCode, sessionPresent)
        return MqttConnAckMessage(fixedHeader, variableHeader)
    }

    fun buildSubAckMessage(messageId: Int, qosList: List<Int?>?): MqttMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.SUBACK, false, MqttQoS.AT_MOST_ONCE, false, 0)
        val idVariableHeader = MqttMessageIdVariableHeader.from(messageId)
        val subAckPayload = MqttSubAckPayload(qosList)
        return MqttSubAckMessage(fixedHeader, idVariableHeader, subAckPayload)
    }

    fun buildPubAckMessage(messageId: Int): MqttPubAckMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.PUBACK, false, MqttQoS.AT_MOST_ONCE, false, 0)
        val idVariableHeader = MqttMessageIdVariableHeader.from(messageId)
        return MqttPubAckMessage(fixedHeader, idVariableHeader)
    }

    fun buildPubRecMessage(messageId: Int): MqttMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.PUBREC, false, MqttQoS.AT_MOST_ONCE, false, 0)
        return MqttMessage(fixedHeader, MqttMessageIdVariableHeader.from(messageId))
    }

    fun buildPubCompMessage(messageId: Int): MqttMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.PUBCOMP, false, MqttQoS.AT_MOST_ONCE, false, 0)
        return MqttMessage(fixedHeader, MqttMessageIdVariableHeader.from(messageId))
    }

    fun buildPubRelMessage(messageId: Int, isDup: Boolean): MqttMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.PUBREL, isDup, MqttQoS.AT_MOST_ONCE, false, 0)
        val idVariableHeader = MqttMessageIdVariableHeader.from(messageId)
        return MqttMessage(fixedHeader, idVariableHeader)
    }

    fun buildUnsubAckMessage(messageId: Int): MqttUnsubAckMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.UNSUBACK, false, MqttQoS.AT_MOST_ONCE, false, 0)
        val idVariableHeader = MqttMessageIdVariableHeader.from(messageId)
        return MqttUnsubAckMessage(fixedHeader, idVariableHeader)
    }

    fun buildPingRespMessage(): MqttMessage {
        val fixedHeader = MqttFixedHeader(MqttMessageType.PINGRESP, false, MqttQoS.AT_MOST_ONCE, false, 0)
        return MqttMessage(fixedHeader)
    }

    fun readBytesAndRewind(payload: ByteBuf): ByteArray {
        val payloadContent = ByteArray(payload.readableBytes())
        val mark = payload.readerIndex()
        payload.readBytes(payloadContent)
        payload.readerIndex(mark)
        return payloadContent
    }

    fun copy(bytes: ByteArray): ByteArray {
        val copyBytes = ByteArray(bytes.size)
        ArrayUtil.copy(bytes, copyBytes, bytes.size)
        return copyBytes
    }
}

