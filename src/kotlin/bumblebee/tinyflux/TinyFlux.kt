package bumblebee.tinyflux

import bumblebee.tinyflux.query.Query
import bumblebee.tinyflux.store.RotatingCsvStore
import bumblebee.tinyflux.table.CsvTable
import bumblebee.tinyflux.table.InMemoryTable
import bumblebee.tinyflux.table.Table
import bumblebee.tinyflux.table.TableType
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

        fun getInstance(type: TableType, orgId: String, storagePath: Path): TinyFlux {
            return instances.computeIfAbsent(orgId) {
                when (type) {
                    TableType.IN_MEMORY -> withInMemory()
                    TableType.CSV -> withCsv(storagePath.resolve(orgId))
                    TableType.SQL_LITE -> TODO()
                }
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
