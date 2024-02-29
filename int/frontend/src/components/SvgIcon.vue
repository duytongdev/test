<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="h-6 w-6">
    <svg
      v-if="name === 'bars'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </div>
</template>
