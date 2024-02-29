<script lang="ts" setup></script>

<template>
  <header>
    <div class="bg-slate-100">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div class="space-x-4">
          <NuxtLink to="/seller">Seller Center</NuxtLink>
          <NuxtLink to="/seller/register">Start Selling</NuxtLink>
          <NuxtLink to="/download">Download</NuxtLink>
        </div>
        <div class="space-x-4">
          <NuxtLink to="/login">Track My Order</NuxtLink>
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/register">Register</NuxtLink>
        </div>
      </div>
    </div>
    <div>
      <div class="mx-auto flex max-w-7xl justify-between gap-8 px-4 py-8">
        <h1>SmartTech</h1>
        <div class="relative w-1/2">
          <input
            type="text"
            placeholder="Search entire store hear..."
            class="w-full rounded-md border-slate-300 px-6 py-3 text-sm"
          />
          <BaseButton
            class="absolute inset-y-1 right-1 flex h-10 w-10 items-center justify-center rounded-md border-0 bg-slate-600 text-white"
          >
            <BaseIcon name="magnifying-glass" />
          </BaseButton>
        </div>
        <div>
          <BaseIcon
            type="light"
            name="heart"
          />
          <BaseIcon
            type="light"
            name="bag-shopping"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
