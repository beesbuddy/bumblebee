package bumblebee.tinyflux.query

import Point

class SimpleQuery(
    private val pointAttr: String,
    private val operator: (Any?, Any?) -> Boolean,
    private val rhs: Any?,
    private val test: (Any?) -> Boolean,
    private val pathResolver: (Any?) -> Any?,
    override val hash: Any?
) : Query {
    override fun invoke(point: Point): Boolean {
        val attrValue = try {
            point.resolveAttribute(pointAttr)
        } catch (_: Exception) {
            return false
        }

        val resolved = try {
            pathResolver(attrValue)
        } catch (_: Exception) {
            return false
        }

        return test(resolved)
    }

    infix fun and(other: Query) = CompoundQuery(this, other, { a, b -> a && b }, listOf("and", hash, other.hash))

    infix fun or(other: Query) = CompoundQuery(this, other, { a, b -> a || b }, listOf("or", hash, other.hash))

    override fun hashCode(): Int = hash?.hashCode() ?: 0

    override fun equals(other: Any?): Boolean =
        other is SimpleQuery && hash == other.hash

    override fun toString(): String = "SimpleQuery($hash)"

    operator fun not() = CompoundQuery(this, null, { a, _ -> !a }, listOf("not", hash))
}