package bumblebee.core.store.mqtt


interface IMessageIdStore {
    fun getNextMessageId(clientId: String): Int
}
