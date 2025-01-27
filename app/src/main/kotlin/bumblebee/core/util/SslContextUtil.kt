package bumblebee.core.util

import bumblebee.core.config.SslContextConfig
import cn.hutool.core.io.resource.ResourceUtil
import io.netty.handler.ssl.ClientAuth
import io.netty.handler.ssl.SslContext
import io.netty.handler.ssl.SslContextBuilder
import java.security.KeyStore
import javax.net.ssl.KeyManagerFactory
import javax.net.ssl.TrustManagerFactory

/**
 * Key tool can be used to create ssl
 *
 * keytool -genkey -alias <desired certificate alias>
 * -keystore <path to keystore.pfx>
 * -storetype PKCS12
 * -keyalg RSA
 * -storepass <password>
 * -validity 730
 * -keysize 2048
 */
object SslContextUtil {
    @Throws(Exception::class)
    fun createSslContext(config: SslContextConfig?, enableClientCA: Boolean): SslContext? {
        if (config == null) {
            return null
        }

        return build(
            enableClientCA,
            config.sslKeyFilePath,
            config.sslKeyStoreType,
            config.sslManagerPwd,
            config.sslStorePwd
        )
    }

    @Throws(Exception::class)
    fun build(
        enableClientCA: Boolean,
        sslKeyFilePath: String,
        sslKeyStoreType: String,
        sslManagerPwd: String,
        sslStorePwd: String
    ): SslContext {
        ResourceUtil.getStream(sslKeyFilePath).use { ksInputStream ->
            val ks = KeyStore.getInstance(sslKeyStoreType)
            ks.load(ksInputStream, sslStorePwd.toCharArray())
            val kmf =
                KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm())
            kmf.init(ks, sslManagerPwd.toCharArray())
            val contextBuilder = SslContextBuilder.forServer(kmf)
            if (enableClientCA) {
                contextBuilder.clientAuth(ClientAuth.REQUIRE)
                val tmf =
                    TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
                tmf.init(ks)
                contextBuilder.trustManager(tmf)
            }
            return contextBuilder.build()
        }
    }
}
