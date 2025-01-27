package bumblebee.core.store.mqtt

import bumblebee.core.event.message.mqtt.CommonPublishMessage


interface IDupPubMessageStore : IClosableStore {
    fun addDupPubMessage(message: CommonPublishMessage)
    fun getDupPubMessages(clientId: String): List<CommonPublishMessage?>
    fun getDupPubMessage(clientId: String, messageId: Int): CommonPublishMessage?
    fun removeDupPubMessage(clientId: String, messageId: Int)
    fun removeAllDupPubMessages(clientId: String)
}
