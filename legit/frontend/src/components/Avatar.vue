<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <img
    :src="props.src"
    class="rounded-full object-cover"
  />
</template>
