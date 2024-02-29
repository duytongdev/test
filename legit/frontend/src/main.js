import './assets/main.css'
import './assets/fontawesome/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Icon from '@/components/Icon.vue'
import BaseButton from '@/components/BaseButton.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Icon', Icon)
app.component('BaseButton', BaseButton)

app.mount('#app')
