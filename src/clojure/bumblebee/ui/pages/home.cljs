(ns bumblebee.ui.pages.home
  (:require [uix.core :refer [$ defui use-state use-effect]]
            ["axios" :as axios]
            [bumblebee.ui.schemas :as s]))

(defui user-card [{:keys [id name]}]
  ($ :div {:className "rounded border p-3"}
     ($ :div {:className "text-sm text-slate-500"} (str "ID: " id))
     ($ :div {:className "font-semibold"} name)))

(defui heading []
  ($ :div
     ($ :h1 {:className "text-2xl font-bold"} "Home")
     ($ :p "JWT mock demo. Login, then watch token badge in the navbar auto-refresh.")))

(defui page []
  (let [[users set-users] (use-state [])
        [count set-count] (use-state 0)]
    (use-effect
     (fn []
       (.. axios (get "https://jsonplaceholder.typicode.com/users")
           (then
            (fn [resp]
              (let [users (:data (js->clj resp :keywordize-keys true))]
                (set-users (filterv #(s/valid-user? %) users)))))))
     [])

    ($ :div {:className "space-y-4"}
       (heading)
       ($ :div {:className "flex items-center gap-2"}
          ($ :button {:className "px-3 py-1 border rounded"
                      :onClick #(set-count inc)} "Increment")
          ($ :span (str "Count: " count))
          ($ :button {:className "px-3 py-1 border rounded"
                      :onClick #(set-count (constantly 0))} "Reset"))
       ($ :div {:className "grid md:grid-cols-2 lg:grid-cols-3 gap-3"}
          (for [u users]
            ($ user-card {:key (:id u) :id (:id u) :name (:name u)}))))))
