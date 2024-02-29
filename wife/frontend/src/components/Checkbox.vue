<script setup>
const props = defineProps({
  modelValue: {
    type: [Array, Boolean],
    required: true
  },
  checked: {
    type: [Boolean, Number],
    default: false
  },
  indeterminate: {
    type: [Boolean, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input
    v-model="model"
    :indeterminate="props.indeterminate"
    type="checkbox"
    class="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
    :class="props.disabled && 'text-slate-300'"
    :checked="props.checked"
  />
</template>
