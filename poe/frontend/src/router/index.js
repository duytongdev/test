import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: admin,
  linkActiveClass: 'pointer-events-none bg-primary-600 text-white'
})

router.afterEach((route) => {
  document.title = route.meta.title
})

export default router
