package bumblebee

import kotlin.reflect.KClass
import kotlin.reflect.full.isSubclassOf


fun <R> Throwable.multipleCatch(vararg classes: KClass<*>, block: () -> R): R {
    if (classes.any { this::class.isSubclassOf(it) }) {
        return block()
    } else throw this
}