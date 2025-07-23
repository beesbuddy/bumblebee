package bumblebee.streams

import kotlinx.coroutines.flow.MutableSharedFlow
import java.util.concurrent.ConcurrentHashMap

object MetricsStreamRegistry {
    private val orgFlows = ConcurrentHashMap<String, MutableSharedFlow<String>>()

    fun getOrCreateFlow(org: String): MutableSharedFlow<String> =
        orgFlows.computeIfAbsent(org) { MutableSharedFlow(extraBufferCapacity = 100) }

    // TODO: Use it when org (user/client) is removed
    fun removeFlow(org: String) {
        orgFlows.remove(org)
    }
}
