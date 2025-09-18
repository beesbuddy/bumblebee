package bumblebee.core

import bumblebee.core.config.Config
import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.mqtt.store.IStore
import bumblebee.mqtt.processor.ConnectEventProcessor
import bumblebee.mqtt.processor.DisconnectEventProcessor
import bumblebee.mqtt.processor.PingReqEventProcessor
import bumblebee.mqtt.processor.PubAckEventProcessor
import bumblebee.mqtt.processor.PubCompEventProcessor
import bumblebee.mqtt.processor.PubRecEventProcessor
import bumblebee.mqtt.processor.PubRelEventProcessor
import bumblebee.mqtt.processor.PublishEventProcessor
import bumblebee.mqtt.processor.SubscribeEventProcessor
import bumblebee.mqtt.processor.UnsubscribeEventProcessor
import io.netty.buffer.Unpooled
import io.netty.channel.ChannelHandler.Sharable
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.handler.codec.mqtt.*
import mu.KotlinLogging
import java.nio.charset.StandardCharsets
import java.util.concurrent.atomic.AtomicInteger

private val log = KotlinLogging.logger {}


@Sharable
class MqttMessagesDispatcher(
    private val config: Config,
    private val connectEventProcessor: ConnectEventProcessor,
    private val disconnectEventProcessor: DisconnectEventProcessor,
    private val pubAckEventProcessor: PubAckEventProcessor,
    private val pubCompEventProcessor: PubCompEventProcessor,
    private val publishEventProcessor: PublishEventProcessor,
    private val pubRecEventProcessor: PubRecEventProcessor,
    private val pubRelEventProcessor: PubRelEventProcessor,
    private val subscribeEventProcessor: SubscribeEventProcessor,
    private val unsubscribeEventProcessor: UnsubscribeEventProcessor,
    private val pingReqEventProcessor: PingReqEventProcessor,
    private val store: IStore,
) : SimpleChannelInboundHandler<MqttMessage>() {
    private val ai = AtomicInteger()

    override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
        if (ctx != null) {
            if (messageNotDecoded(msg, ctx)) return

            val messageType: MqttMessageType? = msg?.fixedHeader()?.messageType()

            try {
                when (messageType) {
                    MqttMessageType.CONNECT -> connectEventProcessor.process(ctx, msg as MqttConnectMessage)
                    MqttMessageType.DISCONNECT -> disconnectEventProcessor.process(ctx, msg)
                    MqttMessageType.PUBACK -> pubAckEventProcessor.process(ctx, msg as MqttPubAckMessage)
                    MqttMessageType.PUBCOMP -> pubCompEventProcessor.process(ctx, msg)
                    MqttMessageType.PUBLISH -> publishEventProcessor.process(ctx, msg as MqttPublishMessage)
                    MqttMessageType.PUBREC -> pubRecEventProcessor.process(ctx, msg)
                    MqttMessageType.PUBREL -> pubRelEventProcessor.process(ctx, msg)
                    MqttMessageType.SUBSCRIBE -> subscribeEventProcessor.process(ctx, msg as MqttSubscribeMessage)
                    MqttMessageType.UNSUBSCRIBE -> unsubscribeEventProcessor.process(ctx, msg as MqttUnsubscribeMessage)
                    MqttMessageType.PINGREQ -> pingReqEventProcessor.process(ctx, msg)
                    else -> log.error(
                        "Unsupported messageType:{}",
                        messageType
                    )
                }
            } catch (ex: Throwable) {
                log.error("Handle message exception: {}", ex.cause, ex)
                ctx.fireExceptionCaught(ex)
                ctx.close()
            }
        }

    }

    private fun messageNotDecoded(
        msg: MqttMessage?,
        ctx: ChannelHandlerContext
    ): Boolean {
        if (msg?.decoderResult()?.isFailure == true) {
            handleDecoderFailure(ctx, msg)
            return true
        }
        return false
    }

    private fun handleDecoderFailure(ctx: ChannelHandlerContext, msg: MqttMessage) {
        val channel = ctx.channel()
        val cause = msg.decoderResult().cause()

        if (cause is MqttUnacceptableProtocolVersionException) {
            val connAckMessage = MqttMessageFactory.newMessage(
                MqttFixedHeader(
                    MqttMessageType.CONNACK,
                    false,
                    MqttQoS.AT_MOST_ONCE,
                    false,
                    0
                ),
                MqttConnAckVariableHeader(
                    MqttConnectReturnCode.CONNECTION_REFUSED_UNACCEPTABLE_PROTOCOL_VERSION,
                    false
                ),
                null
            ) as MqttConnAckMessage
            channel.writeAndFlush(connAckMessage)
        } else if (cause is MqttIdentifierRejectedException) {
            val connAckMessage = MqttMessageFactory.newMessage(
                MqttFixedHeader(
                    MqttMessageType.CONNACK,
                    false,
                    MqttQoS.AT_MOST_ONCE,
                    false,
                    0
                ), MqttConnAckVariableHeader(MqttConnectReturnCode.CONNECTION_REFUSED_IDENTIFIER_REJECTED, false), null
            ) as MqttConnAckMessage
            channel.writeAndFlush(connAckMessage)
        }

        channel.close()
    }

    fun pubSysTopics() {
        val memory = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1024
        val totalMemory = Runtime.getRuntime().totalMemory() / 1024
        val msqMemoryUsed: CommonPublishMessage = createSysMessage("/memory/used", ai.getAndIncrement(), memory)
        val msqAllocated: CommonPublishMessage =
            createSysMessage("/memory/allocated", ai.getAndIncrement(), totalMemory)
        val msqSessionCount: CommonPublishMessage =
            createSysMessage("/session/count", ai.getAndIncrement(), store.sessionCount.toLong())

        for (msg in setOf(msqMemoryUsed, msqAllocated, msqSessionCount)) {
            publishEventProcessor.publish2Subscribers(msg)
        }

        log.debug("Updating \$SYS topic")
    }

    private fun createSysMessage(path: String, packetId: Int, metric: Long): CommonPublishMessage {
        val msg = MqttMessageBuilders
            .publish()
            .qos(MqttQoS.AT_MOST_ONCE)
            .retained(false)
            .payload(
                Unpooled.copiedBuffer(
                    metric.toString().toByteArray(
                        StandardCharsets.UTF_8
                    )
                )
            ).topicName("${Constants.SYS_TOPIC_NAME}$path").build()

        return CommonPublishMessage.convert(
            msg = msg,
            isWill = false,
            sourceNodeName = config.mqttConfig.nodeName ?: Constants.MASTER_NODE_NAME
        )
    }

    fun close() {
        store.close()
    }
}