package bumblebee.tinyflux

import Point
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardOpenOption
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

object TinyFlux {

    fun open(path: Path): Table {
        if (!Files.exists(path)) return Table()
        val lines = Files.readAllLines(path)
        val points = lines.drop(1).mapNotNull { CsvUtils.decodeRow(it) }
        return Table(points)
    }

    fun save(table: Table, path: Path) {
        val header = listOf("time", "measurement", "tags", "fields").joinToString(",")
        val rows = table.all().map { CsvUtils.encodePoint(it) }
        Files.write(
            path,
            listOf(header) + rows,
            StandardOpenOption.CREATE,
            StandardOpenOption.TRUNCATE_EXISTING
        )
    }
}

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
