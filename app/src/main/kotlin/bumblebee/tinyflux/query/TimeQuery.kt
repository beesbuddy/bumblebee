package bumblebee.tinyflux.query

import java.time.ZonedDateTime


class TimeQuery : BaseQuery() {
    init {
        pointAttr = "_time"
        pathRequired = false
        hashInternal = listOf("time")
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