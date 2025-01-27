package bumblebee.core.inner.traffic

import bumblebee.core.event.message.mqtt.CommonPublishMessage


interface IInnerTraffic {
    fun publish(message: CommonPublishMessage?)
}