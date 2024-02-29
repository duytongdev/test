<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

definePageMeta({
  middleware: 'guest'
})

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const auth = useAuthStore()

async function handleRegister() {
  await auth.register(form.value)
  navigateTo('/')
}
</script>

<template>
  <div class="m-8">
    <form
      @submit.prevent="handleRegister"
      class="rounded-md bg-white p-12 shadow w-96 space-y-4"
    >
      <div>
        <label for="email"> Name </label>
        <input
          type="text"
          id="name"
          class="w-full rounded-md border-slate-200 text-sm"
          v-model="form.name"
        />
      </div>
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
      <div>
        <label for="password_confirmation"> Password confirmation </label>
        <input
          type="password"
          id="password_confirmation"
          class="w-full rounded-md border-slate-200 text-sm"
          v-model="form.password_confirmation"
        />
      </div>
      <button class="bg-sky-500 text-white px-4 py-2.5 rounded-md w-full">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
