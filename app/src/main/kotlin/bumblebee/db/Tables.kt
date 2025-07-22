package bumblebee.db

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.SchemaUtils
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.insertIgnore
import org.jetbrains.exposed.v1.jdbc.transactions.transaction


object Organizations : Table("organizations") {
    val id = varchar("id", 64) // you can use UUID or custom ID
    val name = varchar("name", 255)
    override val primaryKey = PrimaryKey(id)
}

object Users : Table("users") {
    val id = varchar("id", 64)
    val username = varchar("username", 64)
    val password = varchar("password", 255)
    val roleName = varchar("role_name", 64)
    val organizationId = varchar("organization_id", 64).references(Organizations.id)
    override val primaryKey = PrimaryKey(id)
}

object Roles : Table("roles") {
    val name = varchar("name", 64)
    val description = varchar("description", 255)
    override val primaryKey = PrimaryKey(name)
}

object Acls : Table("acls") {
    val id = integer("id").autoIncrement()
    val roleName = varchar("role_name", 64).references(Roles.name)
    val scope = varchar("scope", 255)
    val permission = varchar("permission", 64)
    val type = integer("type")
    override val primaryKey = PrimaryKey(id)
}

object MqttConfigs : Table("mqtt_configs") {
    val id = integer("id").autoIncrement()
    val tcpPort = integer("tcp_port")
    val hostname = varchar("hostname", 255)
    val className = varchar("class_name", 255)
    val organizationId = varchar("organization_id", 64).references(Organizations.id)
    override val primaryKey = PrimaryKey(id)
}

object EventWorkers : Table("event_workers") {
    val id = integer("id").autoIncrement()
    val className = varchar("class_name", 255)
    val organizationId = varchar("organization_id", 64).references(Organizations.id)
    override val primaryKey = PrimaryKey(id)
}

fun runOneWayMigration() {
    transaction(DbProvider.db) {
        SchemaUtils.create(
            Organizations,
            Roles,
            Acls,
            Users,
            MqttConfigs,
            EventWorkers
        )
    }

}

fun runDataSeed() {
    transaction(DbProvider.db) {
        val orgId = "bumblebee"

        Organizations.insertIgnore {
            it[id] = orgId
            it[name] = "Bumblebee"
        }

        Roles.insertIgnore {
            it[name] = "superadmin"
            it[description] = "super admin"
        }

        Acls.insert {
            it[roleName] = "superadmin"
            it[scope] = "#"
            it[permission] = "update"
            it[type] = 1
        }
        Acls.insert {
            it[roleName] = "superadmin"
            it[scope] = "#"
            it[permission] = "update"
            it[type] = 2
        }

        Users.insert {
            it[id] = "bb_91b3cc65"
            it[username] = "bumblebee"
            it[password] = "\$2a\$10\$7kQGobpxS.TKOhFfEJRj4OWVLNM2Is2zOLbuxRmwPFF9YaY/PJ1My"
            it[roleName] = "superadmin"
            it[organizationId] = orgId
        }

        MqttConfigs.insert {
            it[tcpPort] = 1883
            it[hostname] = "0.0.0.0"
            it[className] = "bumblebee.mqtt.store.InMemoryStore"
            it[organizationId] = orgId
        }

        EventWorkers.insert {
            it[className] = "bumblebee.mqtt.worker.tinyflux.OnEventWorker"
            it[organizationId] = orgId
        }
    }
}