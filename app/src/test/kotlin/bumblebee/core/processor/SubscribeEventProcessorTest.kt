package bumblebee.core.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.security.*
import bumblebee.core.store.mqtt.IStore
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.NettyUtil
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.mqtt.processor.PublishEventProcessor
import bumblebee.mqtt.processor.SubscribeEventProcessor
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.channel.embedded.EmbeddedChannel
import io.netty.handler.codec.mqtt.*
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import kotlin.test.assertEquals


private const val HANDLER_ON_SUBSCRIBE = "onSubscribeHandler"
private const val CLIENT_ID = "clientId"
private const val TOPIC = "test"

class SubscribeEventProcessorTest {
    lateinit var store: IStore
    private lateinit var eventsWorkersExecutor: EventsWorkersExecutor
    lateinit var authManager: IAuthManager
    lateinit var publishEventProcessor: PublishEventProcessor
    lateinit var eventListenerExecutor: EventsWorkersExecutor
    private lateinit var ec: EmbeddedChannel
    private lateinit var targetClientSession: ClientSession

    @BeforeEach
    fun setUp() {
        store = Mockito.mock()
        eventsWorkersExecutor = Mockito.mock()
        authManager = Mockito.mock()
        publishEventProcessor = Mockito.mock()
        eventListenerExecutor = Mockito.mock()
        targetClientSession = Mockito.mock()

        ec = EmbeddedChannel()
        ec.pipeline().addLast(HANDLER_ON_SUBSCRIBE, object : SimpleChannelInboundHandler<MqttMessage>() {
            override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
                if (msg is MqttSubscribeMessage && ctx != null) {
                    ctx.channel().attr(NettyUtil.ATTR_CLIENT_ID).set(CLIENT_ID)

                    SubscribeEventProcessor(
                        store = store,
                        authManager = authManager,
                        publishEventProcessor = publishEventProcessor,
                        eventListenerExecutor = eventListenerExecutor,
                    ).process(ctx, msg)
                }
            }
        })
    }

    @Test
    fun `when subscribe message then handle message`() {
        Mockito.`when`(
            authManager.authorization(
                clientId = CLIENT_ID,
                scope = TOPIC,
                type = AccessControl.Type.MQTT
            )
        ).thenReturn(Role.createReadOnly())
        Mockito.`when`(store.matchSubscription(TOPIC))
            .thenReturn(listOf(Subscription(clientId = CLIENT_ID, topic = TOPIC)))

        Mockito.`when`(store.getSession(CLIENT_ID)).thenReturn(targetClientSession)

        val msg = MqttMessageBuilders.subscribe().messageId(1).addSubscription(MqttQoS.AT_MOST_ONCE, TOPIC).build()
        ec.writeOutbound(msg)

        val response = ec.readOutbound<MqttSubscribeMessage>()
        Assertions.assertNotNull(response)
        assertEquals(MqttMessageType.SUBSCRIBE, response.fixedHeader().messageType())
    }
}