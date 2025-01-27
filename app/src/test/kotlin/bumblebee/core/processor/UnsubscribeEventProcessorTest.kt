package bumblebee.core.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.store.mqtt.IStore
import bumblebee.core.store.mqtt.ISubscriptionStore
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.NettyUtil
import bumblebee.core.worker.EventsWorkersExecutor
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.channel.embedded.EmbeddedChannel
import io.netty.handler.codec.mqtt.MqttMessage
import io.netty.handler.codec.mqtt.MqttMessageBuilders
import io.netty.handler.codec.mqtt.MqttMessageType
import io.netty.handler.codec.mqtt.MqttUnsubscribeMessage
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import kotlin.test.assertEquals


private const val HANDLER_ON_UNSUBSCRIBE = "onSubscribeHandler"
private const val CLIENT_ID = "clientId"
private const val TOPIC = "test"

class UnsubscribeEventProcessorTest {
    lateinit var store: IStore
    lateinit var subscriptionStore: ISubscriptionStore
    private lateinit var eventsWorkersExecutor: EventsWorkersExecutor
    private lateinit var ec: EmbeddedChannel
    private lateinit var targetClientSession: ClientSession

    @BeforeEach
    fun setUp() {
        store = Mockito.mock()
        eventsWorkersExecutor = Mockito.mock()
        targetClientSession = Mockito.mock()

        ec = EmbeddedChannel()
        ec.pipeline().addLast(HANDLER_ON_UNSUBSCRIBE, object : SimpleChannelInboundHandler<MqttMessage>() {
            override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
                if (msg is MqttUnsubscribeMessage && ctx != null) {
                    ctx.channel().attr(NettyUtil.ATTR_CLIENT_ID).set(CLIENT_ID)

                    UnsubscribeEventProcessor(
                        store = store,
                        eventsWorkersExecutor = eventsWorkersExecutor,
                    ).process(ctx, msg)
                }
            }
        })
    }

    @Test
    fun process_WhenUnsubscribeMessage_ThenHandleMessage() {
        Mockito.`when`(subscriptionStore.matchSubscription(TOPIC))
            .thenReturn(listOf(Subscription(clientId = CLIENT_ID, topic = TOPIC)))

        Mockito.`when`(store.getSession(CLIENT_ID)).thenReturn(targetClientSession)

        val msg = MqttMessageBuilders.unsubscribe().messageId(1).addTopicFilter(TOPIC).build()
        ec.writeOutbound(msg)

        val response = ec.readOutbound<MqttUnsubscribeMessage>()
        Assertions.assertNotNull(response)
        assertEquals(MqttMessageType.UNSUBSCRIBE, response.fixedHeader().messageType())
    }
}
