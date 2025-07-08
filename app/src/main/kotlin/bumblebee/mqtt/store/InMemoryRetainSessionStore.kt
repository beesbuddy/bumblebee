package bumblebee.mqtt.store

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.store.mqtt.IRetainMessageStore
import bumblebee.core.util.ScopeUtil
import cn.hutool.core.collection.CollUtil
import java.util.concurrent.ConcurrentHashMap


class MemoryRetainMessageClosableStore : IRetainMessageStore {
    private val retainMsgMap: ConcurrentHashMap<String, CommonPublishMessage> =
        ConcurrentHashMap<String, CommonPublishMessage>()

    override fun addRetain(message: CommonPublishMessage) {
        retainMsgMap[message.topic] = message
    }

    override fun removeRetain(topic: String) {
        retainMsgMap.remove(topic)
    }

    override fun matchRetains(topic: String): List<CommonPublishMessage?> {
        val retainMessageList: MutableList<CommonPublishMessage> = CollUtil.newLinkedList()
        val subTokenList = ScopeUtil.getScopeList(topic)

        if (CollUtil.isEmpty(subTokenList)) {
            return retainMessageList
        }

        val msgCollection = retainMsgMap.values

        if (CollUtil.isEmpty(msgCollection)) {
            return retainMessageList
        }

        for (retainMessage in msgCollection) {
            if (ScopeUtil.exactMatch(subTokenList, ScopeUtil.getScopeList(retainMessage.topic))) {
                retainMessageList.add(retainMessage)
            }
        }

        return retainMessageList
    }

    override fun close() {}
}
