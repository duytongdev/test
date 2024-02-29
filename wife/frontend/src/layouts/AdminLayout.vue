<script setup>
import TheSidebar from '@/components/admin/TheSidebar.vue'
import TheHeader from '@/components/admin/TheHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <TheSidebar />
    <div class="lg:ml-72">
      <TheHeader />
      <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
