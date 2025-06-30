package bumblebee.worker.tinyflux

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.PublishEventMessage
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.ScopeUtil
import bumblebee.core.worker.IEventsWorker
import bumblebee.tinyflux.CsvUtils
import bumblebee.tinyflux.TinyFlux
import mu.KotlinLogging
import java.nio.file.Path
import java.time.ZonedDateTime

private val log = KotlinLogging.logger {}


// TODO: Pass auth manager.
class OnEventWorker(val config: WorkerConfig) : IEventsWorker {
    var client: TinyFlux? = null

    init {
        log.info("TinyFlux worker initialized")

        config.tinyFluxConfig?.let {
            if (null != it.organization) {
                client = TinyFlux.getInstance(it.organization!!, Path.of(it.organization!!))
            }
        }
    }

    override fun onPublish(publishMessage: PublishEventMessage?) {
        publishMessage?.let {
            config.tinyFluxConfig?.let { c ->
                if (null != c.organization && ScopeUtil.exactMatch(
                        ScopeUtil.getScopeList("${c.organization!!.lowercase()}/#"),
                        ScopeUtil.getScopeList(publishMessage.topic)
                    )
                ) {
                    val payload = String(MessageUtil.readBytesAndRewind(it.payload))
                    CsvUtils.decodeRow("${ZonedDateTime.now()},$payload")?.let { p ->
                        client?.insert(p)
                    }
                }
            }
        }
    }

    override fun close() {
        config.tinyFluxConfig?.let {
            if (null != it.organization) {
                TinyFlux.closeInstance(it.organization!!)
            }
        }
    }
}