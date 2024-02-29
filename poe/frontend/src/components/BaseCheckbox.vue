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
    :checked="checked"
    :indeterminate="indeterminate"
    type="checkbox"
    class="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-600"
  />
</template>
