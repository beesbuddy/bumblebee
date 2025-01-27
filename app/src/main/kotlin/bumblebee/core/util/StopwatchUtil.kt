package bumblebee.core.util

import kotlin.concurrent.Volatile


class Stopwatch private constructor() {
    private var startTime = 0L
    private var elapsedMills = 0L

    @Volatile
    var isRunning = false
        private set

    fun stop(): Stopwatch {
        isRunning = false
        elapsedMills = System.currentTimeMillis() - startTime
        return this
    }

    fun reset(): Stopwatch {
        elapsedMills = 0L
        isRunning = false
        return this
    }

    fun elapsedMills(): Long {
        return if (isRunning) System.currentTimeMillis() - startTime else elapsedMills
    }

    companion object {
        fun start(): Stopwatch {
            val stopWatch = Stopwatch()
            stopWatch.startTime = System.currentTimeMillis()
            stopWatch.isRunning = true
            return stopWatch
        }
    }
}
