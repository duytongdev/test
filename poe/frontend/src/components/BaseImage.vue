<script setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <img
      :src="src"
      class="h-full w-full rounded-md object-cover"
    />
  </div>
</template>
