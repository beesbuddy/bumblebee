package bumblebee.core.inner.traffic

import bumblebee.core.event.message.mqtt.CommonPublishMessage


class NoopInnerTraffic(private val nodeName: String) : IInnerTraffic {
    override fun publish(message: CommonPublishMessage?) {
        // Noop
    }
}