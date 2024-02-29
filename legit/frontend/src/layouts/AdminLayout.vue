<script setup>
import TheSidebar from '../components/admin/TheSidebar.vue'
import TheHeader from '../components/admin/TheHeader.vue'
import Overlay from '../components/Overlay.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <TheSidebar :class="sidebarOpen && 'translate-x-0'" />
    <div class="lg:ml-72">
      <TheHeader>
        <button
          class="h-10 w-10 rounded-full bg-slate-100 text-xl text-slate-500 hover:bg-primary-100 hover:text-primary-500 focus:outline-none lg:hidden"
          @click="sidebarOpen = true"
        >
          <Icon
            type="solid"
            name="bars"
          />
        </button>
      </TheHeader>
      <main class="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        <router-view />
      </main>
    </div>
    <Overlay
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
    />
  </div>
</template>
