package bumblebee.tinyflux.table

import Point
import bumblebee.tinyflux.query.Query
import kotlinx.coroutines.channels.ChannelResult

interface Table {
    fun insert(point: Point)
    fun select(query: Query? = null): List<Point>
    fun close()
}