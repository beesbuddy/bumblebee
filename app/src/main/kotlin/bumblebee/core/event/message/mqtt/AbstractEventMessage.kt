package bumblebee.core.event.message.mqtt

import bumblebee.core.event.message.EventMessage
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttQoS


abstract class AbstractEventMessage protected constructor(msg: MqttMessage) : EventMessage {
    private val isRetain: Boolean
    private val isDup: Boolean
    private val mqttQoS: MqttQoS

    init {
        val fixedHeader = msg.fixedHeader()
        isRetain = fixedHeader.isRetain
        isDup = fixedHeader.isDup
        mqttQoS = fixedHeader.qosLevel()
    }
}
