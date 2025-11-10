(ns bumblebee.ui.layout
  (:require
   [bumblebee.ui.chunks :as chunks]
   [bumblebee.ui.router :as router]
   [clojure.string :as str]
   [uix.core :refer [$ defui use-effect use-state]]))

(def ^:private drawer-id "dashboard-drawer")

(defn- icon [paths]
  ($ :svg {:xmlns "http://www.w3.org/2000/svg"
           :viewBox "0 0 24 24"
           :className "h-5 w-5"
           :stroke "currentColor"
           :fill "none"
           :strokeWidth "1.5"}
     (map-indexed
       (fn [idx attrs]
         ($ :path (merge {:strokeLinecap "round"
                          :strokeLinejoin "round"
                          :key idx}
                         attrs)))
       paths)))

(defn- home-icon []
  (icon [{:d "M3 11.25L12 4l9 7.25V20a1 1 0 0 1-1 1h-5.5a.5.5 0 0 1-.5-.5V15h-6v5.5a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1z"}]))

(defn- about-icon []
  (icon [{:d "M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5z"}
         {:d "M12 8.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"}
         {:d "M10.75 12.5h2.5v5h-2.5z"}]))

(defn- admin-icon []
  (icon [{:d "M12 4.5 18.5 7v4.75c0 4.69-3.14 8.88-6.5 9.75-3.36-.87-6.5-5.06-6.5-9.75V7z"}
         {:d "M10.5 13.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"}]))

(defn- lab-icon []
  (icon [{:d "M8 4.5h8"}
         {:d "M10.5 4.5v6.86L6.7 19a1.75 1.75 0 0 0 1.5 2.63h7.6a1.75 1.75 0 0 0 1.5-2.63l-3.8-7.64V4.5"}]))

(def ^:private nav-items
  [{:route :home
    :label "Home"
    :preload chunks/preload-home
    :icon home-icon}
   {:route :about
    :label "About"
    :preload chunks/preload-about
    :icon about-icon}
   {:route :admin
    :label "Admin"
    :preload chunks/preload-admin
    :icon admin-icon}
   {:route :mqtt-lab
    :label "MQTT Lab"
    :preload chunks/preload-mqtt
    :icon lab-icon}])

(def ^:private route->title
  (merge {:login "Sign in"}
         (into {} (map (juxt :route :label) nav-items))))

(def ^:private sidebar-toggle-button-class
  "btn btn-circle bg-amber-200 text-amber-900 border border-amber-300 hover:bg-amber-200/80 hover:border-amber-400 focus-visible:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors duration-150")

(def ^:private sidebar-nav-link-class
  "is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:tooltip-warning hover:bg-amber-200 focus-visible:bg-amber-200 active:bg-amber-300 active:text-amber-900 text-amber-800 transition-colors duration-150 rounded-lg pl-2 pr-3 flex items-center justify-center gap-3 w-full is-drawer-close:border-transparent is-drawer-close:outline-none is-drawer-close:focus-visible:outline-none is-drawer-close:focus-visible:ring-0 is-drawer-close:bg-transparent is-drawer-close:hover:bg-transparent is-drawer-close:focus-visible:bg-transparent is-drawer-close:active:bg-transparent")

(def ^:private sidebar-nav-link-active-class
  " bg-amber-200/80 text-amber-900 shadow-inner is-drawer-close:bg-transparent is-drawer-close:text-amber-800 is-drawer-close:shadow-none")

(def ^:private sidebar-nav-icon-class
  "grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-amber-700 transition-colors duration-150 hover:bg-amber-200 hover:text-amber-800 focus-visible:bg-amber-200 focus-visible:text-amber-900 active:bg-amber-300 active:text-amber-900 is-drawer-close:border-none is-drawer-close:outline-none is-drawer-close:focus-visible:outline-none is-drawer-close:focus-visible:ring-0")

(defn- nav-link [{:keys [route label icon preload]} current-route set-drawer-open]
  (let [active? (= current-route route)
        href (router/href route)
        tooltip label
        active-class (when active? sidebar-nav-link-active-class)
        icon-active (when active? " bg-amber-300 text-amber-900 shadow")
        icon-el (when icon (icon))]
    ($ :li {:key (name route)}
       ($ :a {:href href
              :data-tip tooltip
              :aria-current (when active? "page")
              :onMouseEnter (fn [] (when preload (preload)))
              :className (str sidebar-nav-link-class active-class)}
          ($ :span {:className (str sidebar-nav-icon-class icon-active)}
             icon-el)
          ($ :span {:className "is-drawer-close:hidden flex-1 text-left font-medium"}
             label)))))
