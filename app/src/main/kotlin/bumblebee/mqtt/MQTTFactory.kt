package bumblebee.mqtt

import bumblebee.core.Constants
import bumblebee.core.MqttMessagesDispatcher
import bumblebee.core.config.Config
import bumblebee.core.inner.traffic.IInnerTraffic
import bumblebee.core.inner.traffic.NoopInnerTraffic
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.processor.*
import bumblebee.core.security.IAuthManager
import bumblebee.core.store.mqtt.StoreProvider as MqttStoreProvider
import bumblebee.core.util.SslContextUtil


object MQTTFactory {
    fun createBroker(config: Config, authManager: IAuthManager, innerTraffic: IInnerTraffic): MQTTServer {
        val mqttStore = MqttStoreProvider.initialize(config)

        val sslContext = SslContextUtil.createSslContext(
            config = config.sslContextConfig,
            enableClientCA = config.sslContextConfig?.enableClientCA ?: false,
        )

        val eventsListeners = IEventsWorker.getInstance(
            listenersClassNames = config.mqttConfig.onEventWorkers ?: listOf(),
            workerConfig = config.workerConfig
        )
        val eventsWorkersExecutor = eventsListeners?.let { EventsWorkersExecutor(it) }

        val connectEventProcessor = ConnectEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
            authManager = authManager,
        )
        val disconnectEventProcessor = DisconnectEventProcessor(
            store = mqttStore,
            eventListenerExecutor = eventsWorkersExecutor,
        )
        val pubAckEventProcessor = PubAckEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
        )
        val pubCompEventProcessor = PubCompEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
        )
        val publishEventProcessor = PublishEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
            nodeName = config.mqttConfig.nodeName ?: Constants.MASTER_NODE_NAME,
            authManager = authManager,
            innerTraffic = innerTraffic,
        )
        val pubRecEventProcessor = PubRecEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
        )
        val pubRelEventProcessor = PubRelEventProcessor(
            eventsWorkersExecutor = eventsWorkersExecutor
        )
        val subscribeEventProcessor = SubscribeEventProcessor(
            store = mqttStore,
            publishEventProcessor = publishEventProcessor,
            eventListenerExecutor = eventsWorkersExecutor,
            authManager = authManager,
        )
        val unsubscribeEventProcessor = UnsubscribeEventProcessor(
            store = mqttStore,
            eventsWorkersExecutor = eventsWorkersExecutor,
        )
        val pingReqEventProcessor = PingReqEventProcessor(
            eventsWorkersExecutor = eventsWorkersExecutor
        )

        val mqttMessagesDispatcher = MqttMessagesDispatcher(
            config = config,
            store = mqttStore,
            connectEventProcessor = connectEventProcessor,
            disconnectEventProcessor = disconnectEventProcessor,
            pubAckEventProcessor = pubAckEventProcessor,
            pubCompEventProcessor = pubCompEventProcessor,
            publishEventProcessor = publishEventProcessor,
            pubRecEventProcessor = pubRecEventProcessor,
            pubRelEventProcessor = pubRelEventProcessor,
            subscribeEventProcessor = subscribeEventProcessor,
            unsubscribeEventProcessor = unsubscribeEventProcessor,
            pingReqEventProcessor = pingReqEventProcessor,
        )

        return MQTTServer(
            config = config,
            sslContext = sslContext,
            mqttMessagesDispatcher = mqttMessagesDispatcher,
        )
    }
}