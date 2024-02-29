<script setup>
defineProps({
  type: {
    type: String,
    default: 'duotone'
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <i :class="`fa-${type} fa-${name} flex`" />
</template>
