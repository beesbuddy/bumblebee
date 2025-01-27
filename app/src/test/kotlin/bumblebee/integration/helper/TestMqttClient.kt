package bumblebee.integration.helper

import org.eclipse.paho.client.mqttv3.*
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence


class TestMqttClient(
    private val topic: String,
    private val clientId: String,
    private val broker: String,
    private val userName: String,
    private val password: String,
    private val qos: Int,
) : MqttCallback {
    fun subscribe() {
        try {
            val client = MqttClient(broker, clientId, MemoryPersistence())

            val connOpts = MqttConnectOptions()
            connOpts.connectionTimeout = 3000
            connOpts.isCleanSession = false
            connOpts.userName = userName
            connOpts.password = password.toCharArray()

            client.setCallback(this)
            client.connect(connOpts)
            client.subscribe(topic, qos)

            val isSuccess: Boolean = client.isConnected

            if (isSuccess) {
                MqttCounter.addConnectCount()
            } else {
                MqttCounter.addConnectFailCount()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun connectionLost(cause: Throwable?) {
        MqttCounter.addConnectLostCount()
    }

    override fun messageArrived(topic: String?, message: MqttMessage) {
        MqttCounter.addReceiveCount()
    }

    override fun deliveryComplete(token: IMqttDeliveryToken?) {
        MqttCounter.addDeliveryCount()
    }
}