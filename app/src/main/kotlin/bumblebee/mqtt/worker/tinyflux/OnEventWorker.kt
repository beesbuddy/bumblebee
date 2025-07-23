package bumblebee.mqtt.worker.tinyflux

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.PublishEventMessage
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.ScopeUtil
import bumblebee.core.worker.IEventsWorker
import bumblebee.tinyflux.CsvUtils
import bumblebee.tinyflux.TinyFlux
import bumblebee.tinyflux.table.TableType
import mu.KotlinLogging
import java.nio.file.Path
import java.time.ZonedDateTime

private val log = KotlinLogging.logger {}


// TODO: Pass auth manager.
class OnEventWorker(val config: WorkerConfig) : IEventsWorker {
    val client: TinyFlux? by lazy {
        if (null != config.tinyFluxConfig?.organization && null != config.tinyFluxConfig?.path) {
            TinyFlux.getInstance(TableType.CSV, config.tinyFluxConfig!!.organization!!, Path.of(config.tinyFluxConfig!!.path!!))
        } else {
            null
        }
    }

    init {
        log.info("TinyFlux worker initialized")
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