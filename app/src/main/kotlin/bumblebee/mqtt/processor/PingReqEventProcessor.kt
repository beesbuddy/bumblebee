package bumblebee.mqtt.processor

import bumblebee.core.event.message.mqtt.PingEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage


class PingReqEventProcessor(private val eventsWorkersExecutor: EventsWorkersExecutor?) : IEventProcessor<MqttMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttMessage) {
        ctx.channel().writeAndFlush(MessageUtil.buildPingRespMessage())

        eventsWorkersExecutor?.execute(
            PingEventMessage(
                NettyUtil.clientId(ctx.channel()),
                NettyUtil.userName(ctx.channel())
            ), IEventsWorker.Type.PING
        )
    }
}
