package bumblebee.mqtt.processor

import bumblebee.core.event.message.mqtt.PubRelEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttMessageIdVariableHeader


class PubRelEventProcessor(private val eventsWorkersExecutor: EventsWorkersExecutor?) : IEventProcessor<MqttMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttMessage) {
        val clientId: String = NettyUtil.clientId(ctx.channel())
        val userName: String = NettyUtil.userName(ctx.channel())
        val variableHeader: MqttMessageIdVariableHeader = message.variableHeader() as MqttMessageIdVariableHeader
        val messageId: Int = variableHeader.messageId()
        ctx.channel().writeAndFlush(MessageUtil.buildPubCompMessage(messageId))

        eventsWorkersExecutor?.execute(PubRelEventMessage(clientId, userName, messageId), IEventsWorker.Type.PUB_REL)
    }
}
