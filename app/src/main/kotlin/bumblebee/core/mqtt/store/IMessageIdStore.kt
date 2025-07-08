package bumblebee.core.mqtt.store


interface IMessageIdStore {
    fun getNextMessageId(clientId: String): Int
}
