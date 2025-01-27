package bumblebee.core.util

import bumblebee.core.config.Config
import bumblebee.core.config.MqttConfig
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*


class ConfigUtilTest {
    @Test
    fun loadFromSystemProps_whenPathKeyIsEmpty_returnDefaultConfiguration() {
        val expected = Config(null);
        val actual = ConfigUtil.loadFromSystemProps(configFilePath = "", defaultConfig = expected)

        assertEquals(expected, actual)
    }

    @Test
    fun loadFromSystemProps_whenConfigClassPath_returnLoadedConfiguration() {
        val expected = Config(mqttConfig = MqttConfig(tcpPort = 1883));
        val actual = ConfigUtil.loadFromSystemProps(
            classPath = "classpath://config.properties",
            prefix = "bumblebee",
            targetType = Config::class.java,
            defaultValue = expected
        )

        assertEquals(expected.mqttConfig.tcpPort, actual.mqttConfig.tcpPort)
    }
}