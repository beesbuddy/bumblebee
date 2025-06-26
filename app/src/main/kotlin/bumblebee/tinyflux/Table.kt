package bumblebee.tinyflux

import Point

class Table(points: List<Point> = emptyList()) {

    private val points = mutableListOf<Point>().apply { addAll(points) }
    private val queryCache = mutableMapOf<Query, List<Point>>()
    private val index: Index
        get() = Index(points)

    fun insert(point: Point) {
        point.validate()
        points.add(point)
        queryCache.clear() // invalidate cache
    }

    fun insertMany(newPoints: List<Point>) {
        newPoints.forEach { it.validate() }
        points.addAll(newPoints)
        queryCache.clear()
    }

    fun select(query: Query? = null): List<Point> {
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
}
