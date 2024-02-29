<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div :class="[props.label ? 'pb-1 pt-5' : 'py-1']">
    <div
      v-if="props.label"
      class="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-tight"
    >
      {{ props.label }}
    </div>

    <slot />
  </div>
</template>
