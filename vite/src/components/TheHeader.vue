<script setup>
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const userStore = useUserStore()
const authStore = useAuthStore()
</script>

<template>
  <header class="bg-slate-900 text-white">
    <div
      v-if="!userStore.storeInfo"
      class="space-x-2"
    >
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Log in</RouterLink>
    </div>
    <a
      v-else
      href=""
      @click.prevent="authStore.logout"
    >
      Log out
    </a>
  </header>
</template>
