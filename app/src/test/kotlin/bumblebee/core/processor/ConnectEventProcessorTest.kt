package bumblebee.core.processor

import bumblebee.core.Constants
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.security.IAuthManager
import bumblebee.mqtt.processor.ConnectEventProcessor
import io.netty.channel.ChannelHandlerContext
import io.netty.channel.SimpleChannelInboundHandler
import io.netty.channel.embedded.EmbeddedChannel
import io.netty.handler.codec.mqtt.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.mock
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.times
import org.mockito.kotlin.verify
import kotlin.test.assertNotNull

private const val HANDLER_ON_CONNECT = "onConnectHandler"


class ConnectEventProcessorTest {
    lateinit var store: IStore
    lateinit var eventsWorkersExecutor: EventsWorkersExecutor
    lateinit var authManager: IAuthManager
    private lateinit var ec: EmbeddedChannel

    @BeforeEach
    fun setUp() {
        store = mock()
        eventsWorkersExecutor = mock()
        authManager = mock()
        // TODO: Move to helper util
        ec = EmbeddedChannel()
        ec.pipeline().addLast(HANDLER_ON_CONNECT, object : SimpleChannelInboundHandler<MqttMessage>() {
            override fun channelRead0(ctx: ChannelHandlerContext?, msg: MqttMessage?) {
                if (msg is MqttConnectMessage && ctx != null) {
                    ConnectEventProcessor(
                        store,
                        eventsWorkersExecutor,
                        authManager,
                    ).process(ctx, msg)
                }
            }
        })
        ec.config().writeBufferLowWaterMark = 5
        ec.config().writeBufferHighWaterMark = 10
    }

    @Test
    fun `when client id is null then return connection reject ack message`() {
        val msg = MqttMessageBuilders.connect()
            .protocolVersion(MqttVersion.MQTT_3_1_1)
            .clientId(null)
            .cleanSession(true)
            .build()

        // Invoke on connect event
        ec.writeInbound(msg)
        val response = ec.readOutbound<MqttConnAckMessage>()

        assertNotNull(response)
        assertEquals(
            MqttConnectReturnCode.CONNECTION_REFUSED_IDENTIFIER_REJECTED,
            response.variableHeader().connectReturnCode()
        )
    }

    @Test
    fun `when no password provided then return connection ref used bad username or password ack message`() {
        Mockito.`when`(authManager.isAuthenticated(clientId = Constants.CLIENT_ID, userName = Constants.USER_NAME, password = "")).thenReturn(false)

        val msg = MqttMessageBuilders.connect()
            .protocolVersion(MqttVersion.MQTT_3_1_1)
            .clientId(Constants.CLIENT_ID).username(Constants.USER_NAME)
            .cleanSession(true)
            .build()

        // Invoke on connect event
        ec.writeInbound(msg)
        val response = ec.readOutbound<MqttConnAckMessage>()

        assertNotNull(response)
        assertEquals(
            MqttConnectReturnCode.CONNECTION_REFUSED_BAD_USER_NAME_OR_PASSWORD,
            response.variableHeader().connectReturnCode()
        )
    }

    @Test
    fun `when connect message is correct then return ack message with clean session`() {
        Mockito.`when`(authManager.isAuthenticated(clientId = Constants.CLIENT_ID, userName = Constants.USER_NAME, password = "test")).thenReturn(true)

        val msg = MqttMessageBuilders.connect()
            .protocolVersion(MqttVersion.MQTT_3_1_1)
            .clientId(Constants.CLIENT_ID)
            .username(Constants.USER_NAME)
            .password("test".toByteArray())
            .cleanSession(true)
            .build()

        // Invoke on connect event
        ec.writeInbound(msg)
        val response = ec.readOutbound<MqttConnAckMessage>()

        verify(store, times(1)).removeSession(Constants.CLIENT_ID)
        verify(store, times(1)).getSession(Constants.CLIENT_ID)
        verify(store, times(1)).removeAllSubscriptions(Constants.CLIENT_ID)
        verify(store, times(0)).findAllSubscriptions(Constants.CLIENT_ID)
        verify(store, times(1)).removeAllDupPubMessages(Constants.CLIENT_ID)
        verify(store, times(1)).removeAllDupPubRelMessages(Constants.CLIENT_ID)
        verify(eventsWorkersExecutor, times(1)).execute(any(), eq(IEventsWorker.Type.CONNECT))

        assertNotNull(response)
        assertFalse(response.variableHeader().isSessionPresent)
        assertEquals(MqttConnectReturnCode.CONNECTION_ACCEPTED, response.variableHeader().connectReturnCode())
    }

    @Test
    fun `when connect message is correct then return ack message with old session`() {
        Mockito.`when`(authManager.isAuthenticated(clientId = Constants.CLIENT_ID, userName = Constants.USER_NAME, password = "test")).thenReturn(true)

        val msg = MqttMessageBuilders.connect()
            .protocolVersion(MqttVersion.MQTT_3_1_1)
            .clientId(Constants.CLIENT_ID)
            .username(Constants.USER_NAME)
            .password("test".toByteArray())
            .cleanSession(false)
            .build()

        // Invoke on connect event
        ec.writeInbound(msg)
        val response = ec.readOutbound<MqttConnAckMessage>()

        verify(store, times(1)).removeSession(Constants.CLIENT_ID)
        verify(store, times(0)).removeAllSubscriptions(Constants.CLIENT_ID)
        verify(store, times(0)).removeAllDupPubMessages(Constants.CLIENT_ID)
        verify(store, times(0)).removeAllDupPubRelMessages(Constants.CLIENT_ID)
        verify(store, times(1)).getDupPubMessages(Constants.CLIENT_ID)
        verify(eventsWorkersExecutor, times(1)).execute(any(), eq(IEventsWorker.Type.CONNECT))

        assertNotNull(response)
        assertTrue(response.variableHeader().isSessionPresent)
        assertEquals(MqttConnectReturnCode.CONNECTION_ACCEPTED, response.variableHeader().connectReturnCode())
    }
}