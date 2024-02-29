<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue'
import AdminHeader from '@/components/AdminHeader.vue'
import BaseOverlay from '@/components/BaseOverlay.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen text-sm text-gray-700 bg-gray-100">
    <AdminSidebar :class="sidebarOpen && 'translate-x-0'" />
    <div class="lg:ml-64">
      <AdminHeader>
        <button
          class="w-8 h-8 focus:outline-none lg:hidden"
          @click="sidebarOpen = true"
        >
          <Icon
            type="light"
            name="bars"
            class="text-2xl"
          />
        </button>
      </AdminHeader>
      <main class="px-4 pt-24 pb-8 mx-auto max-w-7xl sm:px-8">
        <router-view />
      </main>
    </div>
    <BaseOverlay
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
    />
  </div>
</template>
