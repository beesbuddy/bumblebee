package bumblebee.mqtt.store

import bumblebee.core.client.ClientSession
import bumblebee.core.config.Config
import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.store.mqtt.*
import bumblebee.core.subscription.Subscription


class InMemoryStore(config: Config) : StoreProvider(config), IStore {
    private val messageIdStore: IMessageIdStore by lazy {
        InMemoryMessageIdStore()
    }
    private val sessionStore: ISessionStore by lazy {
        InMemorySessionStore()
    }
    private val subscriptionStore: ISubscriptionStore by lazy {
        InMemorySubscriptionStore()
    }
    private val retainMessageStore: IRetainMessageStore by lazy {
        MemoryRetainMessageClosableStore()
    }
    private val dupPubMessageStore: IDupPubMessageStore by lazy {
        InMemoryDupPubMessageStore()
    }
    private val dupPubRelMessageStore: IDupPubRelMessageStore by lazy {
        InMemoryDupPubRelMessageStore()
    }

    override fun getNextMessageId(clientId: String): Int {
        return messageIdStore.getNextMessageId(clientId)
    }

    override fun addDupPubMessage(message: CommonPublishMessage) {
        dupPubMessageStore.addDupPubMessage(message)
    }

    override fun getDupPubMessages(clientId: String): List<CommonPublishMessage?> {
        return dupPubMessageStore.getDupPubMessages(clientId)
    }

    override fun getDupPubMessage(clientId: String, messageId: Int): CommonPublishMessage? {
        return dupPubMessageStore.getDupPubMessage(clientId, messageId)
    }

    override fun removeDupPubMessage(clientId: String, messageId: Int) {
        dupPubMessageStore.removeDupPubMessage(clientId, messageId)
    }

    override fun removeAllDupPubMessages(clientId: String) {
        dupPubMessageStore.removeAllDupPubMessages(clientId)
    }

    override fun addDupPubRelMessage(message: CommonPublishMessage) {
        dupPubRelMessageStore.addDupPubRelMessage(message)
    }

    override fun getDupPubRelMessages(clientId: String): List<CommonPublishMessage?> {
        return dupPubRelMessageStore.getDupPubRelMessages(clientId)
    }

    override fun getDupPubRelMessage(clientId: String, messageId: Int): CommonPublishMessage? {
        return dupPubRelMessageStore.getDupPubRelMessage(clientId, messageId)
    }

    override fun removeDupPubRelMessage(clientId: String, messageId: Int) {
        dupPubRelMessageStore.removeDupPubRelMessage(clientId, messageId)
    }

    override fun removeAllDupPubRelMessages(clientId: String) {
        dupPubRelMessageStore.removeAllDupPubRelMessages(clientId)
    }

    override fun addSession(clientSession: ClientSession) {
        sessionStore.addSession(clientSession)
    }

    override fun getSession(clientId: String?): ClientSession? {
        return sessionStore.getSession(clientId)
    }

    override fun removeSession(clientId: String) {
        sessionStore.removeSession(clientId)
    }

    override val sessionCount: Int
        get() = sessionStore.sessionCount

    override fun addSubscription(subscription: Subscription): Boolean {
        return subscriptionStore.addSubscription(subscription)
    }

    override fun removeSubscription(subscription: Subscription): Boolean {
        return subscriptionStore.removeSubscription(subscription)
    }

    override fun matchSubscription(topic: String): List<Subscription?>? {
        return subscriptionStore.matchSubscription(topic)
    }

    override fun findAllSubscriptions(clientId: String?): Set<Subscription?>? {
        return subscriptionStore.findAllSubscriptions(clientId)
    }

    override fun removeAllSubscriptions(clientId: String?) {
        subscriptionStore.removeAllSubscriptions(clientId)
    }

    override fun addRetain(message: CommonPublishMessage) {
        retainMessageStore.addRetain(message)
    }

    override fun removeRetain(topic: String) {
        retainMessageStore.removeRetain(topic)
    }

    override fun matchRetains(topic: String): List<CommonPublishMessage?> {
        return retainMessageStore.matchRetains(topic)
    }

    override fun close() {
        sessionStore.close()
        retainMessageStore.close()
        dupPubRelMessageStore.close()
        dupPubMessageStore.close()
        retainMessageStore.close()
    }
}
