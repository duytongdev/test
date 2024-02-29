export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Login',
      layout: 'auth'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Register'
    }
  }
]
