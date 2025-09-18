# Bumblebee

## Usage

Run native with with:

    lein do clean, uberjar, native, run-native

## Results
`[org.httpkit.server :as server]` :white_check_mark:  
`[org.httpkit.client :as client]` :white_check_mark:

## MQTT Filters (Public API)

- Contract: a filter is a fn of one arg `(fn [event] result)`.
  - `event`: `{:type :connect|:publish|:subscribe|:unsubscribe|:pingreq|:other :ctx ChannelHandlerContext :msg MqttMessage}`
  - `result` one of:
    - `{:action :next :event event'}` continue chain (optionally mutated event)
    - `{:action :deny :reply netty-msg?}` optionally reply then close
    - `{:action :close}` close connection
    - `{:action :handled}` stop chain, do not forward

- Register programmatically:
  - `(require '[bumblebee.mqtt.filters :as fx])`
  - `(fx/add! :my/filter 10 (fn [ev] {:action :next :event ev}))`
  - Optional scoping:
    - `(fx/add! :auth 0 my.ns/auth-filter {:types #{:connect}})`
    - `(fx/add! :pub-guard 20 my.ns/guard {:types #{:publish} :when my.ns/only-on-loopback?})`

- Define via macro and register:
  - `(require '[bumblebee.mqtt.filters :refer [deffilter]])`
  - `(deffilter deny-pub {:priority 10 :types #{:publish}} (fn [ev] {:action :deny}))`

- Config-based registration (optional):
  - In `:mqtt-config` set `:filters`, e.g.:
    - `{:mqtt-config {:filters [{:name :deny-all :priority 0 :impl 'bumblebee.mqtt.filters/make-deny-all-filter :args [] :types [:connect] :validate? true}]}}`
  - Server will clear and register configured filters on startup.

### Dev Demo Filter

- Sample namespace: `dev/filters_demo.clj` provides an opt-in demo filter using both `:types` and `:when`.
- It denies `:publish` and `:subscribe` when the client is connected from loopback (127.0.0.1/::1).
  - Enable: `(require 'dev.filters-demo) (dev.filters-demo/enable!)`
  - Disable: `(dev.filters-demo/disable!)`
  - Or via helpers: `(require 'user) (user/demo-filter-on!)` / `(user/demo-filter-off!)`
