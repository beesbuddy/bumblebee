(ns bumblebee.main
  (:require [org.httpkit.server :as server]
            [clojure.pprint :refer [pprint]]
            [clojure.java.jdbc :as jdbc])
  (:gen-class))

(def db-spec {:classname   "org.sqlite.JDBC"
              :subprotocol "sqlite"
              :subname     "test.db"})

(defn test-sqlite []
  (jdbc/execute! db-spec ["CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)"])
  (jdbc/insert! db-spec :test {:name "GraalVM"}))

(defn handler
  [_]
  (let [results (jdbc/query db-spec ["SELECT * FROM test"])
        s (with-out-str (pprint results))]
    (print "test")
    {:status 200
     :headers {"Content-Type" "text/plain"}
     :body s}))

(defn -main
  "I don't do a whole lot ... yet."
  [& _args]
  (println "server started on: http://localhost:3000/")
  (test-sqlite)
  (server/run-server #'handler {:port 3000 :legacy-return-value? false}))

(comment 
  ;(server/server-stop!)

  (with-out-str (println "this should return as a string")))