<script setup>
import { cva } from 'class-variance-authority'

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  },
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  intent: {
    type: String,
    validator: (value) => ['primary', 'secondary', 'outlined', 'text'].includes(value),
    default: 'outlined'
  }
})

const buttonClass = computed(() => {
  return cva('inline-flex items-center rounded-md px-2.5 h-[38px] min-w-[38px] font-medium border gap-2 whitespace-nowrap', {
    variants: {
      intent: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 border-primary-500 hover:border-primary-600',
        secondary: 'bg-primary-100 text-primary-500 hover:bg-primary-200 border-primary-100  hover:border-primary-200',
        outlined: 'border-slate-300 bg-white text-slate-500',
        text: 'text-primary-500 border-none'
      }
    }
  })({
    intent: props.intent
  })
})
</script>

<template>
  <component
    :is="props.as"
    :class="buttonClass"
  >
    <BaseIcon
      v-if="props.iconLeft"
      :name="props.iconLeft"
    />
    <slot></slot>
    <BaseIcon
      v-if="props.iconRight"
      :name="props.iconRight"
    />
  </component>
</template>
