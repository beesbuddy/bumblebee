(ns bumblebee.ui.chunks
  (:require
   [bumblebee.ui.pages.about :as about]
   [bumblebee.ui.pages.admin :as admin]
   [bumblebee.ui.pages.home :as home]
   [bumblebee.ui.pages.mqtt-lab :as mqtt-lab]
   [bumblebee.ui.pages.login :as login]))

;; Eager variants of the pages (no code-splitting) to avoid module loader issues.
(def Home  home/page)
(def About about/page)
(def Admin admin/page)
(def MqttLab mqtt-lab/page)
(def Login login/page)

;; Preload no-ops (keeps navbar calls intact)
(defn preload-home []  nil)
(defn preload-about [] nil)
(defn preload-admin [] nil)
(defn preload-mqtt [] nil)
(defn preload-login [] nil)
