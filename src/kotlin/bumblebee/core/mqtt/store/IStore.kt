package bumblebee.core.mqtt.store

import bumblebee.core.config.IConfig

interface IStore: IConfig, IMessageIdStore, IDupPubMessageStore,
    IDupPubRelMessageStore, ISessionStore, ISubscriptionStore, IRetainMessageStore, IClosableStore