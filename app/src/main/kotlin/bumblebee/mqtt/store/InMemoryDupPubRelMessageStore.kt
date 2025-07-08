package bumblebee.mqtt.store

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.store.mqtt.IDupPubRelMessageStore
import cn.hutool.core.collection.CollUtil
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.collections.get


class InMemoryDupPubRelMessageStore : IDupPubRelMessageStore {
    private val messageCache: ConcurrentHashMap<String, ConcurrentHashMap<Int, CommonPublishMessage>> =
        ConcurrentHashMap<String, ConcurrentHashMap<Int, CommonPublishMessage>>()
    private val lockMap: ConcurrentHashMap<String, AtomicBoolean> = ConcurrentHashMap<String, AtomicBoolean>()

    override fun addDupPubRelMessage(message: CommonPublishMessage) {
        while (true) {
            val clientId: String? = message.targetClientId

            if (null != clientId) {
                lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            }

            val atomicBoolean: AtomicBoolean? = lockMap[clientId]

            if (atomicBoolean != null && atomicBoolean.compareAndSet(false, true)) {
                var msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]

                if (null == msgMap) {
                    if (null != clientId) {
                        messageCache.putIfAbsent(clientId, ConcurrentHashMap<Int, CommonPublishMessage>())
                    }

                    msgMap = messageCache[clientId]
                }

                msgMap?.set(message.messageId, message)
                lockMap.remove(clientId)

                break
            }
        }
    }

    override fun getDupPubRelMessages(clientId: String): List<CommonPublishMessage?> {
        val msgList: List<CommonPublishMessage?>
        val msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]
        msgList = CollUtil.newArrayList(msgMap?.values)

        return msgList
    }

    override fun getDupPubRelMessage(clientId: String, messageId: Int): CommonPublishMessage? {
        val msgMap: ConcurrentHashMap<Int, CommonPublishMessage>? = messageCache[clientId]
        if (msgMap != null) {
            return if (CollUtil.isNotEmpty(msgMap)) {
                msgMap[messageId]
            } else null
        }

        return null
    }

    override fun removeDupPubRelMessage(clientId: String, messageId: Int) {
        while (true) {
            lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            val atomicBoolean: AtomicBoolean? = lockMap[clientId]

            if (null != atomicBoolean && atomicBoolean.compareAndSet(false, true)) {
                messageCache[clientId]?.remove(messageId)
                lockMap.remove(clientId)

                break
            }
        }
    }

    override fun removeAllDupPubRelMessages(clientId: String) {
        while (true) {
            lockMap.putIfAbsent(clientId, AtomicBoolean(false))
            val atomicBoolean: AtomicBoolean? = lockMap[clientId]
            if (null != atomicBoolean && atomicBoolean.compareAndSet(false, true)) {
                messageCache.remove(clientId)
                lockMap.remove(clientId)

                break
            }
        }
    }

    override fun close() {}
}
