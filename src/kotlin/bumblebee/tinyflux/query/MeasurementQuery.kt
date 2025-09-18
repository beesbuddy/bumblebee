package bumblebee.tinyflux.query


class MeasurementQuery : BaseQuery() {
    init {
        pointAttr = "_measurement"
        pathRequired = false
        hashInternal = listOf("measurement")
    }

    fun eq(rhs: String): SimpleQuery = generateSimpleQuery(
        op = { a, b -> a == b },
        testAgainstRhs = true,
        rhs = rhs,
        args = null,
        hash = listOf(pointAttr, "==", path, rhs)
    )
}
