<script setup>
import { useAuthStore } from '@/stores/auth'

const form = ref({
  email: null,
  password: null,
  remember: false
})

const authStore = useAuthStore()
const message = ref()
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[url('@/assets/login.svg')]">
    <div class="p-4 py-8">
      <div class="mb-4 w-96 rounded-lg bg-white p-6 shadow sm:p-12">
        <div class="mb-6 flex flex-col items-center">
          <a
            href="/"
            class="mb-6 outline-none"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500 text-2xl text-white"
            >
              <BaseIcon name="cat-space" />
            </div>
          </a>
          <h2 class="text-xl font-bold leading-9 tracking-tight sm:text-2xl">Welcome back!</h2>
          <p>Log in to your account</p>
        </div>
        <div
          v-if="message"
          class="mb-6 rounded-md border border-red-500 bg-red-100 px-4 py-3 font-semibold text-red-500"
        >
          {{ message }}
        </div>
        <form
          class="space-y-6"
          @submit.prevent="authStore.login(form)"
        >
          <div>
            <label
              for="email"
              class="font-medium leading-6"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="mt-2 h-10 w-full rounded-md border-slate-200 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              for="password"
              class="font-medium leading-6"
            >
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="mt-2 h-10 w-full rounded-md border-slate-200 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div class="flex items-center gap-2">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
            />
            <label for="remember">Remember me</label>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-indigo-500 px-4 py-2.5 font-semibold text-white hover:bg-indigo-400"
          >
            Log in
          </button>
        </form>
      </div>
      <p class="text-center">© 2023 Organo. All rights reserved.</p>
    </div>
  </div>
</template>
