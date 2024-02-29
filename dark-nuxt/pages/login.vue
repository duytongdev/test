<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

definePageMeta({
  middleware: 'guest'
})

const form = ref({
  email: 'admin@email.com',
  password: 'password',
  remember: true
})

const auth = useAuthStore()

async function handleLogin() {
  await auth.login(form.value)
}
</script>

<template>
  <div class="m-8">
    <form
      @submit.prevent="handleLogin"
      class="rounded-md bg-white p-12 shadow w-96 space-y-4"
    >
      <div>
        <label for="email"> Email </label>
        <input
          type="email"
          id="email"
          class="w-full rounded-md border-slate-200 text-sm"
          v-model="form.email"
        />
      </div>
      <div>
        <label for="password"> Password </label>
        <input
          type="password"
          id="password"
          class="w-full rounded-md border-slate-200 text-sm"
          v-model="form.password"
        />
      </div>
      <button class="bg-sky-500 text-white px-4 py-2.5 rounded-md w-full">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
