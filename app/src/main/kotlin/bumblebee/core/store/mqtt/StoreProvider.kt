package bumblebee.core.store.mqtt

import bumblebee.core.config.Config
import bumblebee.core.config.IConfig
import cn.hutool.core.util.ClassLoaderUtil


abstract class StoreProvider(override val config: Config) : IConfig {
    companion object {
        @Volatile
        private var instance: IStore? = null

        fun initialize(config: Config): IStore {
            if (instance != null) {
                return instance!!
            }

            return synchronized(this) {
                if (instance != null) {
                    instance!!
                } else {
                    ClassLoaderUtil
                        .loadClass(config.mqttConfig.storeClass)
                        .asSubclass(IStore::class.java)
                        .getConstructor(Config::class.java)
                        .newInstance(config)
                }
            }
        }
    }
}