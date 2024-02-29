<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Please select'
  },
  additional: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const label = computed(() => {
  return props.options.find((option) => option.value === props.modelValue)?.label
})
</script>

<template>
  <Listbox
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <div class="relative">
      <ListboxButton
        class="relative cursor-default whitespace-nowrap rounded-md border border-slate-300 py-2 pl-3 pr-7 text-left focus:outline-none"
        :class="additional"
      >
        <span
          v-if="title"
          class="text-slate-400"
        >
          {{ title }}:
        </span>
        <span
          v-if="label"
          class="font-semibold"
          >{{ label }}</span
        >
        <span v-else>{{ props.placeholder }}</span>
        <span class="absolute inset-y-0 right-2 flex items-center">
          <Icon
            type="light"
            name="angle-down"
            class="text-xs text-slate-400"
          />
        </span>
      </ListboxButton>
      <Transition
        leave-active-class="transition duration-100 ease-in "
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full whitespace-nowrap rounded-md border border-slate-300 bg-white py-1 shadow-md focus:outline-none"
        >
          <ListboxOption
            v-for="option in options"
            :key="option"
            v-slot="{ selected }"
            :value="option.value"
          >
            <li
              :class="[
                'flex h-[38px] select-none items-center px-3 hover:bg-slate-100',
                selected && 'pointer-events-none bg-primary-100 font-semibold text-primary-700'
              ]"
            >
              {{ option.label }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>
