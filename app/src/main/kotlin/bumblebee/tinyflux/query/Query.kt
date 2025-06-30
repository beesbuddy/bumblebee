package bumblebee.tinyflux.query

import Point


interface Query : (Point) -> Boolean {
    val hash: Any?
    fun isHashable(): Boolean = hash != null
}