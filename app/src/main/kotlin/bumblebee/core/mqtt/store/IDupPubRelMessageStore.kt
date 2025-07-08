package bumblebee.core.mqtt.store

import bumblebee.core.event.message.mqtt.CommonPublishMessage


interface IDupPubRelMessageStore : IClosableStore {
    fun addDupPubRelMessage(message: CommonPublishMessage)
    fun getDupPubRelMessages(clientId: String): List<CommonPublishMessage?>
    fun getDupPubRelMessage(clientId: String, messageId: Int): CommonPublishMessage?
    fun removeDupPubRelMessage(clientId: String, messageId: Int)
    fun removeAllDupPubRelMessages(clientId: String)
}
