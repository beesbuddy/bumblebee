(ns bumblebee.ui.schemas
  (:require [malli.core :as m]))

(def User
  [:map
   [:id int?]
   [:name string?]])

(defn valid-user? [x]
  (m/validate User x))
