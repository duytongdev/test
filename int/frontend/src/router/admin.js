export default [
  {
    path: '/admin/login',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: {
          title: 'Dashboard'
        }
      },
      //   {
      //     path: 'users',
      //     name: 'users-index',
      //     component: () => import('@/views/admin/users/UsersIndex.vue'),
      //     meta: {
      //       title: 'Users'
      //     }
      //   }
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue'),
        meta: {
          title: 'NotFound'
        }
      }
    ]
  }
]
