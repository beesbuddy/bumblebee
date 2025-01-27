package bumblebee.core.store.mqtt

import bumblebee.core.event.message.mqtt.CommonPublishMessage


interface IRetainMessageStore : IClosableStore {
    fun addRetain(message: CommonPublishMessage)
    fun removeRetain(topic: String)
    fun matchRetains(topic: String): List<CommonPublishMessage?>
}
