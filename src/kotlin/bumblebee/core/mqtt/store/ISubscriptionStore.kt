package bumblebee.core.mqtt.store

import bumblebee.core.subscription.Subscription


interface ISubscriptionStore : IClosableStore {
    fun addSubscription(subscription: Subscription): Boolean
    fun removeSubscription(subscription: Subscription): Boolean
    fun matchSubscription(topic: String): List<Subscription?>?
    fun findAllSubscriptions(clientId: String?): Set<Subscription?>?
    fun removeAllSubscriptions(clientId: String?)
}
