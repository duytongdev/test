import { createRouter, createWebHistory } from 'vue-router'
import user from './user'
import admin from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: user.concat(admin)
})

router.afterEach((route) => {
  document.title = route.meta.title
})

export default router
