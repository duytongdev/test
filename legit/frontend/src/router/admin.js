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
    ]
  }
]
