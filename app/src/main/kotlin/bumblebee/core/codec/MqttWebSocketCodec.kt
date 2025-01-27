package bumblebee.core.codec

import io.netty.buffer.ByteBuf
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.MessageToMessageCodec
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame


class MqttWebSocketCodec : MessageToMessageCodec<BinaryWebSocketFrame, ByteBuf>() {
    @Throws(Exception::class)
    override fun encode(ctx: ChannelHandlerContext, msg: ByteBuf, out: MutableList<Any>) {
        out.add(BinaryWebSocketFrame(msg.retain()))
    }

    @Throws(Exception::class)
    override fun decode(ctx: ChannelHandlerContext, msg: BinaryWebSocketFrame, out: MutableList<Any>) {
        out.add(msg.retain().content())
    }
}
