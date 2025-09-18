package bumblebee.core.worker

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.*
import cn.hutool.core.util.ClassLoaderUtil


interface IEventsWorker: AutoCloseable {
    companion object {
        @Volatile
        private var instance: List<IEventsWorker>? = null

        fun getInstance(workers: List<WorkerConfig>): List<IEventsWorker>? {
            if (instance != null) {
                return instance!!
            }

            return synchronized(this) {
                if (instance != null) {
                    instance!!
                } else {

                    return workers.mapNotNull {
                        workerConfig ->
                        workerConfig.tinyFluxConfig?.let {
                            return@mapNotNull ClassLoaderUtil
                                .loadClass(it.className)
                                .asSubclass(IEventsWorker::class.java)
                                .getConstructor(WorkerConfig::class.java)
                                .newInstance(workerConfig)
                        }

                        workerConfig.loggingConfig?.let {
                            return@mapNotNull ClassLoaderUtil
                                .loadClass(it.className)
                                .asSubclass(IEventsWorker::class.java)
                                .getConstructor(WorkerConfig::class.java)
                                .newInstance(workers)
                        }
                    }
                }
            }
        }
    }

    fun onConnect(connectMessage: ConnectEventMessage?) {}
    fun onDisconnect(disconnectMessage: DisconnectEventMessage?) {}
    fun onConnectionLost(connectionLostMessage: ConnectionLostEventMessage?) {}
    fun onPublish(publishMessage: PublishEventMessage?) {}
    fun onPubAck(pubAckEventMessage: PubAckEventMessage?) {}
    fun onPubRec(pubRecEventMessage: PubRecEventMessage?) {}
    fun onPubRel(pubRelEventMessage: PubRelEventMessage?) {}
    fun onPubComp(pubCompEventMessage: PubCompEventMessage?) {}
    fun onSubscribe(subscribeMessage: SubscribeEventMessage?) {}
    fun onUnsubscribe(unsubscribeMessage: UnsubscribeEventMessage?) {}
    fun onPing(pingEventMessage: PingEventMessage?) {}

    enum class Type {
        CONNECT,
        DISCONNECT,
        CONNECTION_LOST,
        PUBLISH,
        PUB_ACK,
        PUB_REC,
        PUB_REL,
        PUB_COMP,
        SUBSCRIBE,
        UNSUBSCRIBE,
        PING
    }
}
