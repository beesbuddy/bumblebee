package bumblebee.tinyflux

import java.time.ZonedDateTime
import java.util.regex.Pattern
import kotlin.let

class TagQuery : BaseQuery() {

    init {
        pointAttr = "_tags"
        pathRequired = true
        hashValueInternal = listOf("tags")
    }

    fun exists(): SimpleQuery = generateSimpleQuery(
        op = { _, _ -> true },
        testAgainstRhs = false,
        rhs = null,
        args = null,
        hash = listOf(pointAttr, "exists", path)
    )

    fun matches(regex: String, flags: Int = 0): SimpleQuery = generateSimpleQuery(
        op = { v, _ -> Pattern.compile(regex, flags).matcher(v.toString()).matches() },
        testAgainstRhs = false,
        rhs = null,
        args = null,
        hash = listOf(pointAttr, "matches", path, regex)
    )

    fun search(regex: String, flags: Int = 0): SimpleQuery = generateSimpleQuery(
        op = { v, _ -> Pattern.compile(regex, flags).matcher(v.toString()).find() },
        testAgainstRhs = false,
        rhs = null,
        args = null,
        hash = listOf(pointAttr, "search", path, regex)
    )

    operator fun compareTo(rhs: String): Int = error("Cannot compare TagQuery directly. Use == or != operators.")

    override fun hashCode(): Int = hashValueInternal?.hashCode() ?: 0
    override fun toString(): String = "TagQuery(path=$path)"

    operator fun invoke(rhs: String): SimpleQuery = this eq rhs

    infix fun eq(rhs: String): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a == b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "==", path, rhs)
    )

    infix fun ne(rhs: String): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a != b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "!=", path, rhs)
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        return true
    }

    override operator fun get(key: String): TagQuery = attr(key) as TagQuery
}


class FieldQuery : BaseQuery() {

    init {
        pointAttr = "_fields"
        pathRequired = true
        hashValueInternal = listOf("fields")
    }

    fun exists(): SimpleQuery = generateSimpleQuery(
        op = { _, _ -> true },
        testAgainstRhs = false,
        rhs = null,
        args = null,
        hash = listOf(pointAttr, "exists", path)
    )

    override operator fun get(key: String): FieldQuery = attr(key) as FieldQuery

    infix fun lt(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? Comparable<Any>)?.let { it < b!! } ?: false },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "<", path, rhs)
    )

    infix fun lte(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? Comparable<Any>)?.let { it <= b!! } ?: false },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "<=", path, rhs)
    )

    infix fun gt(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? Comparable<Any>)?.let { it > b!! } ?: false },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, ">", path, rhs)
    )

    infix fun gte(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? Comparable<Any>)?.let { it >= b!! } ?: false },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, ">=", path, rhs)
    )

    infix fun eq(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a == b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "==", path, rhs)
    )

    infix fun neq(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a != b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "!=", path, rhs)
    )
}

class TimeQuery : BaseQuery() {
    init {
        pointAttr = "_time"
        pathRequired = false
        hashValueInternal = listOf("time")
    }

    infix fun lt(rhs: ZonedDateTime): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? ZonedDateTime)?.isBefore(b as ZonedDateTime) == true },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "<", path, rhs)
    )

    infix fun gt(rhs: ZonedDateTime): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? ZonedDateTime)?.isAfter(b as ZonedDateTime) == true },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, ">", path, rhs)
    )

    infix fun eq(rhs: ZonedDateTime): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? ZonedDateTime)?.isEqual(b as ZonedDateTime) == true },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "==", path, rhs)
    )

    infix fun ne(rhs: ZonedDateTime): SimpleQuery = generateSimpleQuery(
        op = { a, b -> (a as? ZonedDateTime)?.isEqual(b as ZonedDateTime) != true },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "!=", path, rhs)
    )
}

class MeasurementQuery : BaseQuery() {
    init {
        pointAttr = "_measurement"
        pathRequired = false
        hashValueInternal = listOf("measurement")
    }

    fun eq(rhs: String): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a == b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "==", path, rhs)
    )
}
