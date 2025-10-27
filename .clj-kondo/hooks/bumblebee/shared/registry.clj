(ns hooks.bumblebee.shared.registry
  (:require [clj-kondo.hooks-api :as api]))

(defn defregistry-analyzer [{:keys [node]}]
  (let [[_ sym _] (api/sexpr node)
        base      (name sym)
        defs      [(str base)
                   (str base "-register!")
                   (str base "-get")
                   (str base "-load-all!")
                   (str base "-impls")
                   (str base "-clear!")
                   (str base "-default-key")]]
    {:node (api/list-node
            (cons (api/token-node 'do)
                  (for [d defs]
                    (api/list-node
                     [(api/token-node 'def)
                      (api/token-node (symbol d))
                      (api/token-node nil)]))))}))