package bumblebee.core.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.event.message.mqtt.PublishEventMessage
import bumblebee.core.inner.traffic.IInnerTraffic
import bumblebee.core.inner.traffic.NoopInnerTraffic
import bumblebee.core.security.AccessControl
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.security.IAuthManager
import bumblebee.core.security.Permission
import bumblebee.core.store.mqtt.*
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import bumblebee.core.util.Stopwatch
import cn.hutool.core.collection.CollUtil
import cn.hutool.core.util.StrUtil
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.*
import mu.KotlinLogging

private val log = KotlinLogging.logger {}


class PublishEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?,
    private val nodeName: String,
    private var innerTraffic: IInnerTraffic = NoopInnerTraffic(nodeName),
    private val authManager: IAuthManager
) : IEventProcessor<MqttPublishMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttPublishMessage) {
        val channel = ctx.channel()
        val clientId: String = NettyUtil.clientId(channel)
        val userName: String = NettyUtil.userName(channel)
        val remoteIp = NettyUtil.getRemoteIp(channel)
        val pubMsg: CommonPublishMessage = CommonPublishMessage.convert(message, false, nodeName)
        val stopwatch: Stopwatch = Stopwatch.start()

        val scope = message.variableHeader().topicName()

        val authorized = authManager.authorized(clientId, AccessControl.Type.MQTT, scope, Permission.WRITE)

        if (!authorized) {
            channel.flush()

            log.warn(
                "Unauthorized user: clientId={}, userName={}, remoteIp={}", clientId, userName, remoteIp
            )
            return
        }

        try {
            innerTraffic.publish(pubMsg)

            log.debug(
                "Publishing message to inner traffic: clientId={}, userName={}, topic={}",
                clientId,
                userName,
                pubMsg.topic
            )
        } catch (ex: Exception) {
            log.error("Process inner traffic publish error.", ex)
        }

        val packetId: Int = message.variableHeader().packetId()
        val msgQoS: MqttQoS = MqttQoS.valueOf(pubMsg.mqttQoS)
        var validQos = true

        when (msgQoS) {
            MqttQoS.AT_MOST_ONCE -> {
                publish2Subscribers(pubMsg)
                handleRetainMessage(pubMsg)

            }
            MqttQoS.AT_LEAST_ONCE -> {
                publish2Subscribers(pubMsg)
                handleRetainMessage(pubMsg)
                val pubAckResp: MqttPubAckMessage = MessageUtil.buildPubAckMessage(packetId)
                ctx.channel().writeAndFlush(pubAckResp)

            }
            MqttQoS.EXACTLY_ONCE -> {
                publish2Subscribers(pubMsg)
                handleRetainMessage(pubMsg)
                val pubRecResp: MqttMessage = MessageUtil.buildPubRecMessage(packetId)
                ctx.channel().writeAndFlush(pubRecResp)
            }
            else -> validQos = false
        }

        log.debug(
            "Published message: pubClientId={}, userName={}, topic={}, messageId={}, message={}, qos={}, nodeName={}, timeCost={}ms",
            clientId,
            userName,
            pubMsg.topic,
            pubMsg.messageId,
            pubMsg.messageBody,
            pubMsg.mqttQoS,
            nodeName,
            stopwatch.elapsedMills()
        )

        if (validQos) {
            eventsWorkersExecutor?.execute(
                PublishEventMessage(message.copy(), clientId, userName), IEventsWorker.Type.PUBLISH
            )
        }
    }

    fun publish2Subscribers(pubMsg: CommonPublishMessage) {
        val matchSubList: List<Subscription?>? = store.matchSubscription(pubMsg.topic)
        if (CollUtil.isNotEmpty(matchSubList)) {
            for (sub in matchSubList!!) {
                if (null != sub) {
                    publish2Subscriber(sub, pubMsg)
                }
            }
        }
    }

    fun publish2Subscriber(sub: Subscription, pubMsg: CommonPublishMessage) {
        val start: Stopwatch = Stopwatch.start()

        try {
            if (doPublish2Subscriber(sub, pubMsg)) {
                log.debug(
                    "Publishing to subscriber success: targetClientId={}, topic={}, timeCost={}ms",
                    sub.clientId,
                    pubMsg.topic,
                    start.elapsedMills()
                )
            }
        } catch (ex: Throwable) {
            log.error(
                "Publishing to subscriber failure: targetClientId={}, topic={}, timeCost={}ms",
                sub.clientId,
                pubMsg.topic,
                start.elapsedMills(),
                ex
            )
        }
    }

    private fun doPublish2Subscriber(sub: Subscription, commonPubMsg: CommonPublishMessage): Boolean {
        val targetClientId: String = sub.clientId
        val targetSession: ClientSession? = store.getSession(targetClientId)
        val msgQoS: MqttQoS = MqttQoS.valueOf(MessageUtil.getMinQos(commonPubMsg.mqttQoS, sub.qos.value()))
        val mqttPubMsg: MqttPublishMessage
        var messageId = 0

        if (targetSession != null) {
            when (msgQoS) {
                MqttQoS.AT_MOST_ONCE -> {
                    mqttPubMsg = CommonPublishMessage.buildPubMsg(commonPubMsg, msgQoS, messageId)
                    targetSession.sendMsg(mqttPubMsg)
                }

                MqttQoS.AT_LEAST_ONCE, MqttQoS.EXACTLY_ONCE -> {
                    messageId = store.getNextMessageId(targetClientId)

                    store.addDupPubMessage(commonPubMsg.copy().apply {
                        this.targetClientId = targetClientId
                        this.messageId = messageId
                    })

                    mqttPubMsg = CommonPublishMessage.buildPubMsg(commonPubMsg, msgQoS, messageId)
                    targetSession.sendMsg(mqttPubMsg)
                }

                else -> log.error(
                    "Publishing error - invalid mqtt qos: targetClientId={}, topic={}, qos={}",
                    targetClientId,
                    commonPubMsg.topic,
                    commonPubMsg.mqttQoS
                )
            }
            return true
        }

        return false

    }

    private fun handleRetainMessage(pubMsg: CommonPublishMessage) {
        if (!pubMsg.isRetain) {
            return
        }

        if (pubMsg.isWill) {
            store.addRetain(pubMsg.copy())
            return
        }

        if (StrUtil.isEmpty(pubMsg.messageBody)) {
            store.removeRetain(pubMsg.topic)
            return
        }

        store.addRetain(pubMsg.copy())
    }
}
