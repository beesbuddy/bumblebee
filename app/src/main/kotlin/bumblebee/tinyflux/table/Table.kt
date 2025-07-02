package bumblebee.tinyflux.table

import bumblebee.tinyflux.Point
import bumblebee.tinyflux.query.Query


interface Table {
    fun insert(point: Point)
    fun select(query: Query? = null): List<Point>
    fun close()
}

enum class TableType {
    IN_MEMORY,
    CSV,
    SQL_LITE;
}