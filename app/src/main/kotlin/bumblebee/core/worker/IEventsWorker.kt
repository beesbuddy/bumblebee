package bumblebee.core.worker

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.*
import cn.hutool.core.util.ClassLoaderUtil


interface IEventsWorker {
    companion object {
        @Volatile
        private var instance: List<IEventsWorker>? = null

        fun getInstance(listenersClassNames: List<String>, workerConfig: WorkerConfig): List<IEventsWorker>? {
            if (instance != null) {
                return instance!!
            }

            return synchronized(this) {
                if (instance != null) {
                    instance!!
                } else {

                    return listenersClassNames.map {
                        ClassLoaderUtil
                            .loadClass(it)
                            .asSubclass(IEventsWorker::class.java)
                            .getConstructor(WorkerConfig::class.java)
                            .newInstance(workerConfig)
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
