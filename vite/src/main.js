import './assets/main.css'
import './assets/fontawesome/all.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import BaseIcon from '@/components/BaseIcon.vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.component('BaseIcon', BaseIcon)

app.mount('#app')
