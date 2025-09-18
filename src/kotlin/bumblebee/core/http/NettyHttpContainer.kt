package bumblebee.core.http

import jakarta.ws.rs.core.Application
import org.glassfish.jersey.server.ApplicationHandler
import org.glassfish.jersey.server.ResourceConfig
import org.glassfish.jersey.server.spi.Container
import org.glassfish.jersey.spi.ExecutorServiceProvider
import org.glassfish.jersey.spi.ScheduledExecutorServiceProvider
import java.util.concurrent.ExecutorService
import java.util.concurrent.ScheduledExecutorService
import kotlin.concurrent.Volatile


class NettyHttpContainer(application: Application?) : Container {
    @Volatile
    private var appHandler: ApplicationHandler

    init {
        appHandler = ApplicationHandler(application)
        appHandler.onStartup(this)
    }

    override fun getConfiguration(): ResourceConfig {
        return appHandler.configuration
    }

    override fun getApplicationHandler(): ApplicationHandler {
        return appHandler
    }

    override fun reload() {
        reload(ResourceConfig(appHandler.configuration))
    }

    override fun reload(configuration: ResourceConfig) {
        appHandler.onShutdown(this)
        appHandler = ApplicationHandler(configuration)
        appHandler.onReload(this)
        appHandler.onStartup(this)
    }

    val executorService: ExecutorService
        get() = appHandler.injectionManager.getInstance(ExecutorServiceProvider::class.java).executorService

    val scheduledExecutorService: ScheduledExecutorService
        get() = appHandler.injectionManager.getInstance(
            ScheduledExecutorServiceProvider::class.java
        ).executorService
}
