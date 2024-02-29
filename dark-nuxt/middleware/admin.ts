import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (auth.user && auth.user.data.roles[0] !== 'admin') {
    return navigateTo('/', { replace: true })
  }
})
