<script setup>
import '@/assets/fontawesome/all.css'
</script>

<template>
  <div class="text-sm text-slate-900">
    <AdminTheHeader />
    <main class="bg-slate-50">
      <slot />
    </main>
    <AdminTheFooter />
  </div>
</template>

<style scoped></style>
