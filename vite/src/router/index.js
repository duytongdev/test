import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'
import user from './user'
import authMiddleware from './middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: admin.concat(user)
})

router.beforeEach(authMiddleware)

export default router
