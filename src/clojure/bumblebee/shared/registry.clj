(ns bumblebee.shared.registry
  (:require [clojure.string :as str]
            [clojure.java.classpath :as cp]
            [clojure.java.io :as io]
            [clojure.tools.namespace.find :as ns-find])
  (:import (clojure.lang Namespace)))

(defn- ns->module-key
  "Default key from ns. E.g. bumblebee.auth.password => :password"
  [^Namespace ns prefix]
  (-> (name (ns-name ns))
      (subs (inc (count prefix)))
      (str/split #"\.")
      (first)
      (keyword)))

(defn make-registry
  "Returns a registry with fns:
   :register! (k ctor-fn)
   :get (k & [ctor-args-map])
   :load-all! ()
   :impls () ; registered keys
   :clear! () ; clear instances cache

  opts:
   :prefix  (required)  e.g. \"myapp.auth\"
   :key-fn  (optional)  (fn [{:keys [ns name]}] -> k). Defaults to module-based key.
   :cache?  (optional)  default true"
  [{:keys [prefix key-fn cache?]
    :or   {cache? true}}]
  (assert (string? prefix) ":prefix (string) is required")
  (let [reg*    (atom {})   ;; k -> ctor-fn
        objs*   (atom {})   ;; k -> constructed instance
        key-fn' (or key-fn
                    (fn [{:keys [ns]}]
                      (ns->module-key ns prefix)))]
    {:register!
     (fn register! [k ctor-fn]
       (when (contains? @reg* k)
         (throw (ex-info "Duplicate registration" {:key k :prefix prefix})))
       (swap! reg* assoc k ctor-fn)
       k)

     :get
     (fn fetch
       ([k] (fetch k {}))
       ([k args]
         (if cache?
           (if-some [x (clojure.core/get @objs* k)]
             x
             (let [ctor (clojure.core/get @reg* k)]
               (when-not ctor
                 (throw (ex-info "Not implemented" {:key k :prefix prefix})))
               (let [inst (ctor args)]
                 (swap! objs* assoc k inst)
                 inst)))
           ;; no cache: always construct
           (let [ctor (clojure.core/get @reg* k)]
             (when-not ctor
               (throw (ex-info "Not implemented" {:key k :prefix prefix})))
             (ctor args)))))

     :load-all!
     (fn load-all! []
       ;; scan classpath roots for all namespaces under prefix and require them
       (let [prefix-path (str/replace prefix "." "/")] 
         (doseq [^java.io.File root (cp/classpath-directories)]
           (let [dir (io/file root prefix-path)]
             (when (and (.exists dir) (.isDirectory dir))
               (doseq [ns-sym (ns-find/find-namespaces-in-dir dir)]
                 (require ns-sym))))))
       :ok)

     :impls
     (fn impls [] (keys @reg*))

     :clear!
     (fn clear! [] (reset! objs* {}) :ok)

     ;; expose a helper to compute a default key for the *current* ns
     :default-key
     (fn default-key
       ([] (key-fn' {:ns *ns* :name nil}))
       ([ns-sym] (key-fn' {:ns (the-ns ns-sym) :name nil})))}))

(defn bind-deps
  "Returns a get* that always injects deps under :deps.

  - Provided `deps` are nested into the constructor args as `:deps`.
  - If call-time args already include `:deps`, they are merged with the bound
    deps, with call-time keys taking precedence.
  - Other top-level args are passed through unchanged."
  [registry deps]
  (fn get* [k & [args]]
    (let [args (or args {})
          merged-deps (merge deps (or (:deps args) {}))
          args' (assoc args :deps merged-deps)]
      ((:get registry) k args'))))


;; (defmacro defregistry
;;   ;;   "Defines a var REG bound to a registry and three convenience fns:
;;   ;;    (REG-register! k ctor)
;;   ;;    (REG-get k & [args])
;;   ;;    (REG-load-all!)
;;   ;;    (REG-impls)
;;   ;;    (REG-clear!)
;;   ;;    (REG-default-key)
;;   [sym opts]
;;   (let [base (symbol (str sym))
;;         reg  (symbol (str base))]
;;     `(do
;;        ;; Defer construction until first use at runtime
;;        (defonce ~reg
;;          (delay (bumblebee.shared.registry/make-registry ~opts))) 
;;        (def ~(symbol (str base "-register!")) (:register! ~reg))
;;        (def ~(symbol (str base "-get"))       (:get ~reg))
;;        (def ~(symbol (str base "-load-all!")) (:load-all! ~reg))
;;        (def ~(symbol (str base "-impls"))     (:impls ~reg))
;;        (def ~(symbol (str base "-clear!"))    (:clear! ~reg))
;;        (def ~(symbol (str base "-default-key")) (:default-key ~reg)))))


(defmacro defregistry
  [sym opts]
  (let [base (symbol (str sym))
        reg  (symbol (str base))]
    `(do
       ;; Defer construction until first use at runtime:
       (defonce ~reg
         (delay (bumblebee.shared.registry/make-registry ~opts)))

       ;; Accessors deref the delay:
       (defn ~(symbol (str base "-register!")) [k ctor-fn]
         ((:register! @~reg) k ctor-fn))

       (defn ~(symbol (str base "-get")) ([k] ((:get @~reg) k))
         ([k args] ((:get @~reg) k args)))

       (defn ~(symbol (str base "-load-all!")) [] ((:load-all! @~reg)))
       (defn ~(symbol (str base "-impls"))     [] ((:impls     @~reg)))
       (defn ~(symbol (str base "-clear!"))    [] ((:clear!    @~reg)))
       (defn ~(symbol (str base "-default-key"))
         ([]      ((:default-key @~reg)))
         ([ns-sym] ((:default-key @~reg) ns-sym))))))
