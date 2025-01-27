package bumblebee.store.memory

import bumblebee.store.mqtt.memory.InMemoryMessageIdStore
import cn.hutool.core.collection.ConcurrentHashSet
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.util.concurrent.CountDownLatch

private const val CLIENT_ID = "clientId"


class InMemoryMessageIdStoreTest {
    @Test
    fun nextMessageId_WhenGeneratingNextMessageId_ThenLimitShouldNotBeOverstepped() {
        val store = InMemoryMessageIdStore()

        for (i in 0..99999) {
            val nextMessageId = store.getNextMessageId(CLIENT_ID)
            println(nextMessageId)

            if (nextMessageId <= 0) {
                Assertions.fail<Any>(nextMessageId.toString() + "")
            }

            if (nextMessageId >= 65535) {
                Assertions.fail<Any>(nextMessageId.toString() + "")
            }
        }
    }

    @Test
    @Throws(InterruptedException::class)
    fun nextMessageId_WhenGettingNextIdFromDifferentThreads_ThenThreadsCannotGetTheSameId() {
        val latch = CountDownLatch(100)
        val store = InMemoryMessageIdStore()
        val msgIdSet: MutableSet<Int> = ConcurrentHashSet()

        for (i in 0..99) {
            Thread {
                for (j in 0..599) {
                    val msgId = store.getNextMessageId(CLIENT_ID)
                    println(msgId)
                    val add = msgIdSet.add(msgId)
                    if (!add) {
                        Assertions.fail<Any>("duplicate msg id. msgId=$msgId")
                    }
                }
                latch.countDown()
            }.start()
        }

        latch.await()
    }
}