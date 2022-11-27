import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import apiClient from "@/plugins/axios"
import { AxiosKey } from "@/utils/symbols"
import "./assets/index.css"
import 'tw-elements'

const app = createApp(App)

app.use(router)

app.provide(AxiosKey, apiClient)

app.mount("#app")
