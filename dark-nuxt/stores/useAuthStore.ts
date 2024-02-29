import { defineStore } from 'pinia'

interface User {
  data: any
}

type Credentials = {
  email: string
  password: string
  remember: boolean
}

type RegistrationInfo = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    const { data } = await useApiFetch('/api/user')
    user.value = data.value as User
  }

  async function login(credentials: Credentials) {
    await useApiFetch('/sanctum/csrf-cookie')

    const { error } = await useApiFetch('/login', {
      method: 'POST',
      body: credentials
    })

    if (!error.value) {
      await fetchUser()

      if (user.value && user.value.data.roles[0] === 'admin') {
        navigateTo('/dashboard')
      } else {
        navigateTo('/')
      }
    }
  }

  async function logout() {
    await useApiFetch('/logout', {
      method: 'POST'
    })

    user.value = null
    navigateTo('/login')
  }

  async function register(info: RegistrationInfo) {
    await useApiFetch('/sanctum/csrf-cookie')

    const register = await useApiFetch('/register', {
      method: 'POST',
      body: info
    })

    await fetchUser()

    return register
  }

  return { user, login, isLoggedIn, fetchUser, logout, register }
})
