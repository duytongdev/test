<script setup>
import TheHeader from '@/components/TheHeader.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// onMounted(async () => {
//   await authStore.getUser()
// })
</script>

<template>
  <div>
    <TheHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>
