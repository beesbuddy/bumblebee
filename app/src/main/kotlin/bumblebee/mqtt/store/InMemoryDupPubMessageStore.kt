package bumblebee.mqtt.store

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.store.mqtt.IDupPubMessageStore
import cn.hutool.core.collection.CollUtil
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.collections.get


class InMemoryDupPubMessageStore : IDupPubMessageStore {
    private val messageCache: ConcurrentHashMap<String, ConcurrentHashMap<Int, CommonPublishMessage>> =
        ConcurrentHashMap<String, ConcurrentHashMap<Int, CommonPublishMessage>>()
    private val lockMap: ConcurrentHashMap<String, AtomicBoolean> = ConcurrentHashMap<String, AtomicBoolean>()
    override fun addDupPubMessage(message: CommonPublishMessage) {
        while (true) {
            val clientId: String? = message.targetClientId

            clientId?.let {
                lockMap.putIfAbsent(it, AtomicBoolean(false))
            }

            val atomicBoolean: AtomicBoolean? = lockMap[clientId]

            if (null != atomicBoolean && atomicBoolean.compareAndSet(false, true)) {
                val msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]
                msgMap?.set(message.messageId, message)
                lockMap.remove(clientId)
                break
            }
        }
    }

    override fun getDupPubMessages(clientId: String): List<CommonPublishMessage?> {
        val msgList: List<CommonPublishMessage?>
        val msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]
        msgList = CollUtil.newArrayList(msgMap?.values)

        return msgList
    }

    override fun getDupPubMessage(clientId: String, messageId: Int): CommonPublishMessage? {
        val msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]

        return msgMap?.get(messageId)
    }

    override fun removeDupPubMessage(clientId: String, messageId: Int) {
        while (true) {
            lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            val atomicBoolean: AtomicBoolean? = lockMap[clientId]
            if (atomicBoolean != null && atomicBoolean.compareAndSet(false, true)) {
                messageCache[clientId]?.remove(messageId)
                lockMap.remove(clientId)
                break
            }
        }
    }

    override fun removeAllDupPubMessages(clientId: String) {
        while (true) {
            lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            val atomicBoolean: AtomicBoolean? = lockMap[clientId]
            if (atomicBoolean != null && atomicBoolean.compareAndSet(false, true)) {
                messageCache.remove(clientId)
                lockMap.remove(clientId)
                break
            }
        }
    }

    override fun close() {}
}
