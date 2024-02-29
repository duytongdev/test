import './assets/main.css'
import './assets/fontawesome/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Icon from '@/components/Icon.vue'
import Button from '@/components/Button.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Icon', Icon)
app.component('Button', Button)

app.mount('#app')
