package bumblebee.core.processor

import bumblebee.core.Constants
import bumblebee.core.client.ClientSession
import bumblebee.core.event.message.mqtt.CommonPublishMessage
import bumblebee.core.event.message.mqtt.ConnectEventMessage
import bumblebee.core.worker.EventsWorkersExecutor
import bumblebee.core.worker.IEventsWorker
import bumblebee.core.security.AuthManagerProvider
import bumblebee.core.security.IAuthManager
import bumblebee.core.store.mqtt.*
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.NettyUtil
import bumblebee.core.util.Stopwatch
import cn.hutool.core.util.StrUtil
import io.netty.buffer.Unpooled
import io.netty.channel.Channel
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.*
import io.netty.handler.timeout.IdleStateHandler
import mu.KotlinLogging

private val log = KotlinLogging.logger {}


class ConnectEventProcessor(
    private val store: IStore,
    private val eventsWorkersExecutor: EventsWorkersExecutor?,
    private val authManager: IAuthManager,
) : IEventProcessor<MqttConnectMessage> {
    override fun process(ctx: ChannelHandlerContext, message: MqttConnectMessage) {
        val channel = ctx.channel()
        val remoteIp = NettyUtil.getRemoteIp(channel)
        val payload = message.payload()
        val clientId = payload.clientIdentifier()
        val stopwatch = Stopwatch.start()

        log.debug(
            "Try to connect as clientId={}, userName={}, remoteIp={}",
            clientId,
            payload.userName(),
            remoteIp
        )

        if (!validClientId(clientId)) {
            channel.writeAndFlush(MessageUtil.buildConnectAckMessage(MqttConnectReturnCode.CONNECTION_REFUSED_IDENTIFIER_REJECTED))
            channel.close()

            log.error("Error while connecting. ClientId is empty and remoteIp={}", remoteIp)

            return
        }

        val variableHeader = message.variableHeader()

        if (!validVersion(variableHeader.version())) {
            channel.writeAndFlush(MessageUtil.buildConnectAckMessage(MqttConnectReturnCode.CONNECTION_REFUSED_UNACCEPTABLE_PROTOCOL_VERSION))
            channel.close()

            log.error(
                "MQTT version not supported: version={}, clientId={}, userName={}, remoteIdp={}",
                variableHeader.version(),
                clientId,
                payload.userName(),
                remoteIp
            )

            return
        }

        val userName = payload.userName() ?: ""
        val password = String(payload.passwordInBytes() ?: byteArrayOf())

        if (!authManager.isAuthenticated(
                clientId = clientId,
                userName = userName,
                password = password
            )
        ) {
            channel.writeAndFlush(MessageUtil.buildConnectAckMessage(MqttConnectReturnCode.CONNECTION_REFUSED_BAD_USER_NAME_OR_PASSWORD))
            channel.close()

            log.warn(
                "Unauthorized user: clientId={}, userName={}, remoteIp={}",
                clientId,
                payload.userName(),
                remoteIp
            )

            return
        }

        resetKeepAliveTimeout(channel, message)
        handleOldSession(clientId)
        store.removeSession(clientId)

        log.debug(
            "Handle and remove old session: clientId={},userName={},timeCost={}ms",
            clientId,
            payload.userName(),
            stopwatch.elapsedMills()
        )

        var willMessage: MqttPublishMessage? = null
        if (variableHeader.isWillFlag) {
            willMessage = MqttMessageFactory.newMessage(
                MqttFixedHeader(
                    MqttMessageType.PUBLISH,
                    false,
                    MqttQoS.valueOf(variableHeader.willQos()),
                    variableHeader.isWillRetain,
                    0
                ),
                MqttPublishVariableHeader(payload.willTopic(), 0),
                Unpooled.buffer().writeBytes(payload.willMessageInBytes())
            ) as MqttPublishMessage

            log.debug(
                "Store will message: clientId={}, userName={}, timeCost={}ms",
                clientId,
                payload.userName(),
                stopwatch.elapsedMills()
            )
        }

        val cleanSession = variableHeader.isCleanSession

        val newClientSession = ClientSession(
            channel,
            clientId,
            userName,
            cleanSession,
            willMessage,
            message.variableHeader().keepAliveTimeSeconds()
        )

        if (cleanSession) {
            store.removeAllSubscriptions(clientId)
            store.removeAllDupPubMessages(clientId)
            store.removeAllDupPubRelMessages(clientId)

            log.debug(
                "Remove all store debug for clean session: clientId={}, userName={}, timeCost={}ms",
                clientId,
                payload.userName(),
                stopwatch.elapsedMills()
            )
        }

        store.addSession(newClientSession)

        log.debug(
            "Store new session: clientId={}, userName={}, timeCost={}ms",
            clientId,
            payload.userName(),
            stopwatch.elapsedMills()
        )

        NettyUtil.clientInfo(channel!!, clientId, userName)
        val connectResp: MqttConnAckMessage =
            MessageUtil.buildConnectAckMessage(MqttConnectReturnCode.CONNECTION_ACCEPTED, !cleanSession)
        channel.writeAndFlush(connectResp)

        log.debug(
            "Ack successfully. clientId={}, userName={}, timeCost={}ms",
            clientId,
            payload.userName(),
            stopwatch.elapsedMills()
        )

        if (!cleanSession) {
            sendDupMessage(channel, clientId)

            log.debug(
                "Send qos1&2 message for no ack. clientId={}, userName={}, timeCost={}ms",
                clientId,
                payload.userName(),
                stopwatch.elapsedMills()
            )
        }

        log.debug(
            "End processing connection for clientId={}, userName={}, remoteIp={}, timeCost={}ms",
            clientId,
            payload.userName(),
            remoteIp,
            stopwatch.elapsedMills()
        )

        eventsWorkersExecutor?.execute(ConnectEventMessage(message), IEventsWorker.Type.CONNECT)
    }

    private fun handleOldSession(clientId: String) {
        store.getSession(clientId)?.closeChannel()

        log.debug("Closed old channel for clientId={}", clientId)
    }

    private fun validClientId(clientId: String?): Boolean {
        return StrUtil.isNotBlank(clientId)
    }

    private fun validVersion(version: Int): Boolean {
        var valid = false

        for (mqttVersion in MqttVersion.entries) {
            if (mqttVersion.protocolLevel().toInt() == version) {
                valid = true
                break
            }
        }

        return valid
    }

    private fun sendDupMessage(channel: Channel, clientId: String) {
        val pubMsgList = store.getDupPubMessages(clientId)

        pubMsgList.forEach { msg ->
            if (msg != null) {
                val fixedHeader =
                    MqttFixedHeader(MqttMessageType.PUBLISH, true, MqttQoS.valueOf(msg.mqttQoS), false, 0)
                val variableHeader =
                    MqttPublishVariableHeader(msg.topic, msg.messageId)

                channel.writeAndFlush(
                    MqttPublishMessage(
                        fixedHeader,
                        variableHeader,
                        Unpooled.buffer().writeBytes(msg.messageBody?.toByteArray())
                    )
                )

                log.debug(
                    "Send dup message: clientId={}, topic={}, createTime={}",
                    clientId,
                    msg.topic,
                    msg.createTimeStr
                )
            }

        }

        val pubRelMsgList: List<CommonPublishMessage?> = store.getDupPubRelMessages(clientId)

        pubRelMsgList.forEach { msg ->
            if (msg != null) {
                channel.writeAndFlush(MessageUtil.buildPubRelMessage(msg.messageId, true))
                log.debug(
                    "Send dup publish release message: clientId={}, messageId={}, createTime={}",
                    clientId,
                    msg.messageId,
                    msg.createTimeStr
                )
            }

        }
    }

    private fun resetKeepAliveTimeout(channel: Channel, msg: MqttConnectMessage) {
        val keepAliveTimeSeconds = msg.variableHeader().keepAliveTimeSeconds()
        if (keepAliveTimeSeconds > 0) {
            if (channel.pipeline().names().contains(Constants.HANDLER_IDLE_STATE)) {
                channel.pipeline().remove(Constants.HANDLER_IDLE_STATE)
            }
            val finalKeepAliveTimeSeconds = Math.round(keepAliveTimeSeconds * 1.5f)
            channel.pipeline().addFirst(
                Constants.HANDLER_IDLE_STATE, IdleStateHandler(
                    0,
                    0,
                    finalKeepAliveTimeSeconds
                )
            )
        }
    }
}