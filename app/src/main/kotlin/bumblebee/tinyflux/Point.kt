package bumblebee.tinyflux

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter


data class Point(
    val time: ZonedDateTime,
    val measurement: String,
    val tags: Map<String, String> = emptyMap(),
    val fields: Map<String, Double> = emptyMap()
) {

    fun validate() {
        require(measurement.isNotBlank()) { "Measurement must not be blank." }
        require(fields.isNotEmpty()) { "At least one field is required." }
        fields.forEach { (key, _) ->
            require(key.isNotBlank()) { "Field key must not be blank." }
            require(true) { "Field value must be a number." }
        }
        tags.forEach { (key, value) ->
            require(key.isNotBlank() && value.isNotBlank()) { "Tag key and value must not be blank." }
        }
    }

    operator fun get(key: String): Any? = tags[key] ?: fields[key]

    fun toCsvRow(): List<String> = listOf(
        time.format(DateTimeFormatter.ISO_ZONED_DATE_TIME),
        measurement,
        tags.entries.joinToString(";") { "${it.key}=${it.value}" },
        fields.entries.joinToString(";") { "${it.key}=${it.value}" }
    )

    companion object {
        fun fromCsvRow(row: List<String>): Point {
            val (timeStr, measurement, tagStr, fieldStr) = row
            val time = ZonedDateTime.parse(timeStr, DateTimeFormatter.ISO_ZONED_DATE_TIME)
            val tags = tagStr.split(';').filter { it.contains('=') }.associate {
                val (k, v) = it.split('=', limit = 2)
                k to v
            }
            val fields = fieldStr.split(';').filter { it.contains('=') }.associate {
                val (k, v) = it.split('=', limit = 2)
                k to v.toDouble()
            }
            return Point(time, measurement, tags, fields)
        }
    }

    fun resolveAttribute(attr: String): Any? = when (attr) {
        "_time" -> time
        "_measurement" -> measurement
        "_tags" -> tags
        "_fields" -> fields
        else -> throw IllegalArgumentException("Unknown attribute: $attr")
    }
}