(defui app-layout [{:keys [route authed? token-remaining logout page]}]
  (let [[drawer-open? set-drawer-open] (use-state false)
        current-route (get-in route [:data :name])
        page-title (or (get route->title current-route) "Operations Dashboard")
        route-badge (some-> current-route name (str/replace "-" " ") str/capitalize)]
    ($ :div {:data-theme "bumblebee"
             :className "drawer lg:drawer-open min-h-screen bg-amber-50 text-amber-900"}
       ($ :input {:id drawer-id
                  :type "checkbox"
                  :className "drawer-toggle"
                  :checked drawer-open?
                  :onChange (fn [e] (set-drawer-open (.. e -target -checked)))})
       ($ :div {:className "drawer-content flex flex-col"}
          ($ :header {:className "navbar bg-amber-100/80 border-b border-amber-200/70 shadow-sm backdrop-blur"}
             ($ :div {:className "flex-none lg:hidden"}
                ($ :label {:htmlFor drawer-id
                           :aria-label "Open navigation"
                           :className "btn btn-ghost btn-square text-amber-700 drawer-button transition-colors duration-150 hover:bg-amber-100 hover:border-amber-300 focus-visible:bg-amber-100 focus-visible:border-amber-300 active:bg-amber-200 active:text-amber-900 active:border-amber-400"}
                   ($ :svg {:xmlns "http://www.w3.org/2000/svg"
                            :viewBox "0 0 24 24"
                            :className "h-6 w-6"
                            :stroke "currentColor"
                            :fill "none"
                            :strokeWidth "1.5"}
                      ($ :path {:strokeLinecap "round"
                                :strokeLinejoin "round"
                                :d "M4 6h16M4 12h16M4 18h16"}))))
             ($ :div {:className "flex flex-1 items-center gap-3 ml-3 sm:ml-5 lg:ml-0"}
                ($ :h1 {:className "text-xl font-semibold text-amber-900"} page-title)
                ($ :span {:className "badge badge-sm badge-warning text-amber-900"} "Live")
                (when route-badge
                  ($ :span {:className "badge badge-outline border-amber-400/80 text-amber-700/90"}
                     route-badge)))
             ($ :div {:className "flex-none items-center gap-3 hidden lg:flex"}
                ($ :div {:className "form-control max-w-xs"}
                   ($ :label {:className "input input-bordered input-warning bg-white/80 border-amber-200/70 flex items-center gap-2"}
                      ($ :svg {:xmlns "http://www.w3.org/2000/svg"
                               :viewBox "0 0 24 24"
                               :className "h-5 w-5 opacity-70"
                               :stroke "currentColor"
                               :fill "none"
                               :strokeWidth "1.5"}
                         ($ :path {:strokeLinecap "round"
                                   :strokeLinejoin "round"
                                   :d "m21 21-4.35-4.35M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"}))
                      ($ :input {:type "text"
                                 :placeholder "Search jobs, models…"
                                 :className "grow bg-transparent outline-none"})))
                ($ :div {:className "indicator"}
                   ($ :span {:className "indicator-item badge badge-warning badge-sm text-amber-900"} "3")
                   ($ :button {:className "btn btn-circle btn-outline border-amber-300 text-amber-600 transition-colors duration-150 hover:bg-amber-100 focus-visible:bg-amber-100 active:bg-amber-200 active:text-amber-900"
                               :aria-label "Notifications"}
                      ($ :svg {:xmlns "http://www.w3.org/2000/svg"
                               :viewBox "0 0 24 24"
                               :className "h-5 w-5"
                               :stroke "currentColor"
                               :fill "none"
                               :strokeWidth "1.5"}
                         ($ :path {:strokeLinecap "round"
                                   :strokeLinejoin "round"
                                   :d "M10.5 5.75A2.25 2.25 0 0 1 12.75 3.5a2.25 2.25 0 0 1 2.25 2.25v.443c1.086.154 2.063.76 2.7 1.665.637.906.86 2.032.612 3.104l-.605 2.624a3 3 0 0 0 1.565 3.268v.546H6.333v-.546a3 3 0 0 0 1.565-3.268l-.605-2.624a4.125 4.125 0 0 1 .613-3.104 3.75 3.75 0 0 1 2.594-1.665Z"})
                         ($ :path {:strokeLinecap "round"
                                   :strokeLinejoin "round"
                                   :d "M9 19.5a3 3 0 0 0 3 3 3 3 0 0 0 3-3"}))))
                (when authed?
                  ($ :span {:className "badge badge-outline border-amber-400 text-amber-700"}
                     (str "token " (or token-remaining 0) "s")))
                (if authed?
                  ($ :button {:className "btn btn-sm btn-outline border-amber-300 text-amber-700 hover:bg-amber-100"
                              :onClick logout}
                     "Logout")
                  ($ :a {:href (router/href :login)
                         :onMouseEnter chunks/preload-login
                         :className "btn btn-sm btn-warning text-amber-900"}
                     "Login"))
                ($ :div {:className "avatar placeholder"}
                   ($ :div {:className "bg-amber-500 text-white rounded-full w-10 flex items-center justify-center shadow"}
                      ($ :span {:className "text-sm font-semibold"} "BB")))))
          ($ :main {:className "flex-1 p-6 space-y-6 bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-white/70"}
             (when page
               ($ page))))
       ($ :div {:className "drawer-side is-drawer-close:overflow-visible"}
          ($ :label {:htmlFor drawer-id
                     :aria-label "close sidebar"
                     :className "drawer-overlay"})
          ($ :aside {:className "is-drawer-close:w-20 is-drawer-open:w-72 bg-amber-100/80 border-r border-amber-300 shadow-lg flex min-h-full flex-col transition-all ease-in-out"}
             ($ :div {:className "flex items-center gap-3 px-4 py-5"}
                ($ :div {:className "avatar placeholder"}
                   ($ :div {:className "bg-amber-500 text-white rounded-full w-12 flex items-center justify-center shadow"}
                      ($ :span {:className "text-base font-semibold"} "HC")))
                ($ :div {:className "is-drawer-close:hidden"}
                   ($ :p {:className "text-lg font-semibold leading-tight text-amber-800"} "HoneyComb")
                   ($ :p {:className "text-sm text-amber-700/70"} "Control plane")))
             ($ :ul {:className "menu grow w-full px-1 py-2 gap-1"}
                (mapv (fn [item]
                        (nav-link item current-route set-drawer-open))
                      nav-items))
             ($ :div {:className "border-t border-amber-200/70 p-4 flex items-center gap-3 is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-2 bg-amber-100/50"}
                ($ :div {:className "flex items-center gap-3 is-drawer-close:hidden"}
                   ($ :div {:className "avatar placeholder"}
                      ($ :div {:className "bg-amber-600 text-white rounded-full w-10 flex items-center justify-center shadow"}
                         ($ :span {:className "text-sm font-semibold"} "OP")))
                   ($ :div {}
                      ($ :p {:className "font-medium leading-tight text-amber-800"} "Ops console")
                      ($ :p {:className "text-sm text-amber-700/70"} "Manage infrastructure")))
                ($ :div {:className "is-drawer-close:block hidden"}
                   ($ :div {:className "avatar placeholder"}
                      ($ :div {:className "bg-amber-600 text-white rounded-full w-10 flex items-center justify-center shadow"}
                         ($ :span {:className "text-sm font-semibold"} "OP"))))
                ($ :label {:htmlFor drawer-id
                           :data-tip "Toggle sidebar"
                           :className (str sidebar-toggle-button-class
                                           " flex items-center justify-center drawer-button "
                                           "is-drawer-open:rotate-y-180 "
                                           "is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:tooltip-warning "
                                           "is-drawer-close:border-transparent is-drawer-close:outline-none "
                                           "is-drawer-close:focus-visible:outline-none is-drawer-close:focus-visible:ring-0")}
                   ($ :svg {:xmlns "http://www.w3.org/2000/svg"
                            :viewBox "0 0 24 24"
                            :className "h-5 w-5"
                            :stroke "currentColor"
                            :fill "none"
                            :strokeWidth "1.5"}
                      ($ :path {:strokeLinecap "round"
                                :strokeLinejoin "round"
                                :d "m8.25 4.5 7.5 7.5-7.5 7.5"})))))))))
