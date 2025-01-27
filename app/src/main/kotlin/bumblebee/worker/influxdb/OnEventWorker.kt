package bumblebee.worker.influxdb

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.PublishEventMessage
import bumblebee.core.util.MessageUtil
import bumblebee.core.util.ScopeUtil
import bumblebee.core.worker.IEventsWorker
import bumblebee.multipleCatch
import com.influxdb.client.domain.WritePrecision
import com.influxdb.client.kotlin.InfluxDBClientKotlin
import com.influxdb.client.kotlin.InfluxDBClientKotlinFactory
import com.influxdb.exceptions.BadRequestException
import kotlinx.coroutines.runBlocking
import mu.KotlinLogging
import java.lang.IndexOutOfBoundsException

private val log = KotlinLogging.logger {}


// TODO: Pass auth manager.
class OnEventWorker(val config: WorkerConfig) : IEventsWorker {
    var client: InfluxDBClientKotlin? = null

    init {
        log.info("InfluxDb worker initialized")

        config.influxDbConfig?.let {
            if (null != it.host && null != it.token && null != it.organization) {
                client = InfluxDBClientKotlinFactory.create(
                    it.host!!, it.token!!.toCharArray(), it.organization!!,
                )
            }
        }
    }

    override fun onPublish(publishMessage: PublishEventMessage?) {
        publishMessage?.let {
            config.influxDbConfig?.let { c ->
                // TODO: Implement logic for this worker when a database arrive. By clientId and topic find all acl for
                // topic and save only if permission exists
                if (null != c.organization && ScopeUtil.exactMatch(
                        ScopeUtil.getScopeList("${c.organization!!.lowercase()}/#"),
                        ScopeUtil.getScopeList(publishMessage.topic)
                    )
                ) {
                    val payload = String(MessageUtil.readBytesAndRewind(it.payload))
                    runBlocking { writeData(payload) }
                }
            }
        }
    }

    private suspend fun writeData(data: String) {
        client?.let {
            try {
                val writeApi = it.getWriteKotlinApi()
                writeApi.writeRecord(data, WritePrecision.NS, "apiaries") // TODO: pass bucket dynamically here
            } catch (e: Exception) {
                e.multipleCatch(BadRequestException::class, IndexOutOfBoundsException::class) {
                    log.error("Failed to write data: {}", e.message)
                }
            }
        }
    }
}