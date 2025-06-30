package bumblebee.tinyflux

import Point
import bumblebee.tinyflux.query.FieldQuery
import bumblebee.tinyflux.query.TagQuery
import bumblebee.tinyflux.query.TimeQuery
import bumblebee.tinyflux.table.InMemoryTable
import org.junit.jupiter.api.Assertions.*
import java.time.ZonedDateTime
import kotlin.test.Test

class TableTests {
    @Test
    fun testInsertAndSelectAll() {
        val inMemoryTable = InMemoryTable()
        stubSamplePoints().forEach { inMemoryTable.insert(it) }
        val all = inMemoryTable.select()
        assertEquals(3, all.size)
    }

    @Test
    fun testEqQueryByTag() {
        val inMemoryTable = InMemoryTable(stubSamplePoints())
        val q = TagQuery()["city"]
        val result = inMemoryTable.select(q eq "LA")
        assertEquals(2, result.size)
        assertTrue(result.all { it.tags["city"] == "LA" })
    }
    @Test
    fun testNeQueryByTag() {
        val inMemoryTable = InMemoryTable(stubSamplePoints())
        val q = TagQuery()["city"]
        val result = inMemoryTable.select(q ne "LA")
        assertEquals(1, result.size)
        assertTrue(result.all { it.tags["city"] != "LA" })
    }

    @Test
    fun testQueryByTime() {
        val inMemoryTable = InMemoryTable(stubSamplePoints())
        val date = ZonedDateTime.parse("2024-01-02T00:00:00Z")
        val q = TimeQuery()
        val result = inMemoryTable.select(q lt date)
        assertEquals(1, result.size)
    }

    @Test
    fun testCompoundQuery() {
        val inMemoryTable = InMemoryTable(stubSamplePoints())
        val tempQ = FieldQuery()["temp"]
        val cityQ = TagQuery()["city"]
        val result = inMemoryTable.select((tempQ lt 60.0) and (cityQ eq "NYC"))
        assertEquals(1, result.size)
        assertEquals("NYC", result[0].tags["city"])
    }

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
}