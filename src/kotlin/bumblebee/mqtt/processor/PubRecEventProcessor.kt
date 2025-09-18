package bumblebee.mqtt.processor

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.event.message.mqtt.PubRecEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import cn.hutool.core.util.StrUtil
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttMessageIdVariableHeader


class PubRecEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?,
) : IEventProcessor<MqttMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttMessage) {
        val channel: Channel = ctx.channel()
        val clientId: String = NettyUtil.clientId(channel)
        val userName: String = NettyUtil.userName(channel)
        val variableHeader: MqttMessageIdVariableHeader = message.variableHeader() as MqttMessageIdVariableHeader
        val messageId: Int = variableHeader.messageId()

        if (StrUtil.isNotBlank(clientId)) {
            val pubMsg: CommonPublishMessage? = store.getDupPubMessage(clientId, messageId)
            if (null != pubMsg) {
                store.removeDupPubMessage(clientId, messageId)
                store.addDupPubRelMessage(pubMsg.copy())
            }
        }

        val pubRelResp: MqttMessage = MessageUtil.buildPubRelMessage(messageId, false)
        channel.writeAndFlush(pubRelResp)
        eventsWorkersExecutor?.execute(PubRecEventMessage(clientId, userName, messageId), IEventsWorker.Type.PUB_REC)
    }
}
