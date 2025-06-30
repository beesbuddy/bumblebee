package bumblebee.tinyflux.query


class FieldQuery : BaseQuery() {

    init {
        pointAttr = "_fields"
        pathRequired = true
        hashInternal = listOf("fields")
    }

    fun exists(): SimpleQuery = generateSimpleQuery(
        op = { _, _ -> true },
        testAgainstRhs = false,
        rhs = null,
        args = null,
        hash = listOf(pointAttr, "exists", path)
    )

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

    infix fun ne(rhs: Any): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a != b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "!=", path, rhs)
    )

    override operator fun get(key: String): FieldQuery = attr(key) as FieldQuery
}