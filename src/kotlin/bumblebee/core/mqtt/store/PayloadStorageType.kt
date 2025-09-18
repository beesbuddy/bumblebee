package bumblebee.core.mqtt.store


enum class PayloadStorageType(val value: Int) {
    NONE(0),
    INFLUXDB(1),
    DB(2);

    companion object {
        infix fun from(value: Int): PayloadStorageType? = entries.firstOrNull { it.value == value }
    }
}

enum class PayloadType(val value: Int) {
    TEXT(0),
    JSON(1),
    DIGIT(2),
    FLOAT(3);

    companion object {
        infix fun from(value: Int): PayloadType? = entries.firstOrNull { it.value == value }
    }
}
