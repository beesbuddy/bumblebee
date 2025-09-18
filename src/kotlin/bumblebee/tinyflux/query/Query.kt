package bumblebee.tinyflux.query

import bumblebee.tinyflux.Point


interface Query : (Point) -> Boolean {
    val hash: Any?
    fun isHashable(): Boolean = hash != null
}