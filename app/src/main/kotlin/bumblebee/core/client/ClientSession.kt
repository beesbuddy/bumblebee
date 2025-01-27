package bumblebee.core.client

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import cn.hutool.core.date.DatePattern
import cn.hutool.core.date.DateUtil
import cn.hutool.core.util.StrUtil
import io.netty.channel.Channel
import io.netty.handler.codec.mqtt.MqttPublishMessage
import java.io.Serializable
import java.util.*


class ClientSession(
    private val channel: Channel,
    val clientId: String,
    val userName: String,
    val cleanSession: Boolean,
    private val willMessage: MqttPublishMessage?,
    private val keepAliveTimeSeconds: Int = 30,
    private val createTimeStr: String = DateUtil.format(
        Date(), DatePattern.PURE_DATETIME_PATTERN
    )
) : Serializable {

    fun isSameChannel(comparedChannel: Channel): Boolean {
        return channel === comparedChannel
    }

    fun closeChannel() {
        channel.close()
    }

    fun sendMsg(msg: Any?) {
        channel.writeAndFlush(msg)
    }

    val pubMsgForWillMessage: CommonPublishMessage?
        get() = if (willMessage == null) {
            null
        } else CommonPublishMessage.convert(willMessage, true, StrUtil.EMPTY).apply {
            this.createTimeStr = this@ClientSession.createTimeStr
        }

}
