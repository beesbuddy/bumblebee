package bumblebee.mqtt.processor

import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.DisconnectEventMessage
import bumblebee.core.mqtt.store.IStore
import bumblebee.core.store.mqtt.*
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.util.NettyUtil
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage
import mu.KotlinLogging

private val log = KotlinLogging.logger {}


class DisconnectEventProcessor(
    private val store: IStore,
    private val eventListenerExecutor: EventsWorkersExecutor?,
) : IEventProcessor<MqttMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttMessage) {
        val channel: Channel = ctx.channel()
        channel.flush()

        val clientId: String = NettyUtil.clientId(channel)
        val userName: String = NettyUtil.userName(channel)
        val remoteIp = NettyUtil.getRemoteIp(channel)

        log.debug("Disconnection: clientId={}, userName={}, remoteIp={}", clientId, userName, remoteIp)

        val clientSession: ClientSession? = store.getSession(clientId)

        if (null == clientSession) {
            channel.close()
            return
        }

        if (!clientSession.isSameChannel(channel)) {

            log.warn(
                "Another client is not using the same session. Closing connection: clientId={}, userName={}, remoteId={}",
                clientId,
                userName,
                remoteIp,
            )

            clientSession.closeChannel()
            return
        }

        if (clientSession.cleanSession) {
            store.removeAllSubscriptions(clientId)
            store.removeAllDupPubMessages(clientId)
            store.removeAllDupPubRelMessages(clientId)
        }

        clientSession.closeChannel()
        store.removeSession(clientId)
        eventListenerExecutor?.execute(DisconnectEventMessage(clientId, userName), IEventsWorker.Type.DISCONNECT)
    }
}
