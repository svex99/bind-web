import { createRouter, createWebHistory } from "vue-router"

import Login from "@/views/Login.vue"
import ListZones from "@/views/ListZones.vue"
import ZoneDetailsViewVue from "@/views/ZoneDetailsView.vue"
import NotFound from "@/views/NotFound.vue"

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/zones",
        name: "ListZones",
        component: ListZones
    },
    {
        path: "/zones/:origin",
        name: "ZoneDetailsView",
        component: ZoneDetailsViewVue
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
