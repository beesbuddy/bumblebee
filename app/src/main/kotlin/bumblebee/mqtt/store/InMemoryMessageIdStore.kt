package bumblebee.mqtt.store

import bumblebee.core.Constants
import bumblebee.core.mqtt.store.IMessageIdStore
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicBoolean


class InMemoryMessageIdStore : IMessageIdStore {
    private val clientMsgIdMap = ConcurrentHashMap<String, Int>()
    private val lockMap = ConcurrentHashMap<String, AtomicBoolean>()

    override fun getNextMessageId(clientId: String): Int {
        while (true) {
            lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            val atomicBoolean = lockMap[clientId]

            if (atomicBoolean != null && atomicBoolean.compareAndSet(false, true)) {
                val currentMsgId = getCurrentMsgId(clientId)
                var nextMsgId: Int = (currentMsgId + Constants.INT_ONE) % 0xFFFF // make sure nextMsgId <= 65535

                if (Constants.INT_ZERO == nextMsgId) {
                    nextMsgId = Constants.INT_ONE % 0xFFFF // make sure nextMsgId <= 65535
                }

                clientMsgIdMap[clientId] = nextMsgId
                lockMap.remove(clientId)

                return nextMsgId
            }
        }
    }

    private fun getCurrentMsgId(clientId: String): Int {
        var currentMsgId = clientMsgIdMap[clientId]

        if (currentMsgId == null) {
            currentMsgId = Constants.INT_ZERO
            clientMsgIdMap.putIfAbsent(clientId, currentMsgId)
            currentMsgId = clientMsgIdMap[clientId]
        }

        return currentMsgId!!
    }
}
