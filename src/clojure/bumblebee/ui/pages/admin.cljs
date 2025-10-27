(ns bumblebee.ui.pages.admin
  (:require [uix.core :refer [$ defui use-state]]
            [bumblebee.ui.api :as api]))

(defui page []
  (let [[ok? set-ok] (use-state true)
        [data set-data] (use-state nil)]
    (uix.core/use-effect
      (fn []
        ;; Example authorized call: echoes headers back from httpbin; harmless demo.
        ;; If offline, ignore failures.
        (-> (api/get-json "https://httpbin.org/anything")
            (.then set-data)
            (.catch (fn [_] (set-data #js {:note "offline or blocked"}))))
        js/undefined)
      [])
    ($ :div {:className "space-y-4"}
       ($ :h1 {:className "text-2xl font-bold"} "Admin (Guarded)")
       ($ :p "Axios instance attaches Authorization header using the mock access token.")
       (when data
         ($ :pre {:className "bg-slate-50 p-3 rounded border overflow-auto text-xs"}
            (js/JSON.stringify data nil 2)))
       ($ :button {:className "px-3 py-1 border rounded"
                   :onClick #(set-ok not)} (if ok? "Disable feature" "Enable feature"))
       (if ok?
         ($ :div {:className "p-3 rounded border bg-green-50"} "Feature enabled.")
         ($ :div {:className "p-3 rounded border bg-yellow-50"} "Feature disabled.")))))
