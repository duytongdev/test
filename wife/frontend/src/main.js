import './assets/main.css'
import './assets/fontawesome/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import App from './App.vue'
import router from './router'

import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FloatingVue)

app.component('BaseIcon', BaseIcon)
app.component('BaseButton', BaseButton)

app.mount('#app')
