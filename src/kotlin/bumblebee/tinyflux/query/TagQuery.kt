package bumblebee.tinyflux.query

import java.util.regex.Pattern


class TagQuery : BaseQuery() {

    init {
        pointAttr = "_tags"
        pathRequired = true
        hashInternal = listOf("tags")
    }

    operator fun invoke(rhs: String): SimpleQuery = this eq rhs

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

    operator fun compareTo(rhs: String): Int = error("Cannot compare TagQuery directly. Use == or != operators.")

    override fun hashCode(): Int = hashInternal?.hashCode() ?: 0

    override fun toString(): String = "TagQuery(path=$path)"

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        return true
    }

    override operator fun get(key: String): TagQuery = attr(key) as TagQuery
}