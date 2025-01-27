package bumblebee.store.mqtt.memory

import bumblebee.core.store.mqtt.UniqueByTopicInMemorySubscriptionStore
import bumblebee.core.subscription.Subscription
import cn.hutool.core.collection.CollUtil
import cn.hutool.core.collection.ConcurrentHashSet
import java.util.concurrent.ConcurrentHashMap


class InMemorySubscriptionStore : UniqueByTopicInMemorySubscriptionStore() {
    private val clientSubMap = ConcurrentHashMap<String, MutableSet<Subscription>>()

    override fun addSubscription(subscription: Subscription): Boolean {
        val addResult = super.addSubscription(subscription)
        if (addResult) {
            val clientId = subscription.clientId
            var subSet = clientSubMap[clientId]
            if (subSet == null) {
                clientSubMap.putIfAbsent(clientId, ConcurrentHashSet())
                subSet = clientSubMap[clientId]
            }
            subSet!!.add(subscription)
            return true
        }
        return false
    }

    override fun removeSubscription(subscription: Subscription): Boolean {
        val removeResult = super.removeSubscription(subscription)
        if (removeResult) {
            val clientId = subscription.clientId
            val subSet = clientSubMap[clientId]
            if (CollUtil.isNotEmpty(subSet)) {
                subSet?.remove(subscription)
            }
            return true
        }
        return false
    }

    override fun findAllSubscriptions(clientId: String?): Set<Subscription?> {
        return CollUtil.emptyIfNull(clientSubMap[clientId])
    }

    override fun removeAllSubscriptions(clientId: String?) {
        clientSubMap[clientId]?.let {
            if (CollUtil.isNotEmpty(it)) {
                for (subscription in it) {
                    super.removeSubscription(subscription)
                }
                it.clear()
            }
        }
    }
}
