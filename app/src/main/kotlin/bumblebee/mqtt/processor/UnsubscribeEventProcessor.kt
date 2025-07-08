package bumblebee.mqtt.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.UnsubscribeEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import cn.hutool.core.collection.CollectionUtil
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttUnsubAckMessage
import io.netty.handler.codec.mqtt.MqttUnsubscribeMessage
import mu.KotlinLogging
import java.util.function.Consumer

private val log = KotlinLogging.logger {}


class UnsubscribeEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?
) : IEventProcessor<MqttUnsubscribeMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttUnsubscribeMessage) {
        val topicList: List<String> = message.payload().topics()
        val channel: Channel = ctx.channel()
        val clientId: String = NettyUtil.clientId(channel)
        val userName: String = NettyUtil.userName(channel)

        if (CollectionUtil.isNotEmpty(topicList)) {
            val clientSession: ClientSession? = store.getSession(clientId)
            if (null != clientSession) {
                topicList.forEach(Consumer { topic: String ->
                    val sub = Subscription(clientId, topic)
                    store.removeSubscription(sub)
                    eventsWorkersExecutor?.execute(
                        UnsubscribeEventMessage(topic, clientId, userName),
                        IEventsWorker.Type.UNSUBSCRIBE
                    )
                })
                val unsubAckResp: MqttUnsubAckMessage =
                    MessageUtil.buildUnsubAckMessage(message.variableHeader().messageId())
                channel.writeAndFlush(unsubAckResp)
            }
        }
    }
}
