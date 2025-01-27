package bumblebee.core.security

import bumblebee.core.config.SecurityConfig
import cn.hutool.core.util.ClassLoaderUtil


abstract class AuthManagerProvider {
    companion object {
        @Volatile
        private var instance: IAuthManager? = null

        fun initialize(config: SecurityConfig): IAuthManager {
            if (instance != null) {
                return instance!!
            }

            return synchronized(this) {
                if (instance != null) {
                    instance!!
                } else {
                    ClassLoaderUtil
                        .loadClass(config.authManagerClass)
                        .asSubclass(IAuthManager::class.java)
                        .getConstructor(SecurityConfig::class.java)
                        .newInstance(config)
                }
            }
        }
    }
}
