<script setup>
const sidebar = [
  {
    name: 'Analytics',
    routes: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'layer-group' },
      { name: 'Charts', path: '/admin/charts', icon: 'chart-simple' }
    ]
  },
  {
    name: 'Management',
    routes: [
      { name: 'Brands', path: '/admin/brands', icon: 'bookmark' },
      { name: 'Categories', path: '/admin/categories', icon: 'tags' },
      { name: 'Orders', path: '/admin/orders', icon: 'bag-shopping', badge: true },
      { name: 'Products', path: '/admin/products', icon: 'laptop' },
      { name: 'Users', path: '/admin/users', icon: 'user' }
    ]
  }
]
</script>

<template>
  <div
    class="fixed z-30 h-screen w-64 -translate-x-full space-y-6 bg-slate-900 px-6 transition lg:translate-x-0"
  >
    <div class="flex h-16">
      <a
        href="/admin/dashboard"
        class="flex items-center gap-2 outline-none"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500 text-2xl text-white"
        >
          <BaseIcon name="cat-space" />
        </div>
        <div class="leading-tight">
          <h1 class="font-bold text-primary-500">Catbuy</h1>
          <span class="text-xs text-slate-500">Animal Shopping</span>
        </div>
      </a>
    </div>
    <nav class="space-y-6">
      <div
        v-for="group in sidebar"
        :key="group"
      >
        <h2 class="text-[10px] font-bold uppercase text-slate-500">{{ group.name }}</h2>
        <ul class="ml-4 mt-4 space-y-4">
          <li
            v-for="route in group.routes"
            :key="route"
          >
            <RouterLink
              v-slot="{ isActive }"
              :to="route.path"
              class="group flex items-center font-medium text-slate-400 hover:text-slate-300"
            >
              <div
                class="mr-4 flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 group-hover:bg-primary-500 group-hover:text-white"
                :class="isActive && '!bg-primary-500 text-white'"
              >
                <BaseIcon :name="route.icon" />
              </div>
              <span :class="isActive && 'text-primary-400'">{{ route.name }}</span>
              <div
                v-if="route.badge"
                class="ml-auto rounded-md border border-pink-500 bg-pink-500 bg-opacity-10 px-2 py-0.5 text-xs text-pink-500"
              >
                19
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
