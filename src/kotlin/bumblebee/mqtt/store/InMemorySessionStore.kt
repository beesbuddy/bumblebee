package bumblebee.mqtt.store

import bumblebee.core.client.ClientSession
import bumblebee.core.mqtt.store.ISessionStore
import java.util.concurrent.ConcurrentHashMap
import kotlin.collections.get


class InMemorySessionStore : ISessionStore {
    private val sessionCache: ConcurrentHashMap<String, ClientSession> = ConcurrentHashMap<String, ClientSession>()

    override fun addSession(clientSession: ClientSession) {
        sessionCache[clientSession.clientId] = clientSession
    }

    override fun getSession(clientId: String?): ClientSession? {
        return sessionCache[clientId]
    }

    // TODO: Add get all clients ids in session

    override fun removeSession(clientId: String) {
        sessionCache.remove(clientId)
    }

    override val sessionCount: Int
        get() = sessionCache.size

    override fun close() {}
}
