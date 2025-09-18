(ns hooks.bumblebee.registry
  (:require [clj-kondo.hooks-api :as api]))

(defn- def-form [sym expr]
  (api/list-node
   [(api/token-node 'def)
    (api/token-node sym)
    expr]))

(defn- prop-expr [kw reg-sym]
  (api/list-node
   [(api/keyword-node kw)
    (api/token-node reg-sym)]))

(defn defregistry [{:keys [node]}]
  (let [[_ sym-node opts-node] (:children node)
        reg-sym (api/sexpr sym-node)
        reg-name (str reg-sym)
        make-name (fn [suffix] (symbol (str reg-name suffix)))
        make-def (fn [suffix expr]
                   (def-form (make-name suffix) expr))
        reg-def (def-form reg-sym
                            (api/list-node
                             [(api/token-node 'bumblebee.registry/make-registry)
                              opts-node]))
        defs [reg-def
              (make-def "-register!" (prop-expr :register! reg-sym))
              (make-def "-get"       (prop-expr :get reg-sym))
              (make-def "-load-all!" (prop-expr :load-all! reg-sym))
              (make-def "-impls"     (prop-expr :impls reg-sym))
              (make-def "-clear!"    (prop-expr :clear! reg-sym))
              (make-def "-default-key" (prop-expr :default-key reg-sym))]]
    {:node (api/list-node (cons (api/token-node 'do) defs))}))
