<script setup>
const sidebar = [
  // {
  //   name: 'Analytics',
  //   routes: [
  //     { name: 'Dashboard', path: '/admin/dashboard', icon: 'gauge' },
  //   ]
  // },
  {
    name: 'Management',
    routes: [{ name: 'Users', path: '/admin/users', icon: 'user' }]
  }
]
</script>

<template>
  <div
    class="fixed z-30 h-screen w-72 -translate-x-full space-y-4 bg-slate-900 px-6 transition lg:translate-x-0"
  >
    <div class="flex h-16">
      <a
        href="/admin/dashboard"
        class="flex items-center gap-2 outline-none"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500">
          <BaseIcon
            name="cat-space"
            class="text-2xl text-white"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="font-semibold text-primary-500">CatBuy</h1>
          <span class="text-xs text-slate-400">Animal Shopping</span>
        </div>
      </a>
    </div>
    <nav class="space-y-4">
      <div
        v-for="group in sidebar"
        :key="group"
      >
        <span class="text-[10px] font-bold uppercase text-slate-500">{{ group.name }}</span>
        <ul class="ml-4 mt-2">
          <li
            v-for="route in group.routes"
            :key="route"
          >
            <RouterLink
              v-slot="{ isActive }"
              :to="route.path"
              class="group mb-4 flex items-center font-medium text-slate-400 hover:text-slate-300"
              active-class="!text-primary-500"
            >
              <div
                class="mr-4 flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 group-hover:bg-primary-500"
                :class="isActive && '!bg-primary-500 text-white'"
              >
                <BaseIcon :name="route.icon" />
              </div>
              <span>{{ route.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
