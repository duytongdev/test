<script setup>
const sidebar = [
  {
    name: 'Homesite',
    routes: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'tv' },
      { name: 'Website', path: '/', icon: 'vent-damper' }
    ]
  },
  {
    name: 'Main',
    routes: [
      { name: 'Brands', path: '/admin/brands', icon: 'bars-progress' },
      {
        name: 'Categories',
        path: '/admin/categories',
        icon: 'envelope-open-text'
      },
      { name: 'Users', path: '/admin/users', icon: 'user-nurse' },
      { name: 'Produtcs', path: '/admin/products', icon: 'bowl-rice' },
      { name: 'Orders', path: '/admin/orders', icon: 'ship' },
      { name: 'Coupons', path: '/admin/coupons', icon: 'diagram-next' },
      { name: 'Sales', path: '/admin/sales', icon: 'taco' },
      { name: 'Payments', path: '/admin/paymens', icon: 'credit-card' }
    ]
  }
]
</script>

<template>
  <div
    class="fixed z-30 h-screen w-64 -translate-x-full space-y-4 bg-gray-900 transition lg:translate-x-0"
  >
    <div class="mx-6 flex h-16 items-center">
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
          <span class="text-xs text-gray-500">Online Shopping</span>
        </div>
      </a>
    </div>
    <div
      v-for="group in sidebar"
      :key="group"
      class="mx-6"
    >
      <span class="text-[10px] font-bold uppercase text-gray-500">{{ group.name }}</span>
      <div class="mt-1 space-y-1">
        <router-link
          v-for="route in group.routes"
          :key="route"
          :to="route.path"
          class="flex items-center gap-2 rounded-md px-4 py-2.5 font-medium text-gray-500 hover:bg-blue-600 hover:bg-opacity-10 hover:text-white focus:outline-none"
        >
          <Icon
            :name="route.icon"
            class="text-base"
          />
          <span>{{ route.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
