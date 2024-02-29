<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  return {
    'rounded-full px-2 text-xs font-bold capitalize leading-5': true,
    'bg-green-100 text-green-800': props.color === 'green',
    'bg-yellow-100 text-yellow-800': props.color === 'yellow',
    'bg-primary-100 text-primary-800': props.color === 'primary',
    'bg-red-100 text-red-800': props.color === 'red'
  }
})
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>
