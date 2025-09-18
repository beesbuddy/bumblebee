package bumblebee.mqtt.worker.logging

import bumblebee.core.config.WorkerConfig
import bumblebee.core.event.message.mqtt.PublishEventMessage
import bumblebee.core.util.MessageUtil
import bumblebee.core.worker.IEventsWorker
import mu.KotlinLogging
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.text.SimpleDateFormat
import java.util.*

private val log = KotlinLogging.logger {}


class OnEventWorker(var config: WorkerConfig) : IEventsWorker {
    init {
        log.info("Payload logging worker initialized")
    }

    override fun onPublish(publishMessage: PublishEventMessage?) {
        publishMessage?.let { message ->
            val payload = String(MessageUtil.readBytesAndRewind(message.payload))
            val clientId = message.clientId

            config.loggingConfig?.path?.let { pathConfig ->
                val path = Path.of(pathConfig)

                if (Files.exists(path)) {
                    appendToFile(path, clientId, payload)
                } else {
                    try {
                        Files.createDirectory(path)
                        appendToFile(path, clientId, payload)
                    } catch (e: IOException) {
                        log.error("Unable to create log directory: ", e)
                    }
                }
            }
        }
    }

    private fun appendToFile(
        path: Path,
        clientId: String,
        payload: String
    ) {
        val date = SimpleDateFormat("yyyy-MM-dd").format(Date())
        val filename = "$date $clientId"
        val file = File("${path}${File.separator}${filename}.log")
        file.createNewFile()
        val timestamp = SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(Date())
        file.appendText("$timestamp $payload${System.lineSeparator()}")
    }

    override fun close() {
    }
}