import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"

import ElementPlus from "element-plus"
import "@/index.css"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import App from "@/App.vue"

import HomePage from "@/pages/HomePage.vue"
import DebugPage from "@/pages/DebugPage.vue"
import SettingPage from "@/pages/SettingPage.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: HomePage },
        { path: "/debug", component: DebugPage },
        { path: "/setting", component: SettingPage },
    ],
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app")
