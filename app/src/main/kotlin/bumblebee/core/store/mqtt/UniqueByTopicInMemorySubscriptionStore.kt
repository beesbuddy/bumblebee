package bumblebee.core.store.mqtt

import bumblebee.core.subscription.SubWildcardTree
import bumblebee.core.subscription.Subscription
import bumblebee.core.util.ScopeUtil
import cn.hutool.core.collection.CollUtil
import cn.hutool.core.collection.CollectionUtil
import cn.hutool.core.collection.ConcurrentHashSet
import cn.hutool.core.util.StrUtil
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicBoolean
import mu.KotlinLogging

private val log = KotlinLogging.logger {}


abstract class UniqueByTopicInMemorySubscriptionStore protected constructor() : ISubscriptionStore {
    private val wildcardTopicSubCache: SubWildcardTree = SubWildcardTree()
    private val commonTopicSubCache: ConcurrentHashMap<String, MutableSet<Subscription>> =
        ConcurrentHashMap<String, MutableSet<Subscription>>()
    private val lockMap: ConcurrentHashMap<String, AtomicBoolean> = ConcurrentHashMap<String, AtomicBoolean>()

    init {
        wildcardTopicSubCache.init()
    }

    override fun addSubscription(subscription: Subscription): Boolean {
        val topic: String = subscription.topic
        val topicTokenList: List<String> = ScopeUtil.getScopeList(topic)

        if (CollUtil.isEmpty(topicTokenList)) {
            log.error(
                "AddSub topic is not valid. ClientId={},topic={}",
                subscription.clientId,
                topic
            )
            return false
        }

        if (SubWildcardTree.isWildcardTopic(topic)) {
            wildcardTopicSubCache.add(topicTokenList, subscription)
        } else {
            while (true) {
                lockMap.putIfAbsent(topic, AtomicBoolean(false))
                val atomicBoolean: AtomicBoolean? = lockMap[topic]
                if (null != atomicBoolean && atomicBoolean.compareAndSet(false, true)) {
                    var subSet: MutableSet<Subscription>? = commonTopicSubCache[topic]
                    if (null == subSet) {
                        commonTopicSubCache.putIfAbsent(topic, ConcurrentHashSet())
                        subSet = commonTopicSubCache[topic]
                    }
                    subSet?.add(subscription)
                    log.debug("Adding subscription success. Subscription={}", subscription)
                    lockMap.remove(topic)
                    break
                }
            }
        }
        return true
    }

    override fun removeSubscription(subscription: Subscription): Boolean {
        val topic: String = subscription.topic
        val topicTokenList: List<String> = topic.let { ScopeUtil.getScopeList(it) }
        if (CollUtil.isEmpty(topicTokenList)) {
            log.error("Error on remove subscription. Topic is not valid. Topic={}", topic)
            return false
        }
        if (SubWildcardTree.isWildcardTopic(topic)) {
            wildcardTopicSubCache.remove(topicTokenList, subscription)
        } else {
            var subSet: MutableSet<Subscription>? = commonTopicSubCache[topic]
            if (CollectionUtil.isNotEmpty(subSet) && subSet?.contains(subscription) == true) {
                subSet.remove(subscription)
                if (CollectionUtil.isEmpty(subSet)) {
                    while (true) {
                        lockMap.putIfAbsent(topic, AtomicBoolean(false))
                        val atomicBoolean: AtomicBoolean? = lockMap[topic]
                        if (null != atomicBoolean && atomicBoolean.compareAndSet(false, true)) {
                            subSet = commonTopicSubCache[topic]
                            if (CollectionUtil.isEmpty(subSet)) {
                                commonTopicSubCache.remove(topic)
                                log.debug(
                                    "Removed subscription successfully. Subscription={}",
                                    subscription
                                )
                            }
                            lockMap.remove(topic)
                            break
                        }
                    }
                }
            }
        }
        return true
    }

    override fun matchSubscription(topic: String): List<Subscription?> {
        val subscriptionList: MutableList<Subscription> = LinkedList<Subscription>()
        val topicTokenList = ScopeUtil.getScopeList(topic)

        if (CollUtil.isEmpty(topicTokenList)) {
            log.error("Matched topic is not valid. Topic={}", topic)
            return subscriptionList
        }

        if (StrUtil.isNotBlank(topic)) {
            if (commonTopicSubCache.containsKey(topic)) {
                val subSet: Set<Subscription>? = commonTopicSubCache[topic]

                if (CollectionUtil.isNotEmpty(subSet)) {
                    subscriptionList.addAll(subSet!!)
                }
            }

            val wildcardSubList: List<Subscription> = wildcardTopicSubCache.getSubListFor(topicTokenList)

            if (CollectionUtil.isNotEmpty(wildcardSubList)) {
                subscriptionList.addAll(wildcardSubList)
            }
        }

        return subscriptionList
    }

    fun dumpWildcardSubData(): String {
        return wildcardTopicSubCache.dumpTreeToJson()
    }

    override fun close() {}
}