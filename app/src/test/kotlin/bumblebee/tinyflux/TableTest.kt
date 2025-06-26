package bumblebee.tinyflux

import Point
import org.junit.jupiter.api.Assertions.*
import java.time.ZonedDateTime
import kotlin.test.Test

class TableTests {
    private fun stubSamplePoints(): List<Point> {
        val t1 = ZonedDateTime.parse("2024-01-01T00:00:00Z")
        val t2 = ZonedDateTime.parse("2024-01-02T00:00:00Z")
        val t3 = ZonedDateTime.parse("2024-01-03T00:00:00Z")
        return listOf(
            Point(t1, "weather", mapOf("city" to "LA"), mapOf("temp" to 70.0)),
            Point(t2, "weather", mapOf("city" to "NYC"), mapOf("temp" to 32.0)),
            Point(t3, "weather", mapOf("city" to "LA"), mapOf("temp" to 55.0))
        )
    }

    @Test
    fun testInsertAndSelectAll() {
        val table = Table()
        stubSamplePoints().forEach { table.insert(it) }
        val all = table.select()
        assertEquals(3, all.size)
    }

    @Test
    fun testEqQueryByTag() {
        val table = Table(stubSamplePoints())
        val q = TagQuery()["city"]
        val result = table.select(q eq "LA")
        assertEquals(2, result.size)
        assertTrue(result.all { it.tags["city"] == "LA" })
    }
    @Test
    fun testNeQueryByTag() {
        val table = Table(stubSamplePoints())
        val q = TagQuery()["city"]
        val result = table.select(q ne "LA")
        assertEquals(1, result.size)
        assertTrue(result.all { it.tags["city"] != "LA" })
    }

    @Test
    fun testQueryByTime() {
        val table = Table(stubSamplePoints())
        val date = ZonedDateTime.parse("2024-01-02T00:00:00Z")
        val q = TimeQuery()
        val result = table.select(q lt date)
        assertEquals(1, result.size)
    }

    @Test
    fun testCompoundQuery() {
        val table = Table(stubSamplePoints())
        val tempQ = FieldQuery()["temp"] lt 60.0
        val cityQ = TagQuery()["city"] eq "NYC"
        val result = table.select(tempQ and cityQ)
        assertEquals(1, result.size)
        assertEquals("NYC", result[0].tags["city"])
    }
}