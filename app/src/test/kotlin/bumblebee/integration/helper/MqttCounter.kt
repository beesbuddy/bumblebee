package bumblebee.integration.helper

import java.util.concurrent.atomic.LongAdder

object MqttCounter {
    private var receiveCount = LongAdder()
    internal var connectCount = LongAdder()
    private var connectFailCount = LongAdder()
    private var connectLostCount = LongAdder()
    private var deliveryCount = LongAdder()

    fun addReceiveCount() {
        receiveCount.increment()
    }

    fun addConnectCount() {
        connectCount.increment()
    }

    fun addConnectFailCount() {
        connectFailCount.increment()
    }

    fun addConnectLostCount() {
        connectLostCount.increment()
    }

    fun addDeliveryCount() {
        deliveryCount.increment()
    }

    fun clear() {
        receiveCount.reset()
        connectCount.reset()
        connectFailCount.reset()
        connectLostCount.reset()
        deliveryCount.reset()
    }

    fun print(): String {
        return " receiveCount = " + receiveCount +
                " connectCount = " + connectCount +
                " connectFailCount = " + connectFailCount +
                " connectLostCount = " + connectLostCount +
                " deliveryCount = " + deliveryCount
    }
}