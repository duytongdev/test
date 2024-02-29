<script setup>
defineProps({
  content: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom'
  }
})
</script>

<template>
  <div class="relative ">
    <slot class=" group">
      <div class="absolute inset-x-0 hidden px-2 text-xs text-white transition bg-gray-900 rounded-md group-hover:flex -bottom-2 ">{{ content }}</div>
    </slot>
  </div>
</template>
