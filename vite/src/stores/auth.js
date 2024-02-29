import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useAPI'
const web = useApi('web')

export const useAuthStore = defineStore({
  id: 'auth',

  state: () =>
    JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
      email: null,
      isLoggedIn: false
    },

  actions: {
    updateState(payload) {
      let newUserState = { ...this.$state, ...payload }
      localStorage.removeItem('AUTH_STATE')
      localStorage.setItem('AUTH_STATE', JSON.stringify(newUserState))
      this.$reset()
    },
    async login({ email, password }) {
      const user = useUserStore()
      try {
        await web.post('/login', { email, password })
        this.updateState({ email, isLoggedIn: true })
        await user.storeInfo()
        this.router.push('/')
      } catch (error) {
        console.log('Error at login: ', error.message)
        throw error
      }
    },
    async register(props) {
      const user = useUserStore()
      try {
        await web.post('/register', props)
        this.updateState({ email: props.email, isLoggedIn: true })
        await user.storeInfo()
      } catch (error) {
        console.log('Error at register: ', error.message)
        throw error
      }
    },
    async forgotPassword({ email }) {
      try {
        await web.post('/forgot-password', { email })
      } catch (error) {
        console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
        throw error
      }
    },

    async logout() {
      const user = useUserStore()
      localStorage.clear() // always clean localStorage before reset the state
      this.$reset()
      user.$reset()

      try {
        await web.post('/logout')
        await this.router.push({ name: 'login' })
      } catch (error) {
        window.location.pathname = '/login'
      }
    }
  }
})
