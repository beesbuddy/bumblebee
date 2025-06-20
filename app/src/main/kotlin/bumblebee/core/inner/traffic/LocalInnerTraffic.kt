package bumblebee.core.inner.traffic

import bumblebee.core.event.message.mqtt.CommonPublishMessage
import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.MutableSharedFlow

class LocalInnerTraffic(private val nodeName: String): IInnerTraffic {
    val publishedMessages = MutableSharedFlow<CommonPublishMessage?>(onBufferOverflow = BufferOverflow.DROP_OLDEST)

    override suspend fun publish(message: CommonPublishMessage?) {
        publishedMessages.emit(message)
    }
}