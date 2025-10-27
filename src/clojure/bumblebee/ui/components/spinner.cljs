(ns bumblebee.ui.components.spinner
  (:require [uix.core :refer [$ defui]]))

(defui spinner [{:keys [label]}]
  ($ :div {:className "flex items-center gap-3 text-slate-600"}
     ($ :div {:className "h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"})
     ($ :span (or label "Loading…"))))
