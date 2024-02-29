<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  }
})
</script>

<template>
  <button class="py-2 px-4 rounded border border-slate-200 font-bold">
    <slot>Button</slot>
  </button>
</template>

<style scoped></style>
