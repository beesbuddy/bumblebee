package bumblebee.tinyflux

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter


object CsvUtils {
    private val dateFormatter = DateTimeFormatter.ISO_ZONED_DATE_TIME

    fun decodeRow(line: String): Point? {
        val parts = line.split(',')
        if (parts.size < 4) return null
        return try {
            val time = ZonedDateTime.parse(parts[0], dateFormatter)
            val measurement = parts[1]
            val tags = parts[2].split(';').filter { it.contains('=') }.associate {
                val (k, v) = it.split('=', limit = 2); k to v
            }
            val fields = parts[3].split(';').filter { it.contains('=') }.associate {
                val (k, v) = it.split('=', limit = 2); k to v.toDouble()
            }
            Point(time, measurement, tags, fields)
        } catch (_: Exception) {
            null
        }
    }

    fun encodePoint(point: Point): String {
        val time = point.time.format(dateFormatter)
        val tags = point.tags.entries.joinToString(";") { "${it.key}=${it.value}" }
        val fields = point.fields.entries.joinToString(";") { "${it.key}=${it.value}" }
        return listOf(time, point.measurement, tags, fields).joinToString(",")
    }
}