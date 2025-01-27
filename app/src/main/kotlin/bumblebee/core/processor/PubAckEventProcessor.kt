package bumblebee.core.processor

import bumblebee.core.event.message.mqtt.PubAckEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.store.mqtt.IDupPubMessageStore
import bumblebee.core.store.mqtt.IStore
import bumblebee.core.util.NettyUtil
import cn.hutool.core.util.StrUtil
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttPubAckMessage


class PubAckEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?,
) : IEventProcessor<MqttPubAckMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttPubAckMessage) {
        val messageId: Int = message.variableHeader().messageId()
        val channel: Channel = ctx.channel()
        val clientId: String = NettyUtil.clientId(channel)
        val userName: String = NettyUtil.userName(channel)

        if (StrUtil.isNotBlank(clientId)) {
            store.removeDupPubMessage(clientId, messageId)
        }

        eventsWorkersExecutor?.execute(PubAckEventMessage(clientId, userName, messageId), IEventsWorker.Type.PUB_ACK)
    }
}
