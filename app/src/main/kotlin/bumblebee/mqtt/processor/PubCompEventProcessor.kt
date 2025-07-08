package bumblebee.mqtt.processor

import bumblebee.core.event.message.mqtt.PubCompEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttMessageIdVariableHeader


class PubCompEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?,
) : IEventProcessor<MqttMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttMessage) {
        val variableHeader: MqttMessageIdVariableHeader = message.variableHeader() as MqttMessageIdVariableHeader
        val messageId: Int = variableHeader.messageId()
        val clientId: String = NettyUtil.clientId(ctx.channel())
        val userName: String = NettyUtil.userName(ctx.channel())

        store.removeDupPubRelMessage(clientId, messageId)
        eventsWorkersExecutor?.execute(PubCompEventMessage(clientId, userName, messageId), IEventsWorker.Type.PUB_COMP)
    }
}
