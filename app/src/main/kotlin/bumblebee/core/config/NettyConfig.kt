package bumblebee.core.config


data class NettyConfig(
    /**
     * 0 = current_processors_amount * 2
     */
    var bossThreads: Int = 4,
    /**
     * 0 = current_processors_amount * 2
     */
    var workerThreads: Int = 8,
    var epoll: Boolean = false,
    var soBacklog: Int = 1024,
    var soReuseAddress: Boolean = true,
    var tcpNoDelay: Boolean = true,
    var soSndBuf: Int = 65536,
    var soRcvBuf: Int = 65536,
    var soKeepAlive: Boolean = false,
    var channelTimeoutSeconds: Int = 200,
)
