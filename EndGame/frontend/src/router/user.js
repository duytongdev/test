export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Login'
    }
  }
]
