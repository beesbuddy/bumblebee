package bumblebee.core.util

import bumblebee.core.Constants
import bumblebee.core.config.Config
import cn.hutool.core.util.CharsetUtil
import cn.hutool.core.util.StrUtil
import cn.hutool.setting.dialect.Props


object ConfigUtil {
    fun loadFromSystemProps(configFilePath: String, defaultConfig: Config): Config {
        if (StrUtil.isBlank(configFilePath)) {
            return defaultConfig
        }

        val props = Props.getProp(configFilePath, CharsetUtil.CHARSET_UTF_8)

        return props.toBean(Config::class.java)
    }

    fun <T> loadFromSystemProps(
        classPath: String,
        prefix: String = Constants.APP_CONFIG_PROPS_PRE,
        targetType: Class<T>?,
        defaultValue: T
    ): T {
        val props = Props.getProp(classPath, CharsetUtil.CHARSET_UTF_8)

        return if (props.isEmpty) {
            defaultValue
        } else props.toBean(targetType, prefix)
    }
}
