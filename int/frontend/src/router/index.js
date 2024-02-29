import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'
import user from './user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: admin.concat(user)
})

export default router
