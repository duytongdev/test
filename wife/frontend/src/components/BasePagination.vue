<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['redirectPage'])

const redirectPage = (page) => {
  if (page) {
    emit('redirectPage', page)
  }
}

const startPage = computed(() => {
  const currentPage = props.currentPage
  const totalPages = props.totalPages
  let start = currentPage - 1

  if (props.totalPages > 7) {
    if (currentPage < 5) {
      start = 1
    } else if (totalPages - currentPage < 4) {
      start = totalPages - 4
    }
  } else {
    start = 1
  }

  return start
})

const endPage = computed(() => {
  const currentPage = props.currentPage
  const totalPages = props.totalPages
  let end = currentPage + 1

  if (totalPages > 7) {
    if (currentPage < 5) {
      end = 5
    } else if (totalPages - currentPage < 4) {
      end = currentPage + 3
    }
  } else {
    end = 7
  }

  return end < totalPages ? end : totalPages
})

const visiblePages = computed(() => {
  let visiblePages = []

  for (let i = startPage.value; i <= endPage.value; i++) {
    visiblePages.push(i)
  }

  return visiblePages
})

const firstPage = computed(() => {
  return props.totalPages > 7 && props.currentPage > 4
})

const lastPage = computed(() => {
  return props.totalPages > 7 && endPage.value < props.totalPages
})
</script>

<template>
  <div class="flex">
    <slot></slot>
    <div class="flex -space-x-px font-semibold">
      <button
        class="rounded-l-md border border-slate-300 px-4 py-2 hover:bg-slate-50"
        :class="currentPage === 1 && 'pointer-events-none select-none text-slate-400'"
        @click="redirectPage(currentPage - 1)"
      >
        Previous
      </button>
      <button
        v-if="firstPage"
        class="hidden border border-slate-300 px-4 py-2 hover:bg-slate-50 sm:flex"
        @click="redirectPage(1)"
      >
        1
      </button>
      <div
        v-if="firstPage"
        class="pointer-events-none hidden select-none border border-slate-300 px-4 py-2 sm:flex"
      >
        ...
      </div>
      <template
        v-for="page in visiblePages"
        :key="page"
      >
        <button
          class="hidden border border-slate-300 px-4 py-2 hover:bg-slate-50 sm:flex"
          :class="
            page === currentPage &&
              'pointer-events-none !flex  select-none !border-primary-500 bg-primary-500 text-white'
          "
          @click="redirectPage(page)"
        >
          {{ page }}
        </button>
      </template>
      <div
        v-if="lastPage"
        class="pointer-events-none hidden select-none border border-slate-300 px-4 py-2 sm:flex"
      >
        ...
      </div>
      <button
        v-if="lastPage"
        class="hidden border border-slate-300 px-4 py-2 hover:bg-slate-50 sm:flex"
        @click="redirectPage(totalPages)"
      >
        {{ totalPages }}
      </button>
      <button
        class="rounded-r-md border border-slate-300 px-4 py-2 hover:bg-slate-50"
        :class="currentPage === totalPages && 'pointer-events-none select-none text-slate-400'"
        @click="redirectPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
