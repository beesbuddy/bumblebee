package bumblebee.tinyflux

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

typealias TagSet = Map<String, String?>
typealias FieldSet = Map<String, Number?>

fun validateTags(tags: Any?) {
    require(tags is Map<*, *>) { "Tag set must be a mapping." }
    require(tags.keys.all { it is String }) { "Tag keys must be strings." }
    require(tags.values.all { it == null || it is String }) { "Tag values must be strings or null." }
}

fun validateFields(fields: Any?) {
    require(fields is Map<*, *>) { "Field set must be a mapping." }
    require(fields.keys.all { it is String }) { "Field keys must be strings." }
    require(fields.values.all { it == null || (it is Number && it !is Boolean) }) {
        "Field values must be numeric or null, and not booleans."
    }
}

class Point(
    time: ZonedDateTime? = ZonedDateTime.now(),
    measurement: String = DEFAULT_MEASUREMENT,
    tags: TagSet = emptyMap(),
    fields: FieldSet = emptyMap()
) {
    companion object {
        private const val NONE = "_none"
        const val DEFAULT_MEASUREMENT = "_default"

        private const val TAG_PREFIX = "_tag_"
        private const val FIELD_PREFIX = "_field_"
        private const val TAG_COMPACT = "t_"
        private const val FIELD_COMPACT = "f_"

        fun deserializeFromList(row: List<String>): Point {
            val time = ZonedDateTime.parse(row[0])
            val measurement = row[1]
            val tags = mutableMapOf<String, String?>()
            val fields = mutableMapOf<String, Number?>()

            var i = 2
            while (i < row.size && (row[i].startsWith(TAG_PREFIX) || row[i].startsWith(TAG_COMPACT))) {
                val key = row[i].removePrefix(TAG_PREFIX).removePrefix(TAG_COMPACT)
                val value = if (row[i + 1] == NONE) null else row[i + 1]
                tags[key] = value
                i += 2
            }

            while (i < row.size) {
                val key = row[i].removePrefix(FIELD_PREFIX).removePrefix(FIELD_COMPACT)
                val strVal = row[i + 1]
                val value = strVal.toIntOrNull() ?: strVal.toDoubleOrNull()
                fields[key] = value
                i += 2
            }

            return Point(time, measurement, tags, fields)
        }
    }

    var time: ZonedDateTime? = time
        set(value) {
            require(value != null) { "Time must not be null." }
            field = value
        }

    var measurement: String = measurement
        set(value) {
            require(value.isNotBlank()) { "Measurement must be a non-blank string." }
            field = value
        }

    var tags: TagSet = tags
        set(value) {
            validateTags(value)
            field = value
        }

    var fields: FieldSet = fields
        set(value) {
            validateFields(value)
            field = value
        }

    override fun toString(): String {
        val tagStr = tags.entries.joinToString("; ") { "${it.key}:${it.value}" }
        val fieldStr = fields.entries.joinToString("; ") { "${it.key}:${it.value}" }
        return "Point(time=${time?.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME)}, " +
                "measurement=$measurement" +
                (if (tagStr.isNotEmpty()) ", tags=$tagStr" else "") +
                (if (fieldStr.isNotEmpty()) ", fields=$fieldStr" else "") + ")"
    }

    fun serializeToList(compact: Boolean = false): List<String> {
        val tagPrefix = if (compact) TAG_COMPACT else TAG_PREFIX
        val fieldPrefix = if (compact) FIELD_COMPACT else FIELD_PREFIX

        val timeStr = time?.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME) ?: NONE
        val measStr = measurement.ifBlank { NONE }

        val tagList = tags.flatMap {
            listOf("$tagPrefix${it.key}", it.value ?: NONE)
        }

        val fieldList = fields.flatMap {
            listOf("$fieldPrefix${it.key}", it.value?.toString() ?: NONE)
        }

        return listOf(timeStr, measStr) + tagList + fieldList
    }

    override fun equals(other: Any?): Boolean {
        return other is Point &&
                this.time == other.time &&
                this.measurement == other.measurement &&
                this.tags == other.tags &&
                this.fields == other.fields
    }

    override fun hashCode(): Int {
        return listOf(time, measurement, tags, fields).hashCode()
    }
}
