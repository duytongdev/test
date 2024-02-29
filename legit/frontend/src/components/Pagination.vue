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

const style = (type, additionalClass) => {
  return {
    'px-4 py-2 border cursor-pointer hover:bg-gray-50 border-gray-300': type === 'default',
    'px-4 py-2 border pointer-events-none select-none text-gray-300 border-gray-300':
      type === 'disabled',
    'px-4 py-2 border pointer-events-none select-none bg-primary-600 text-white border-primary-600':
      type === 'active',
    'hidden px-4 py-2 border pointer-events-none border-gray-300 sm:flex': type === 'dots',
    [additionalClass]: additionalClass !== undefined
  }
}

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
    <slot />
    <div class="flex -space-x-px font-medium">
      <button
        :class="['rounded-l-md', currentPage === 1 ? style('disabled') : style('default')]"
        @click="redirectPage(currentPage - 1)"
      >
        Previous
      </button>
      <button
        v-if="firstPage"
        :class="style('default', 'hidden sm:flex')"
        @click="redirectPage(1)"
      >
        1
      </button>
      <div
        v-if="firstPage"
        :class="style('dots')"
      >
        ...
      </div>
      <template
        v-for="page in visiblePages"
        :key="page"
      >
        <button
          :class="page === currentPage ? style('active') : style('default', 'hidden sm:flex')"
          @click="redirectPage(page)"
        >
          {{ page }}
        </button>
      </template>
      <div
        v-if="lastPage"
        :class="style('dots')"
      >
        ...
      </div>
      <button
        v-if="lastPage"
        :class="style('default', 'hidden sm:flex')"
        @click="redirectPage(totalPages)"
      >
        {{ totalPages }}
      </button>
      <button
        :class="['rounded-r-md', currentPage === totalPages ? style('disabled') : style('default')]"
        @click="redirectPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
