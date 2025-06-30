package bumblebee.tinyflux.storage

import Point
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import java.io.File
import java.nio.file.Files
import java.time.ZonedDateTime
import java.util.zip.GZIPInputStream
import kotlin.test.Test


class RotatingCsvStorageTest {
    private lateinit var tempDir: File
    private lateinit var storage: RotatingCsvStorage

    @BeforeEach
    fun setup() {
        tempDir = Files.createTempDirectory("csvtest").toFile()
        storage = RotatingCsvStorage(tempDir.toPath())
    }

    @AfterEach
    fun tearDown() {
        storage.close()
        tempDir.deleteRecursively()
    }

    @Test
    fun `test append and load current`() {
        val point = Point(
            time = ZonedDateTime.now().minusDays(1),
            measurement = "temp",
            tags = mapOf("city" to "A"),
            fields = mapOf("v" to 1.0)
        )
        storage.insert(point)
        val loaded = storage.loadCurrent()
        assertEquals(1, loaded.size)
        assertEquals(point.measurement, loaded[0].measurement)
    }

    @Test
    fun `test data rotation`() {
        val oldPoint = Point(
            time = ZonedDateTime.now().minusDays(45),
            measurement = "humidity",
            tags = mapOf("room" to "kitchen"),
            fields = mapOf("h" to 50.0)
        )
        val newPoint = Point(
            time = ZonedDateTime.now(),
            measurement = "humidity",
            tags = mapOf("room" to "bathroom"),
            fields = mapOf("h" to 60.0)
        )
        storage.insert(oldPoint)
        storage.insert(newPoint)

        storage.rotate()

        val archivedFiles = tempDir.listFiles { f -> f.name.endsWith(".gz") }
        assertFalse(archivedFiles.isNullOrEmpty())

        val current = storage.loadCurrent()
        assertEquals(1, current.size)
        assertEquals("bathroom", current[0].tags["room"])

        val archivedContent = GZIPInputStream(archivedFiles!!.first().inputStream()).bufferedReader().readText()
        assertTrue(archivedContent.contains("kitchen"))
    }
}