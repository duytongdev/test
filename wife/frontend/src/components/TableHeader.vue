<script setup>
import { singularize } from '@/utils/stringUtils'

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div>
      <h2 class="text-base font-semibold capitalize text-slate-900">{{ name }}</h2>
      <p class="mt-2">This is the page for managing a list of all {{ name }}</p>
    </div>
    <BaseButton
      as="a"
      :href="`/admin/${name}/create`"
      intent="primary"
    >
      Add {{ singularize(name) }}
    </BaseButton>
  </div>
</template>
