package bumblebee.core.worker

import bumblebee.core.Constants
import bumblebee.core.event.message.EventMessage
import bumblebee.core.event.message.mqtt.*
import bumblebee.core.worker.IEventsWorker.Type.*
import cn.hutool.core.thread.ThreadFactoryBuilder
import mu.KotlinLogging
import java.util.concurrent.*
import java.util.function.Consumer


private val log = KotlinLogging.logger {}

class EventsWorkersExecutor(private var eventListeners: List<IEventsWorker>) {
    companion object {
        const val THREAD_NAME_PRE = "${Constants.APP_NAME}-eventListenersExecutor-pool-"
        const val THREAD_CORE_SIZE = 10
        const val THREAD_MAX_SIZE = 200
        const val THREAD_QUEUE_SIZE = 1024
    }

    private var executorService: ExecutorService? = null

    init {
        val threadFactory = ThreadFactoryBuilder().setNamePrefix(THREAD_NAME_PRE).build()

        executorService = ThreadPoolExecutor(
            THREAD_CORE_SIZE,
            THREAD_MAX_SIZE,
            10L,
            TimeUnit.MINUTES,
            LinkedBlockingDeque(THREAD_QUEUE_SIZE),
            threadFactory
        ) { rejectedTask, _ ->
            if (rejectedTask is EventTask) {
                log.warn(
                    "Execute service reject execution for messageInfo={}, type={}",
                    rejectedTask.message.info(),
                    rejectedTask.type
                )
            }
        }
    }

    fun execute(eventMessage: EventMessage, eventType: IEventsWorker.Type) {
        eventListeners.forEach(Consumer { eventListener: IEventsWorker ->
            try {
                EventTask(
                    eventListener,
                    eventMessage,
                    eventType
                ).let {
                    executorService?.execute(
                        it
                    )
                }
            } catch (ex: Throwable) {
                log.error("Execute error.", ex)
            }
        })
    }

    fun close() {
        executorService?.shutdown()
    }

    private class EventTask(val listener: IEventsWorker, val message: EventMessage, val type: IEventsWorker.Type) :
        Runnable {
        override fun run() {
            when (type) {
                CONNECT -> listener.onConnect(message as ConnectEventMessage)
                DISCONNECT -> listener.onDisconnect(message as DisconnectEventMessage)
                CONNECTION_LOST -> listener.onConnectionLost(message as ConnectionLostEventMessage)
                PUBLISH -> listener.onPublish(message as PublishEventMessage)
                PUB_ACK -> listener.onPubAck(message as PubAckEventMessage)
                PUB_REC -> listener.onPubRec(message as PubRecEventMessage)
                PUB_REL -> listener.onPubRel(message as PubRelEventMessage)
                PUB_COMP -> listener.onPubComp(message as PubCompEventMessage)
                SUBSCRIBE -> listener.onSubscribe(message as SubscribeEventMessage)
                UNSUBSCRIBE -> listener.onUnsubscribe(message as UnsubscribeEventMessage)
                PING -> listener.onPing(message as PingEventMessage)
            }
        }
    }

}