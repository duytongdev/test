<script setup>
import BaseAvatar from './BaseAvatar.vue'
</script>

<template>
  <div
    class="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 lg:justify-end lg:px-8"
  >
    <slot></slot>
    <div>
      <BaseAvatar
        src="/src/assets/avatar.jpg"
        class="h-10 w-10"
      />
    </div>
  </div>
</template>
