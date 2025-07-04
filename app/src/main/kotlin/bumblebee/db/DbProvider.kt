package bumblebee.db

import org.jetbrains.exposed.v1.jdbc.Database

object DbProvider {
    val db by lazy {
        Database.connect("jdbc:sqlite:data.db", "org.sqlite.JDBC")
    }
}