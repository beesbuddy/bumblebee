(defproject bumblebee "0.1.0-SNAPSHOT"
  :description "Simple MQTT and dashboard based project for small IoT with simplicity in mind"

  ;; :global-vars {*warn-on-reflection* true}

  :managed-dependencies
  [[io.netty/netty-codec-http "4.1.121.Final"]
   [io.netty/netty-codec "4.1.121.Final"]
   [io.netty/netty-handler-proxy "4.1.121.Final"]
   [io.netty/netty-codec-socks "4.1.121.Final"]
   [io.netty/netty-handler "4.1.121.Final"]
   [io.netty/netty-resolver-dns "4.1.121.Final"]
   [io.netty/netty-codec-dns "4.1.121.Final"]
   [io.netty/netty-resolver "4.1.121.Final"]
   [io.netty/netty-transport-native-epoll "4.1.121.Final"]
   [io.netty/netty-common "4.1.121.Final"]
   [io.netty/netty-transport-native-unix-common "4.1.121.Final"]
   [io.netty/netty-transport "4.1.121.Final"]
   [io.netty/netty-codec-mqtt "4.1.121.Final"]
   [io.netty/netty-buffer "4.1.121.Final"]]

  :dependencies [[org.clojure/clojure "1.12.1"]
                 [http-kit "2.5.2"]
                 [io.netty/netty-codec-http]
                 [io.netty/netty-codec]
                 [io.netty/netty-handler-proxy]
                 [io.netty/netty-codec-socks]
                 [io.netty/netty-handler]
                 [io.netty/netty-resolver-dns]
                 [io.netty/netty-codec-dns]
                 [io.netty/netty-resolver]
                 [io.netty/netty-transport-native-epoll]
                 [io.netty/netty-common]
                 [io.netty/netty-transport-native-unix-common]
                 [io.netty/netty-transport]
                 [io.netty/netty-codec-mqtt]
                 [io.netty/netty-buffer]
                 [org.clojure/java.jdbc "0.7.12"]
                 [com.github.clj-easy/graal-build-time "1.0.5"]
                 [org.bouncycastle/bcpkix-jdk18on "1.78.1"]
                 [org.clojure/clojurescript "1.12.42"]
                 [thheller/shadow-cljs "3.2.0"]
                 [com.pitch/uix.core "1.4.4"]
                 [com.pitch/uix.dom "1.4.4"]
                 [metosin/reitit-frontend "0.7.2"]
                 [metosin/malli "0.16.1"]
                 [binaryage/devtools "1.0.7"]
                 [org.xerial/sqlite-jdbc "3.50.3.0"]]


  :main bumblebee.main

  :uberjar-name "bumblebee.jar"

  :test-paths ["test/clojure"]
  :test-selectors

  {:all (constantly true)
   :ci  (complement :skip-ci)}

  :plugins [[thheller/shadow-cljs "3.2.0"]]

  :repl-options {:init-ns user :host "0.0.0.0" :port 7888}

  :source-paths ["src/clojure"]
  :resource-paths ["resources" "test-resources"]

  :profiles {:provided {:dependencies [[org.clojure/clojure "1.12.2"]]}
             :c1.12.1    {:dependencies [[org.clojure/clojure "1.12.1"]]}
             
             :uberjar {:aot [bumblebee.main]} 

             :nrepl
             {:plugins
              [[cider/cider-nrepl         "0.57.0"]
               [mx.cider/enrich-classpath "1.19.3"]]}

             :dev {:java-source-paths ["test/java" "src/java"]
                   :resource-paths    ["dev-resources", "test-resources"]
                   :source-paths ["dev"]
                   :dependencies
                   [[ring/ring-core                 "1.14.2"]
                    [ring/ring-jetty-adapter        "1.14.2"]
                    [ring/ring-defaults              "0.6.0"]
                    [ring-request-proxy             "0.1.11"]
                    [ring-basic-authentication       "1.2.0"]
                    [org.clojure/data.codec          "0.2.0"]
                    [junit/junit                    "4.13.2"]
                    [org.clojure/tools.logging       "1.3.0"]
                    [org.clojure/tools.namespace     "1.4.4"]
                    [hawk                            "0.2.11"]
                    [ch.qos.logback/logback-classic "1.5.18"]
                    [clj-http                       "3.13.1"]
                    [org.clojure/data.json           "2.5.1"]
                    [http.async.client               "1.3.0"]
                    [hato                            "1.0.0"]
                    [compojure                       "1.7.1"]
                    [org.clojure/tools.cli         "1.1.230"]]
                   :plugins [[lein-pprint  "1.3.2"]
                             [lein-ancient "0.7.0"]
                             [com.taoensso.forks/lein-codox "0.10.11"] [lein-shell "0.5.0"]]}}
  :aliases {:run {:main-opts ["-m" "bumblebee.main"]}
            "start-dev"       ["with-profile" "+dev,+nrepl" "repl" ":headless"]
            "test-all"        ["do" ["test" ":all"]]
            "test-ci"         ["do" ["test" ":ci"]]})
