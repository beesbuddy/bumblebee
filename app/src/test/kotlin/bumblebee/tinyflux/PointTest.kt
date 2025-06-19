package bumblebee.tinyflux

import kotlin.test.*
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

class PointTest {

    @Test
    fun testToString() {
        val t = ZonedDateTime.now().truncatedTo(ChronoUnit.SECONDS)
        val point = Point(
            time = t,
            measurement = "m",
            tags = mapOf("a" to "b", "c" to "d"),
            fields = mapOf("my_field" to 3.0)
        )
        val expected = "Point(time=${t.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME)}, measurement=m, tags=a:b; c:d, fields=my_field:3.0)"
        assertEquals(expected, point.toString())
    }

    @Test
    fun testTagValidation() {
        assertFailsWith<IllegalArgumentException> { validateTags(42) }
        assertFailsWith<IllegalArgumentException> { validateTags(mapOf(1 to "a")) }
        assertFailsWith<IllegalArgumentException> { validateTags(mapOf("a" to 123)) }
        validateTags(mapOf("a" to "b")) // should pass
    }

    @Test
    fun testFieldValidation() {
        assertFailsWith<IllegalArgumentException> { validateFields("abc") }
        assertFailsWith<IllegalArgumentException> { validateFields(mapOf("a" to "non-numeric")) }
        assertFailsWith<IllegalArgumentException> { validateFields(mapOf("a" to true)) }
        validateFields(mapOf("a" to 123.45)) // should pass
    }

    @Test
    fun testEquality() {
        val t = ZonedDateTime.now().truncatedTo(ChronoUnit.SECONDS)
        val p1 = Point(time = t, tags = mapOf("k" to "v"), fields = mapOf("x" to 1.0))
        val p2 = Point(time = t, tags = mapOf("k" to "v"), fields = mapOf("x" to 1.0))
        val p3 = Point(time = t, tags = mapOf("a" to "b"), fields = mapOf("x" to 2.0))
        assertEquals(p1, p2)
        assertNotEquals(p1, p3)
    }

    @Test
    fun testSerialization() {
        val t = ZonedDateTime.now().truncatedTo(ChronoUnit.SECONDS)
        val point = Point(
            time = t,
            measurement = "cities",
            tags = mapOf("city" to "la"),
            fields = mapOf("temp_f" to 75.1, "population" to 15000000)
        )
        val expected = listOf(
            t.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME),
            "cities",
            "_tag_city", "la",
            "_field_temp_f", "75.1",
            "_field_population", "15000000"
        )
        assertEquals(expected.toString(), point.serializeToList().toString())
    }

    @Test
    fun testDeserialization() {
        val t = ZonedDateTime.now().truncatedTo(ChronoUnit.SECONDS)
        val row = listOf(
            t.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME),
            "cities",
            "_tag_city", "la",
            "_field_temp_f", "75.1",
            "_field_population", "15000000"
        )
        val point = Point.deserializeFromList(row)
        val expected = Point(
            time = t,
            measurement = "cities",
            tags = mapOf("city" to "la"),
            fields = mapOf("temp_f" to 75.1, "population" to 15000000)
        )
        assertEquals(expected.toString(), point.toString())
    }
}
