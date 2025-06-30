package bumblebee.tinyflux.query

import Point

interface Query : (Point) -> Boolean {
    val hashValue: Any?
    fun isHashable(): Boolean = hashValue != null
}