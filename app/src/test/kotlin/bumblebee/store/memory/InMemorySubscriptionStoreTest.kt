package bumblebee.store.memory

import bumblebee.core.Constants
import bumblebee.core.subscription.Subscription
import bumblebee.mqtt.store.InMemorySubscriptionStore
import cn.hutool.core.collection.CollUtil
import com.alibaba.fastjson.JSON
import io.netty.handler.codec.mqtt.MqttQoS
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertTrue

private const val CLIENT_ID = "clientId"


class InMemorySubscriptionStoreTest {
    private var subStore: InMemorySubscriptionStore? = null

    @BeforeEach
    fun init() {
        subStore = InMemorySubscriptionStore()
    }

    @Test
    fun `when adding a new subscription then return add flag`() {
        val store = InMemorySubscriptionStore()
        val added = store.addSubscription(Subscription(clientId = CLIENT_ID, topic = "topic", qos = MqttQoS.AT_LEAST_ONCE))
        assertTrue(added)
    }

    @Test
    fun `when removing existing subscription then return add flag`() {
        val subscription = Subscription(clientId = CLIENT_ID, topic = "topic", qos = MqttQoS.AT_LEAST_ONCE)
        val store = InMemorySubscriptionStore()
        val added = store.addSubscription(subscription)
        assertTrue(added)
        val removed = store.removeSubscription(subscription)
        assertTrue(removed)
    }

    @Test
    fun `when removing not existing subscription then return remove flag`() {
        val subscription = Subscription(clientId = CLIENT_ID, topic = "topic", qos = MqttQoS.AT_LEAST_ONCE)
        val store = InMemorySubscriptionStore()
        val added = store.addSubscription(subscription)
        assertTrue(added)
        val removed = store.removeSubscription(subscription)
        assertTrue(removed)
    }

