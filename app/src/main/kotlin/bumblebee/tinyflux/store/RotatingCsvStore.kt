package bumblebee.tinyflux.store

import bumblebee.tinyflux.Point
import bumblebee.tinyflux.CsvUtils
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardOpenOption
import java.time.Duration
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.zip.GZIPInputStream
import java.util.zip.GZIPOutputStream
import kotlin.io.path.exists
import kotlin.io.path.fileSize


class RotatingCsvStore(
    private val baseDir: Path,
    private val activeFile: Path = baseDir.resolve("data.csv"),
    private val timeThreshold: Duration = Duration.ofDays(30),
    private val maxPointsPerHour: Int = Int.MAX_VALUE
) : AutoCloseable {

    private val formatter = DateTimeFormatter.ofPattern("yyyy-MM")
    private val scheduler = Executors.newSingleThreadScheduledExecutor()
    private val hourlyCount = mutableMapOf<ZonedDateTime, Int>()

    init {
        Files.createDirectories(baseDir)
        if (!activeFile.exists()) {
            Files.writeString(activeFile, "time,measurement,tags,fields\n")
        }
        startScheduler()
    }

    @Synchronized
    fun insert(point: Point) {
        val hour = point.time.truncatedTo(ChronoUnit.HOURS)

        val count = hourlyCount.getOrDefault(hour, 0)

        if (count >= maxPointsPerHour) {
            return
        }

        hourlyCount[hour] = count + 1

        Files.newBufferedWriter(activeFile, StandardOpenOption.APPEND).use {
            it.write(CsvUtils.encodePoint(point) + "\n")
        }
    }

    fun insertMany(points: Iterable<Point>) {
        Files.newBufferedWriter(activeFile, StandardOpenOption.APPEND).use { writer ->
            points.forEach { writer.write(CsvUtils.encodePoint(it) + "\n") }
        }
    }

    fun overwriteAll(points: Iterable<Point>) {
        Files.newBufferedWriter(activeFile, StandardOpenOption.TRUNCATE_EXISTING).use { writer ->
            writer.write("time,measurement,tags,fields\n")
            points.forEach { writer.write(CsvUtils.encodePoint(it) + "\n") }
        }
    }

    fun loadCurrent(): List<Point> =
        Files.newBufferedReader(activeFile).useLines { lines ->
            lines.drop(1).mapNotNull(CsvUtils::decodeRow).toList()
        }

    fun loadArchive(month: String): List<Point> {
        val gzPath = baseDir.resolve("archive-$month.csv.gz")
        if (!gzPath.exists()) return emptyList()
        return GZIPInputStream(Files.newInputStream(gzPath)).bufferedReader().useLines { lines ->
            lines.drop(1).mapNotNull(CsvUtils::decodeRow).toList()
        }
    }

    fun rotate() {
        val now = ZonedDateTime.now()
        val cutoff = now.minus(timeThreshold)

        val lines = Files.readAllLines(activeFile)
        if (lines.size <= 1) return

        val (header, rows) = lines.first() to lines.drop(1)

        val (archived, retained) = rows.partition { row ->
            val timeStr = row.split(",").firstOrNull() ?: return@partition false
            try {
                ZonedDateTime.parse(timeStr).isBefore(cutoff)
            } catch (_: Exception) {
                false
            }
        }

        if (archived.isNotEmpty()) {
            val archiveName = "archive-${cutoff.format(formatter)}.csv.gz"
            val archiveFile = baseDir.resolve(archiveName)

            GZIPOutputStream(Files.newOutputStream(archiveFile,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND)).bufferedWriter().use { out ->
                if (!archiveFile.exists() || archiveFile.fileSize() == 0L) {
                    out.write(header + "\n")
                }
                archived.forEach { row -> out.write(row + "\n") }
            }

            Files.newBufferedWriter(activeFile, StandardOpenOption.TRUNCATE_EXISTING).use {
                it.write(header + "\n")
                retained.forEach { row -> it.write(row + "\n") }
            }
        }
    }

    private fun startScheduler() {
        scheduler.scheduleAtFixedRate(::rotate, 1, 1, TimeUnit.DAYS)
    }

    fun shutdown() {
        scheduler.shutdown()
    }

    override fun close() {
        scheduler.shutdown()
        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow()
            }
        } catch (ex: InterruptedException) {
            scheduler.shutdownNow()
            Thread.currentThread().interrupt()
        }
    }
}