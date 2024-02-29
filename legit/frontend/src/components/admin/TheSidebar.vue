<script setup>
const sidebar = [
  {
    name: 'Home',
    routes: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'tv' },
      { name: 'Website', path: '/', icon: 'vent-damper' }
    ]
  },
  {
    name: 'Ecommerce',
    routes: [
      { name: 'Brands', path: '/admin/brands', icon: 'bars-progress' },
      {
        name: 'Categories',
        path: '/admin/categories',
        icon: 'envelope-open-text'
      },
      { name: 'Users', path: '/admin/users', icon: 'user-nurse' },
      { name: 'Produtcs', path: '/admin/products', icon: 'bowl-rice' },
      { name: 'Orders', path: '/admin/orders', icon: 'ship', badge: true },
      { name: 'Coupons', path: '/admin/coupons', icon: 'diagram-next' },
      { name: 'Sales', path: '/admin/sales', icon: 'taco' },
      { name: 'Payments', path: '/admin/paymens', icon: 'credit-card' }
    ]
  }
]
</script>

<template>
  <div
    class="fixed z-40 h-screen w-72 -translate-x-full space-y-4 overflow-y-auto bg-slate-900 transition scrollbar scrollbar-thumb-slate-700 scrollbar-thumb-rounded-md scrollbar-w-2 hover:scrollbar-thumb-primary-500 lg:translate-x-0"
  >
    <div class="flex h-16 items-center px-6">
      <a
        href="/admin"
        class="flex items-center gap-2 focus:outline-none"
      >
        <Icon
          name="shield-dog"
          class="text-[40px] text-primary-500"
        />
        <div class="flex flex-col">
          <span class="font-semibold text-primary-500">EasyBuy</span>
          <span class="text-xs text-slate-400">Online Shopping</span>
        </div>
      </a>
    </div>
    <nav class="space-y-4 px-6 pb-8">
      <div
        v-for="group in sidebar"
        :key="group"
      >
        <span class="text-[10px] font-bold uppercase text-slate-500">{{ group.name }}</span>
        <ul class="mt-1 space-y-1">
          <li
            v-for="route in group.routes"
            :key="route"
          >
            <RouterLink
              :to="route.path"
              class="flex justify-between rounded-md px-4 py-2.5 font-medium text-slate-400 hover:bg-primary-500 hover:bg-opacity-5 hover:text-primary-500 focus:bg-primary-500 focus:bg-opacity-5 focus:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div class="flex items-center gap-3">
                <Icon
                  :name="route.icon"
                  class="text-base"
                />
                <span>{{ route.name }}</span>
              </div>
              <div
                v-if="route.badge"
                class="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-semibold text-white"
              >
                2
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
