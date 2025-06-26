package bumblebee.tinyflux

import Point

class CompoundQuery(
    private val query1: Query,
    private val query2: Query?,
    private val logic: (Boolean, Boolean) -> Boolean,
    override val hashValue: Any?
) : Query {

    override fun invoke(point: Point): Boolean {
        val result1 = query1(point)
        val result2 = query2?.invoke(point) ?: false
        return logic(result1, result2)
    }

    override fun hashCode(): Int = hashValue?.hashCode() ?: 0

    override fun equals(other: Any?): Boolean =
        other is CompoundQuery && hashValue == other.hashValue

    override fun toString(): String =
        if (query2 != null) "CompoundQuery(logic, ${query1::class.simpleName}, ${query2::class.simpleName})"
        else "CompoundQuery(logic, ${query1::class.simpleName})"

    operator fun not() = CompoundQuery(this, null, { a, _ -> !a }, listOf("not", hashValue))

    infix fun and(other: Query) = CompoundQuery(this, other, { a, b -> a && b }, listOf("and", hashValue, other.hashValue))

    infix fun or(other: Query) = CompoundQuery(this, other, { a, b -> a || b }, listOf("or", hashValue, other.hashValue))
}