export default [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/admin/users/UsersIndex.vue'),
        meta: {
          title: 'Users'
        }
      }
      //   {
      //     path: 'users/create',
      //     component: () => import('@/views/admin/users/UsersCreate.vue'),
      //     meta: {
      //       title: 'Create user'
      //     }
      //   },
      //   {
      //     path: 'brands',
      //     component: () => import('@/views/admin/brands/BrandsIndex.vue'),
      //     meta: {
      //       title: 'Brands'
      //     }
      //   },
      //   {
      //     path: 'brands/create',
      //     component: () => import('@/views/admin/brands/BrandsCreate.vue'),
      //     meta: {
      //       title: 'Create brand'
      //     }
      //   }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/admin/NotFound.vue')
  }
]
