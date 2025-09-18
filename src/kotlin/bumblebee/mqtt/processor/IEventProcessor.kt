package bumblebee.mqtt.processor

import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.mqtt.MqttMessage


interface IEventProcessor<T : MqttMessage> {
    fun process(ctx: ChannelHandlerContext, message: T)
}