package bumblebee.core.mqtt.store

import bumblebee.core.client.ClientSession


interface ISessionStore : IClosableStore {
    fun addSession(clientSession: ClientSession)
    fun getSession(clientId: String?): ClientSession?
    fun removeSession(clientId: String)
    val sessionCount: Int
}
