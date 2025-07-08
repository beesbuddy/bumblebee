package bumblebee.core.processor

import bumblebee.core.Constants
import bumblebee.core.client.ClientSession
import bumblebee.core.inner.traffic.IInnerTraffic
import bumblebee.core.security.*
import bumblebee.core.store.mqtt.*
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.NettyUtil
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.mqtt.processor.PublishEventProcessor
import io.netty.buffer.Unpooled
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.channel.embedded.EmbeddedChannel
import io.netty.handler.codec.mqtt.*
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.*
import java.nio.charset.StandardCharsets
import kotlin.test.assertEquals

private const val HANDLER_ON_PUBLISH = "onPublishHandler"
private const val CLIENT_ID = "clientId"
private const val TOPIC = "test"


class PublishEventProcessorTest {
    lateinit var store: IStore
    lateinit var eventsWorkersExecutor: EventsWorkersExecutor
    lateinit var authManager: IAuthManager
    lateinit var innerTraffic: IInnerTraffic
    private lateinit var targetClientSession: ClientSession
    private lateinit var ec: EmbeddedChannel

    @BeforeEach
    fun setUp() {
        store = Mockito.mock()
        eventsWorkersExecutor = Mockito.mock()
        authManager = Mockito.mock()
        innerTraffic = Mockito.mock()
        targetClientSession = Mockito.mock()

        ec = EmbeddedChannel()
        ec.pipeline().addLast(HANDLER_ON_PUBLISH, object : SimpleChannelInboundHandler<MqttMessage>() {
            override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
                if (msg is MqttPublishMessage && ctx != null) {
                    PublishEventProcessor(
                        store = store,
                        authManager = authManager,
                        eventsWorkersExecutor = eventsWorkersExecutor,
                        nodeName = Constants.MASTER_NODE_NAME,
                        innerTraffic = innerTraffic,
                    ).process(ctx, msg)
                }
            }
        })
        ec.config().writeBufferLowWaterMark = 5
        ec.config().writeBufferHighWaterMark = 10

        NettyUtil.clientId(ec.pipeline().channel(), Constants.CLIENT_ID)
        NettyUtil.userName(ec.pipeline().channel(), Constants.USER_NAME)
    }

    @Test
    fun `when publish at most once message then handle message`() = runTest {
        Mockito.`when`(
            authManager.authorized(
                userId = CLIENT_ID,
                scope = TOPIC,
                acType = AccessControl.Type.MQTT,
                permission = Permission.WRITE
            )
        ).thenReturn(true)
        Mockito.`when`(store.matchSubscription(TOPIC))
            .thenReturn(listOf(Subscription(clientId = CLIENT_ID, topic = TOPIC)))
        Mockito.`when`(store.getSession(CLIENT_ID)).thenReturn(targetClientSession)

        val msg = MqttMessageBuilders.publish()
            .topicName(TOPIC)
            .messageId(1)
            .retained(true)
            .qos(MqttQoS.AT_MOST_ONCE)
            .payload(
                Unpooled.copiedBuffer(
                    "payload".toByteArray(
                        StandardCharsets.UTF_8
                    )
                )
            )
            .build()

        // Invoke on publish event
        ec.writeInbound(msg)

        val response = ec.readOutbound<Any>()
        // On publish we are not returning any message if QoS is 0
        assertNull(response)
        verify(innerTraffic, times(1)).publish(any())
        verify(store, times(1)).getSession(CLIENT_ID)
        verify(targetClientSession, times(1)).sendMsg(argThat { msgForSub ->
            msgForSub is MqttPublishMessage && msgForSub.variableHeader().topicName() == TOPIC
        })
        verify(store, times(0)).getNextMessageId(any())
        verify(store, times(0)).addDupPubMessage(any())
        verify(store, times(1)).addRetain(any())
        verify(eventsWorkersExecutor, times(1)).execute(any(), eq(IEventsWorker.Type.PUBLISH))
    }

    @Test
    fun `when publish at least once message then handle message`() = runTest {
        Mockito.`when`(
            authManager.authorized(
                userId = CLIENT_ID,
                scope = TOPIC,
                acType = AccessControl.Type.MQTT,
                permission = Permission.WRITE
            )
        ).thenReturn(true)
        Mockito.`when`(store.matchSubscription(TOPIC))
            .thenReturn(listOf(Subscription(clientId = CLIENT_ID, topic = TOPIC)))
        Mockito.`when`(store.getSession(CLIENT_ID)).thenReturn(targetClientSession)

        val msg = MqttMessageBuilders.publish()
            .topicName(TOPIC)
            .messageId(1)
            .retained(true)
            .qos(MqttQoS.AT_LEAST_ONCE)
            .payload(
                Unpooled.copiedBuffer(
                    "payload".toByteArray(
                        StandardCharsets.UTF_8
                    )
                )
            )
            .build()

        // Invoke on publish event
        ec.writeInbound(msg)

        val response = ec.readOutbound<MqttPubAckMessage>()
        assertNotNull(response)
        assertEquals(MqttMessageType.PUBACK, response.fixedHeader().messageType())

        verify(innerTraffic, times(1)).publish(any())
        verify(store, times(1)).getSession(CLIENT_ID)
        verify(targetClientSession, times(1)).sendMsg(argThat { msgForSub ->
            msgForSub is MqttPublishMessage && msgForSub.variableHeader().topicName() == TOPIC
        })
        verify(store, times(1)).getNextMessageId(CLIENT_ID)
        verify(store, times(1)).addRetain(any())
        verify(store, times(1)).addDupPubMessage(any())
        verify(eventsWorkersExecutor, times(1)).execute(any(), eq(IEventsWorker.Type.PUBLISH))
    }

    @Test
    fun `when publish exactly once message then handle message`() = runTest {

        Mockito.`when`(
            authManager.authorized(
                userId = CLIENT_ID,
                scope = TOPIC,
                acType = AccessControl.Type.MQTT,
                permission = Permission.WRITE
            )
        ).thenReturn(true)
        Mockito.`when`(store.matchSubscription(TOPIC))
            .thenReturn(listOf(Subscription(clientId = CLIENT_ID, topic = TOPIC)))
        Mockito.`when`(store.getSession(CLIENT_ID)).thenReturn(targetClientSession)

        val msg = MqttMessageBuilders.publish()
            .topicName(TOPIC)
            .messageId(1)
            .retained(true)
            .qos(MqttQoS.EXACTLY_ONCE)
            .payload(
                Unpooled.copiedBuffer(
                    "payload".toByteArray(
                        StandardCharsets.UTF_8
                    )
                )
            )
            .build()

        // Invoke on publish event
        ec.writeInbound(msg)

        val response = ec.readOutbound<MqttMessage>()
        assertNotNull(response)
        assertEquals(MqttMessageType.PUBREC, response.fixedHeader().messageType())

        verify(innerTraffic, times(1)).publish(any())
        verify(store, times(1)).getSession(CLIENT_ID)
        verify(targetClientSession, times(1)).sendMsg(argThat { msgForSub ->
            msgForSub is MqttPublishMessage && msgForSub.variableHeader().topicName() == TOPIC
        })
        verify(store, times(1)).getNextMessageId(CLIENT_ID)
        verify(store, times(1)).addRetain(any())
        verify(store, times(1)).addDupPubMessage(any())
        verify(eventsWorkersExecutor, times(1)).execute(any(), eq(IEventsWorker.Type.PUBLISH))
    }
}