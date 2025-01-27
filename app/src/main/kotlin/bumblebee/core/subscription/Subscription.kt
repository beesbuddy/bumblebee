package bumblebee.core.subscription

import cn.hutool.core.date.DatePattern
import cn.hutool.core.date.DateUtil
import com.alibaba.fastjson.JSON
import io.netty.handler.codec.mqtt.MqttQoS
import java.io.Serializable
import java.util.*


class Subscription(
    val clientId: String,
    val topic: String,
    val qos: MqttQoS = MqttQoS.AT_LEAST_ONCE,
    private val createTimeStr: String = DateUtil.format(
        Date(), DatePattern.PURE_DATETIME_PATTERN
    )
) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) {
            return true
        }
        if (other == null || javaClass != other.javaClass) {
            return false
        }
        val that = other as Subscription
        return clientId == that.clientId && topic == that.topic
    }

    override fun hashCode(): Int {
        return Objects.hash(clientId, topic)
    }

    override fun toString(): String {
        return JSON.toJSONString(this)
    }
}