    @Test
    fun `when given client id then find all subscriptions`() {
        val store = InMemorySubscriptionStore()
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}2", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        assertEquals(2, store.findAllSubscriptions("clientId1").size)
    }

    @Test
    fun `when given client id with same topic then find all subscriptions`() {
        val store = InMemorySubscriptionStore()
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}2", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        assertEquals(1, store.findAllSubscriptions("${CLIENT_ID}1").size)
    }

    @Test
    fun `when given client id then remove all subscriptions`() {
        val store = InMemorySubscriptionStore()
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}2", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        store.removeAllSubscriptions("${CLIENT_ID}1")
        assertEquals(0, store.findAllSubscriptions("${CLIENT_ID}1").size)
    }

    @Test
    fun `when given client id with same topic then remove all subscriptions`() {
        val store = InMemorySubscriptionStore()
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}1", topic = "topic1", qos = MqttQoS.AT_LEAST_ONCE))
        store.addSubscription(Subscription(clientId = "${CLIENT_ID}2", topic = "topic2", qos = MqttQoS.AT_LEAST_ONCE))
        store.removeAllSubscriptions("${CLIENT_ID}1")
        assertEquals(0, store.findAllSubscriptions("${CLIENT_ID}1").size)
    }

    @Test
    fun `when giving topic with specific formats then add subscription by specific rules`() {
        var topic = "/"
        var addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "abc/"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = Constants.SCOPE_ROOT
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "+"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertTrue(addSuccess)
        topic = "+/"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "t1/++"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "#/11"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "+/"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "a/+"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertTrue(addSuccess)
        topic = "a/c d"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertTrue(addSuccess)
        topic = "a/+/#11"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertFalse(addSuccess)
        topic = "a/+/#"
        addSuccess = subStore!!.addSubscription(Subscription(UUID.randomUUID().toString(), topic, MqttQoS.AT_LEAST_ONCE))
        Assertions.assertTrue(addSuccess)
    }

    @Test
    fun whenAddingTopics_ThenTheyAreMatchedBySpecificRulesAndAdded() {
        var subTopic = "t1/+"
        val s1 = Subscription(UUID.randomUUID().toString(), subTopic)
        var addSucc = subStore!!.addSubscription(s1)
        Assertions.assertTrue(addSucc)
        subTopic = "t1/+"
        val s2 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s2)
        Assertions.assertTrue(addSucc)
        subTopic = "t1/+/a"
        val s3 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s3)
        Assertions.assertTrue(addSucc)
        subTopic = "t1/+/+"
        val s4 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s4)
        Assertions.assertTrue(addSucc)
        subTopic = "t1/#"
        val s5 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s5)
        Assertions.assertTrue(addSucc)

        //================================
        subTopic = "t2"
        val s6 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s6)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/abc"
        val s7 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s7)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/ABC"
        val s8 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s8)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/ABC/#"
        val s9 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s9)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/ABC/+"
        val s10 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s10)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/ABC/+/D/+"
        val s11 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s11)
        Assertions.assertTrue(addSucc)
        subTopic = "t2/#"
        val s12 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s12)
        Assertions.assertTrue(addSucc)

        //========================
        subTopic = "+/ABC/#"
        val s13 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s13)
        Assertions.assertTrue(addSucc)
        subTopic = "+"
        val s14 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s14)
        Assertions.assertTrue(addSucc)
        subTopic = "+/+"
        val s15 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s15)
        Assertions.assertTrue(addSucc)
        subTopic = "+/b/+"
        val s16 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s16)
        Assertions.assertTrue(addSucc)
        subTopic = "#"
        val s0 = Subscription(UUID.randomUUID().toString(), subTopic)
        addSucc = subStore!!.addSubscription(s0)
        Assertions.assertTrue(addSucc)

        //=====================================================
        var matchTopic = "t1/a"
        var matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s1, s2, s5, s15),
            matchSubList.toHashSet()
        )
        matchTopic = "t1/b/a"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s3, s4, s5, s16),
            matchSubList.toHashSet()
        )
        matchTopic = "t1/b/c"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s4, s5, s16),
            matchSubList.toHashSet()
        )
        matchTopic = "t1/b/c/d"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s5),
            matchSubList.toHashSet()
        )

        //================================================================
        matchTopic = "t2"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s6, s14),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/abc"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s7, s12, s15),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/abc/dd"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s12),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/ABC"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s8, s12, s15),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/ABC/aaa"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s9, s10, s12, s13),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/ABC/aaa/D"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s9, s12, s13),
            matchSubList.toHashSet()
        )
        matchTopic = "t2/ABC/BBB/D/CC"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s9, s11, s12, s13),
            matchSubList.toHashSet()
        )
        matchTopic = "t3/A"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ",matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s0, s15),
            matchSubList.toHashSet()
        )
        println()
        println("===================================")
        println(subStore!!.dumpWildcardSubData())

        //====================================================
        subStore!!.removeSubscription(s0)
        matchTopic = "t1/a"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s1, s2, s5, s15),
            matchSubList.toHashSet()
        )
        subStore!!.removeSubscription(s3)
        matchTopic = "t1/b/a"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s4, s5, s16),
            matchSubList.toHashSet()
        )
        subStore!!.removeSubscription(s5)
        matchTopic = "t1/b/c/d"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(CollUtil.newHashSet<Any>(), matchSubList.toHashSet())
        subStore!!.removeSubscription(s1)
        subStore!!.removeSubscription(s2)
        subStore!!.removeSubscription(s4)
        //=======================================
        subStore!!.removeSubscription(s8)
        matchTopic = "t2/ABC"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s12, s15),
            matchSubList.toHashSet()
        )
        subStore!!.removeSubscription(s10)
        matchTopic = "t2/ABC/aaa"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s9, s12, s13),
            matchSubList.toHashSet()
        )
        subStore!!.removeSubscription(s12)
        subStore!!.removeSubscription(s13)
        matchTopic = "t2/ABC/BBB/D/CC"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(
            hashSetOf(s9, s11),
            matchSubList.toHashSet()
        )
        subStore!!.removeSubscription(s9)
        matchTopic = "t2/ABC/aaa/D"
        matchSubList = subStore!!.matchSubscription(matchTopic)
        println("topic:" + matchTopic + ", matchSubSet:" + JSON.toJSONString(matchSubList))
        Assertions.assertEquals(CollUtil.newHashSet<Any>(), matchSubList.toHashSet())
        println()
        println("===================================")
        println(subStore!!.dumpWildcardSubData())
    }
}