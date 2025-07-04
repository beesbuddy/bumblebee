package bumblebee.core.processor

import bumblebee.core.Constants
import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.DisconnectEventMessage
import bumblebee.core.store.mqtt.*
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.util.NettyUtil
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.channel.embedded.EmbeddedChannel
import io.netty.handler.codec.mqtt.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.mockito.Mockito
import org.mockito.kotlin.times
import org.mockito.kotlin.verify

private const val HANDLER_ON_DISCONNECT = "onDisconnectHandler"

class DisconnectEventProcessorTest {
    lateinit var store: IStore
    lateinit var eventsWorkersExecutor: EventsWorkersExecutor
    private lateinit var ec: EmbeddedChannel

    @BeforeEach
    fun setUp() {
        store = Mockito.mock()
        eventsWorkersExecutor = Mockito.mock()

        ec = EmbeddedChannel()
        ec.pipeline().addLast(HANDLER_ON_DISCONNECT, object : SimpleChannelInboundHandler<MqttMessage>() {
            override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
                if (null != ctx && null != msg) {
                    DisconnectEventProcessor(
                        store = store,
                        eventListenerExecutor = eventsWorkersExecutor,
                    ).process(ctx, msg)
                }
            }
        })
        ec.config().setWriteBufferLowWaterMark(5)
        ec.config().setWriteBufferHighWaterMark(10)
    }

    @Test
    fun `when receiving disconnect message with different channel then cleanup session`() {
        val msg = MqttMessageBuilders.disconnect().build()

        NettyUtil.clientId(ec.pipeline().channel(), Constants.CLIENT_ID)
        NettyUtil.userName(ec.pipeline().channel(), Constants.USER_NAME)

        val clientSession: ClientSession = Mockito.mock()

        Mockito.`when`(clientSession.isSameChannel(ec.pipeline().channel())).thenReturn(false)
        Mockito.`when`(store.getSession(Constants.CLIENT_ID)).thenReturn(clientSession)

        ec.writeInbound(msg)
        val response = ec.readOutbound<Any>()

        assertNull(response)

        verify(store, times(1)).getSession(Constants.CLIENT_ID)
        verify(clientSession, times(1)).isSameChannel(ec.pipeline().channel())

        verify(store, times(0)).removeAllSubscriptions(Constants.CLIENT_ID)
        verify(store, times(0)).removeAllDupPubMessages(Constants.CLIENT_ID)
        verify(store, times(0)).removeAllDupPubRelMessages(Constants.CLIENT_ID)

        verify(eventsWorkersExecutor, times(0))
            .execute(DisconnectEventMessage(Constants.CLIENT_ID, Constants.USER_NAME), IEventsWorker.Type.DISCONNECT)
    }

    @Test
    fun `when receiving disconnect message with same channel then cleanup session`() {
        val msg = MqttMessageBuilders.disconnect().build()

        NettyUtil.clientId(ec.pipeline().channel(), Constants.CLIENT_ID)
        NettyUtil.userName(ec.pipeline().channel(), Constants.USER_NAME)

        val clientSession: ClientSession = Mockito.mock()

        Mockito.`when`(clientSession.isSameChannel(ec.pipeline().channel())).thenReturn(true)
        Mockito.`when`(clientSession.cleanSession).thenReturn(true)
        Mockito.`when`(store.getSession(Constants.CLIENT_ID)).thenReturn(clientSession)

        ec.writeInbound(msg)
        val response = ec.readOutbound<Any>()

        assertNull(response)

        verify(store, times(1)).getSession(Constants.CLIENT_ID)
        verify(clientSession, times(1)).isSameChannel(ec.pipeline().channel())
        verify(store, times(1)).removeAllSubscriptions(Constants.CLIENT_ID)
        verify(store, times(1)).removeAllDupPubMessages(Constants.CLIENT_ID)
        verify(store, times(1)).removeAllDupPubRelMessages(Constants.CLIENT_ID)

        verify(eventsWorkersExecutor, times(1))
            .execute(DisconnectEventMessage(Constants.CLIENT_ID, Constants.USER_NAME), IEventsWorker.Type.DISCONNECT)
    }
}