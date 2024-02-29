<script setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <img
    :src="src"
    class="rounded-full object-cover"
  />
</template>
