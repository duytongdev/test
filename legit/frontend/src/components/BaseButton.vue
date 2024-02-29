<script setup>
import { cva } from 'class-variance-authority'

const props = defineProps({
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  as: {
    type: [String, Object],
    default: 'button'
  },
  intent: {
    type: String,
    validator: (val) => ['primary', 'secondary', 'danger', 'text'].includes(val),
    default: 'primary'
  }
})

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center text-sm rounded min-h-[32px] px-3 py-0.5 font-semibold',
    {
      variants: {
        intent: {
          primary: 'bg-primary-500 text-white hover:bg-primary-700',
          secondary: 'bg-slate/5 hover:bg-slate/10 text-slate-700',
          danger: 'bg-red-600 text-white hover:bg-red-500',
          text: 'text-slate-700 hover:bg-slate/5'
        },
        disabled: {
          true: '!bg-slate-100 !text-slate-400 cursor-not-allowed'
        }
      }
    }
  )({
    intent: props.intent,
    disabled: props.disabled
  })
})
</script>

<template>
  <component
    :is="props.as"
    :disabled="props.disabled"
    :class="buttonClass"
  >
    <svg
      v-if="props.loading"
      class="absolute h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <component
      :is="props.iconLeft"
      :class="['mr-2 h-5 w-5', props.loading && 'invisible']"
    />

    <span :class="[props.loading && 'invisible']">
      <slot></slot>
    </span>

    <component
      :is="props.iconRight"
      v-if="!props.loading"
      :class="['ml-2 h-5 w-5', props.loading && 'invisible']"
    />
  </component>
</template>
