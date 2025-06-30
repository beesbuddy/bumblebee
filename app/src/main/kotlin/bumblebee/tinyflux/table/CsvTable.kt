package bumblebee.tinyflux.table

import Point
import bumblebee.tinyflux.Index
import bumblebee.tinyflux.query.Query
import bumblebee.tinyflux.storage.RotatingCsvStorage
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

class CsvTable(private val storage: RotatingCsvStorage, scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob())) : AutoCloseable, Table  {
    private val queryCache = mutableMapOf<Query, List<Point>>()
    private val insertChannel = Channel<Point>(capacity = Channel.UNLIMITED)
    private val index: Index
        get() = Index(storage.loadCurrent())

    private val job = scope.launch {
        for (point in insertChannel) {
            storage.insert(point)
            queryCache.clear()
        }
    }

    override fun insert(point: Point) {
        point.validate()
        insertChannel.trySend(point)
    }

    override fun select(query: Query?): List<Point> {
        if (query == null) return storage.loadCurrent().sortedBy { it.time }

        if (query.isHashable()) {
            queryCache[query]?.let { return it }
        }

        val result = index.query(query).sortedBy { it.time }.toList()

        if (query.isHashable()) {
            queryCache[query] = result
        }

        return result
    }

    override fun close() {
        runBlocking {
            insertChannel.close()
            job.join()
        }
        storage.close()
    }

}