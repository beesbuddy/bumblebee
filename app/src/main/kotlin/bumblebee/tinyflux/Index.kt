package bumblebee.tinyflux
import Point
import bumblebee.tinyflux.query.Query
import java.time.ZonedDateTime


class Index(private val points: List<Point>) {

    private val tagIndex: Map<String, Map<String, Set<Point>>> by lazy {
        buildTagIndex()
    }

    private val fieldIndex: Map<String, Map<Double, Set<Point>>> by lazy {
        buildFieldIndex()
    }

    private val timeIndex: Map<ZonedDateTime, Point> by lazy {
        points.associateBy { it.time }
    }

    private fun buildTagIndex(): Map<String, Map<String, Set<Point>>> {
        val result = mutableMapOf<String, MutableMap<String, MutableSet<Point>>>()
        for (point in points) {
            for ((k, v) in point.tags) {
                result.computeIfAbsent(k) { mutableMapOf() }
                    .computeIfAbsent(v) { mutableSetOf() }
                    .add(point)
            }
        }
        return result
    }

    private fun buildFieldIndex(): Map<String, Map<Double, Set<Point>>> {
        val result = mutableMapOf<String, MutableMap<Double, MutableSet<Point>>>()
        for (point in points) {
            for ((k, v) in point.fields) {
                result.computeIfAbsent(k) { mutableMapOf() }
                    .computeIfAbsent(v) { mutableSetOf() }
                    .add(point)
            }
        }
        return result
    }

    fun query(q: Query): Sequence<Point> = points.asSequence().filter { q(it) }

    fun all(): List<Point> = points

    fun byTime(time: ZonedDateTime): Point? = timeIndex[time]

    fun byTag(tagKey: String, tagValue: String): Set<Point> =
        tagIndex[tagKey]?.get(tagValue) ?: emptySet()

    fun byField(fieldKey: String, fieldValue: Double): Set<Point> =
        fieldIndex[fieldKey]?.get(fieldValue) ?: emptySet()
}
