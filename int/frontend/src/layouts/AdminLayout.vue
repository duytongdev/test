<script setup>
import TheSidebar from '@/components/AdminSidebar.vue'
import TheHeader from '@/components/AdminHeader.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import BaseOverlay from '@/components/BaseOverlay.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <TheSidebar :class="sidebarOpen && 'translate-x-0'" />
    <div class="lg:ml-64">
      <TheHeader>
        <button
          class="lg:hidden"
          @click="sidebarOpen = true"
        >
          <SvgIcon name="bars" />
        </button>
      </TheHeader>
      <main class="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
        <RouterView />
      </main>
    </div>
    <BaseOverlay
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
    />
  </div>
</template>
