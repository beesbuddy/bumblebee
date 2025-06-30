package bumblebee.tinyflux

import bumblebee.tinyflux.query.Query
import bumblebee.tinyflux.store.RotatingCsvStore
import bumblebee.tinyflux.table.CsvTable
import bumblebee.tinyflux.table.InMemoryTable
import bumblebee.tinyflux.table.Table
import java.nio.file.Path
import java.util.concurrent.ConcurrentHashMap


class TinyFlux(
    private val table: Table
) : AutoCloseable {
    fun insert(point: Point) {
        table.insert(point)
    }
    fun select(query: Query? = null): List<Point> = table.select(query)

    companion object {
        private val instances = ConcurrentHashMap<String, TinyFlux>()

        fun withInMemory(): TinyFlux = TinyFlux(InMemoryTable())

        fun withCsv(path: Path): TinyFlux {
            val storage = RotatingCsvStore(path)
            return TinyFlux(CsvTable(storage))
        }


        fun getInstance(orgId: String, storagePath: Path): TinyFlux {
            // TODO: Implement possibility to return different TinyFlux instances
            return instances.computeIfAbsent(orgId) {
                withCsv(storagePath.resolve(orgId))
            }
        }

        fun closeInstances() {
            instances.values.forEach { it.close() }
            instances.clear()
        }

        fun closeInstance(orgId: String) {
            instances.remove(orgId)?.close()
        }
    }

    override fun close() {
        table.close()
    }
}
