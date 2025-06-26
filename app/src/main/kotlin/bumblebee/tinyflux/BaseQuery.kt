package bumblebee.tinyflux

abstract class BaseQuery {
    protected var pointAttr: String? = null
    protected val path: MutableList<Any> = mutableListOf()
    protected var pathRequired: Boolean = false
    protected var hashValueInternal: Any? = null

    val hashValue: Any?
        get() = hashValueInternal

    fun isHashable(): Boolean = hashValueInternal != null

    open operator fun get(key: String): BaseQuery = attr(key)

    open fun attr(key: String): BaseQuery {
        if (!pathRequired) throw RuntimeException("This query does not require a key.")
        val newQuery = this::class.constructors.first().call()
        newQuery.pointAttr = this.pointAttr
        newQuery.pathRequired = this.pathRequired
        newQuery.path.addAll(this.path + key)
        newQuery.hashValueInternal = listOf("path", newQuery.path)
        return newQuery
    }

    @Suppress("UNCHECKED_CAST")
    fun generateSimpleQuery(
        op: (Any?, Any?) -> Boolean,
        testAgainstRhs: Boolean,
        rhs: Any?,
        args: List<Any>?,
        hash: Any?
    ): SimpleQuery {
        if (pathRequired && path.isEmpty()) throw RuntimeException("Query has no path.")
        if (pointAttr == null) throw RuntimeException("Query has no defined Point attribute.")

        val test = { x: Any? ->
            try {
                if (!testAgainstRhs) args?.firstOrNull()?.let { op(x, it) } ?: op(x, null)
                else op(x, rhs)
            } catch (e: Exception) {
                false
            }
        }

        val pathResolver = { value: Any? ->
            path.fold(value) { acc, key ->
                when (key) {
                    is String -> (acc as? Map<*, *>)?.get(key)
                    is Function1<*, *> -> (key as (Any?) -> Any?).invoke(acc)
                    else -> throw RuntimeException("Unsupported path segment: $key")
                }
            }
        }

        return SimpleQuery(pointAttr!!, op, rhs, test, pathResolver, if (isHashable()) hash else null)
    }
}