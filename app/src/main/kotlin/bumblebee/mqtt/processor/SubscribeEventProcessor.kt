package bumblebee.mqtt.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.event.message.mqtt.SubscribeEventMessage
import bumblebee.core.security.AccessControl
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.security.IAuthManager
import bumblebee.core.security.Permission
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import cn.hutool.core.collection.CollUtil
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttQoS
import io.netty.handler.codec.mqtt.MqttSubscribeMessage
import io.netty.handler.codec.mqtt.MqttTopicSubscription
import mu.KotlinLogging
import java.util.function.Consumer

private val log = KotlinLogging.logger {}


class SubscribeEventProcessor(
    private val store: IStore,
    private val publishEventProcessor: PublishEventProcessor,
    private val eventListenerExecutor: EventsWorkersExecutor?,
    private val authManager: IAuthManager
) : IEventProcessor<MqttSubscribeMessage> {

    override fun process(ctx: ChannelHandlerContext, message: MqttSubscribeMessage) {
        val channel: Channel = ctx.channel()
        val topicSubList: List<MqttTopicSubscription> = message.payload().topicSubscriptions()
        val clientId: String = NettyUtil.clientId(channel)
        val clientSession: ClientSession? = store.getSession(clientId)

        if (null != clientSession) {
            val mqttQoSList = ArrayList<Int>()

            topicSubList.forEach(Consumer { topicSub: MqttTopicSubscription ->
                val topic: String = topicSub.topicFilter()
                val userName: String = NettyUtil.userName(channel)
                val remoteIp: String = NettyUtil.getRemoteIp(channel)

                val authorized = authManager.authorized(clientId, AccessControl.Type.MQTT, topic, Permission.READ)

                if (authorized) {
                    val mqttQoS: MqttQoS = topicSub.qualityOfService()
                    val subscription = Subscription(clientId, topic, mqttQoS)
                    val addSuccess: Boolean = store.addSubscription(subscription)

                    if (addSuccess) {
                        eventListenerExecutor?.execute(
                            SubscribeEventMessage(subscription, userName),
                            IEventsWorker.Type.SUBSCRIBE
                        )
                    }

                    mqttQoSList.add(if (addSuccess) mqttQoS.value() else MqttQoS.FAILURE.value())

                    val ackResp: MqttMessage = MessageUtil.buildSubAckMessage(message.variableHeader().messageId(), mqttQoSList)
                    channel.writeAndFlush(ackResp)
                } else {
                    log.warn(
                        "Unauthorized user: clientId={}, userName={}, remoteIp={}, topicName={}",
                        clientId, userName, remoteIp, topic
                    )

                    val ackResp: MqttMessage = MessageUtil.buildSubAckMessage(message.variableHeader().messageId(), listOf(MqttQoS.FAILURE.value()))
                    channel.writeAndFlush(ackResp)
                }
            })

            topicSubList.forEach(Consumer { topicSub: MqttTopicSubscription ->
                val topic: String = topicSub.topicFilter()
                val mqttQoS: MqttQoS = topicSub.qualityOfService()
                sendRetainMessage(Subscription(clientId, topic, mqttQoS))
            })
        } else {
            channel.close()
        }
    }

    private fun sendRetainMessage(sub: Subscription) {
        val retainMsgList: List<CommonPublishMessage?> = store.matchRetains(sub.topic)

        if (CollUtil.isNotEmpty(retainMsgList)) {
            for (retainMessage in retainMsgList) {
                if (retainMessage != null) {
                    publishEventProcessor.publish2Subscriber(sub, retainMessage)
                }
            }
        }
    }
}
