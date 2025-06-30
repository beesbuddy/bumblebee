package bumblebee.tinyflux.table

import Point
import bumblebee.tinyflux.Index
import bumblebee.tinyflux.query.Query
import kotlinx.coroutines.channels.ChannelResult


class InMemoryTable(points: List<Point> = emptyList()): AutoCloseable, Table {
    private val points = mutableListOf<Point>().apply { addAll(points) }
    private val queryCache = mutableMapOf<Query, List<Point>>()
    private val index: Index
        get() = Index(points)

    override fun insert(point: Point) {
        point.validate()
        points.add(point)
        queryCache.clear()
    }

    override fun select(query: Query?): List<Point> {
        if (query == null) return points.sortedBy { it.time }

        if (query.isHashable()) {
            queryCache[query]?.let { return it }
        }

        val result = index.query(query).sortedBy { it.time }.toList()

        if (query.isHashable()) {
            queryCache[query] = result
        }

        return result
    }

    fun clear() {
        points.clear()
        queryCache.clear()
    }

    fun count(): Int = points.size

    fun all(): List<Point> = points.toList()

    override fun close() {
    }
}
