package bumblebee.integration

import bumblebee.mqtt.MQTTFactory
import bumblebee.mqtt.MQTTServer
import bumblebee.core.Constants
import bumblebee.core.config.Config
import bumblebee.core.config.SecurityConfig
import bumblebee.core.inner.traffic.NoopInnerTraffic
import bumblebee.core.security.*
import bumblebee.integration.helper.MqttCounter
import bumblebee.integration.helper.TestMqttClient
import io.netty.handler.codec.mqtt.MqttQoS
import org.checkerframework.checker.units.qual.A
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object FileBasedAuthManagerForSubscriptionTest {
    private const val DEFAULT_BROKER = "tcp://localhost:1883"
    private const val DEFAULT_TOPIC = "apiary/test"
    private const val BASE_CLIENT_ID = "clientId"
    private const val DEFAULT_USERNAME = "test"
    private const val DEFAULT_PASSWORD = "test"

    private lateinit var broker: MQTTServer

    @BeforeEach
    fun setUp() {
        val users = (0..8).map {
            User(
                userId = "${BASE_CLIENT_ID}_$it",
                password = PasswordEncoder.hashPassword(DEFAULT_PASSWORD),
                userName = DEFAULT_USERNAME,
                role = Role(acl = (0..8).map {
                    AccessControl(scope = DEFAULT_TOPIC, permission = Permission.READ, type = AccessControl.Type.MQTT)
                }.toMutableList())
            )
        }.toMutableList()

        users.addLast(User(
            userId = "${BASE_CLIENT_ID}_9",
            password = PasswordEncoder.hashPassword(DEFAULT_PASSWORD),
            userName = DEFAULT_USERNAME,
            role = Role(acl = listOf(AccessControl(scope = DEFAULT_TOPIC, permission = Permission.NONE, AccessControl.Type.MQTT)))
        ))


        val config = Config(
            securityConfig = SecurityConfig(
                users = users.toMutableList(),
                authManagerClass = Constants.AUTH_MANAGER_FILE_BASED_CLASSNAME
            )
        )

        val authManager = AuthManagerProvider.initialize(config.securityConfig)

        broker = MQTTFactory.createBroker(
            config,
            authManager,
            innerTraffic = NoopInnerTraffic("test")
        )
        broker.start()
    }

    @AfterEach
    fun cleanUp() {
        broker.stop()
        MqttCounter.clear()
    }

    @Test
    fun `when subscribe multiple times then return correct connection count`() {
        for (i in 0..8) {
            TestMqttClient(
                topic = DEFAULT_TOPIC,
                clientId = "${BASE_CLIENT_ID}_$i",
                broker = DEFAULT_BROKER,
                userName = DEFAULT_USERNAME,
                password = DEFAULT_PASSWORD,
                qos = MqttQoS.AT_MOST_ONCE.value()
            ).subscribe()
        }

        assertEquals(9, MqttCounter.connectCount.toLong())
    }

    @Test
    fun `when subscribe with bad user then do not allow to connect`() {
        TestMqttClient(
            topic = DEFAULT_TOPIC,
            clientId = "${BASE_CLIENT_ID}_9",
            broker = DEFAULT_BROKER,
            userName = DEFAULT_USERNAME,
            password = DEFAULT_PASSWORD,
            qos = MqttQoS.AT_MOST_ONCE.value()
        ).subscribe()

        assertEquals(0, MqttCounter.connectCount.toLong())
    }

    @Test
    fun `when subscribe without access control then return correct connection count`() {
        TestMqttClient(
            topic = DEFAULT_TOPIC,
            clientId = "${BASE_CLIENT_ID}_9",
            broker = DEFAULT_BROKER,
            userName = DEFAULT_USERNAME,
            password = DEFAULT_PASSWORD,
            qos = MqttQoS.AT_MOST_ONCE.value()
        ).subscribe()

        assertEquals(0, MqttCounter.connectCount.toLong())
    }
}
