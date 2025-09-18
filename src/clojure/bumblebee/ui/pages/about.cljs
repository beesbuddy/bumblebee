(ns bumblebee.ui.pages.about
  (:require [uix.core :refer [$ defui]]))

(defui page []
  ($ :div {:className "space-y-3"}
     ($ :h1 {:className "text-2xl font-bold"} "About (Lazy chunk)")
     ($ :p "This page was lazy-loaded via shadow.lazy when you navigated here.")))
