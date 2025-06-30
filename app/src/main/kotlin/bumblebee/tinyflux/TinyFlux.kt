package bumblebee.tinyflux

import bumblebee.tinyflux.query.Query
import bumblebee.tinyflux.store.RotatingCsvStore
import bumblebee.tinyflux.table.CsvTable
import bumblebee.tinyflux.table.InMemoryTable
import bumblebee.tinyflux.table.Table
import java.nio.file.Path


class TinyFlux(
    private val table: Table
) : AutoCloseable {
    fun insert(point: Point) {
        table.insert(point)
    }
    fun select(query: Query? = null): List<Point> = table.select(query)

    companion object {
        fun withInMemory(): TinyFlux = TinyFlux(InMemoryTable())

        fun withCsv(path: Path): TinyFlux {
            val storage = RotatingCsvStore(path)
            return TinyFlux(CsvTable(storage))
        }
    }

    override fun close() {
        table.close()
    }
}
