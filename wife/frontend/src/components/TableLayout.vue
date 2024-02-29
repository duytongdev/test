<script setup>
import adminService from '../services/adminService'
import Image from './Image.vue'
import Badge from './Badge.vue'
import Checkbox from './Checkbox.vue'
import BasePagination from './BasePagination.vue'
import Listbox from './Listbox.vue'
import DateRangePicker from 'vue-tailwind-datepicker'
import BaseModal from './BaseModal.vue'
import TableHeader from './TableHeader.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  status: {
    type: Array,
    required: true
  }
})

const date = ref([])

const formatter = ref({
  date: 'mmm-DD-YYYY',
  month: 'MMM'
})

const customShortcuts = () => {
  return [
    {
      label: 'Today',
      atClick: () => {
        return [new Date()]
      }
    },
    {
      label: 'Yesterday',
      atClick: () => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        return [yesterday]
      }
    },
    {
      label: 'Last 7 Days',
      atClick: () => {
        const last7Days = new Date()
        last7Days.setDate(last7Days.getDate() - 7)

        return [last7Days]
      }
    },
    {
      label: 'Last 30 Days',
      atClick: () => {
        const last30Days = new Date()
        last30Days.setDate(last30Days.getDate() - 30)

        return [last30Days]
      }
    },
    {
      label: 'This Month',
      atClick: () => {
        const thisMonth = new Date()
        thisMonth.setDate(1)

        return [thisMonth]
      }
    },
    {
      label: 'Last Month',
      atClick: () => {
        const lastMonth = new Date()

        lastMonth.setMonth(lastMonth.getMonth() - 1)
        lastMonth.setDate(1)

        return [lastMonth]
      }
    },
    {
      label: 'This Quarter',
      atClick: () => {
        const thisQuarter = new Date()
        const currentMonth = thisQuarter.getMonth()
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3

        thisQuarter.setMonth(quarterStartMonth)
        thisQuarter.setDate(1)

        return [thisQuarter]
      }
    },
    {
      label: 'Last Quarter',
      atClick: () => {
        const lastQuarter = new Date()
        const currentMonth = lastQuarter.getMonth()
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3

        lastQuarter.setMonth(quarterStartMonth - 3)
        lastQuarter.setDate(1)

        return [lastQuarter]
      }
    },
    {
      label: 'This Year',
      atClick: () => {
        const thisYear = new Date()

        thisYear.setMonth(0)
        thisYear.setDate(1)

        return [thisYear]
      }
    },
    {
      label: 'Last Year',
      atClick: () => {
        const lastYear = new Date()

        lastYear.setFullYear(lastYear.getFullYear() - 1)
        lastYear.setMonth(0)
        lastYear.setDate(1)

        return [lastYear]
      }
    },
    {
      label: 'All Time',
      atClick: () => {
        return [new Date(0)]
      }
    }
  ]
}

const dataTable = ref({
  perPage: 10,
  perPages: [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ],
  items: [],
  pagination: null,
  selectedItems: [],
  loading: false,
  status: 'all',
  searchByColumn: 'all',
  tempSelectedColumns: []
})

const sort = ref({
  column: 'created_at',
  columns : [
    { label: 'Date created', value: 'created_at' },
    { label: 'Last updated', value: 'updated_at' }
  ],
  direction: 'desc'
})

const selectedColumns = ref([])

const modal = ref(null)

const openModal = () => {
    modal.value.openModal()
    dataTable.value.tempSelectedColumns = selectedColumns.value
}

const closeModal = () => {
    modal.value.closeModal()
}

const fetchItems = async () => {
  dataTable.value.loading = true

  const response = await adminService.getItems(`/admin/${props.name}`, {
    perPage: dataTable.value.perPage,
    orderColumn: sort.value.column,
    orderDirection: sort.value.direction
  })

  dataTable.value.items = response.data.data
  dataTable.value.pagination = response.data

  if (!dataTable.value.items.length) {
    dataTable.value.emptyData = true
  } else {
    dataTable.value.emptyData = false
  }

  dataTable.value.loading = false
}

const redirectPage = async (page) => {
  dataTable.value.loading = true

  const response = await adminService.getItems(`/admin/${props.name}`, {
    perPage: dataTable.value.perPage,
    orderBy: sort.value.column,
    orderDirection: sort.value.direction,
    page: page
  })

  dataTable.value.items = response.data.data
  dataTable.value.pagination = response.data
  dataTable.value.loading = false
}

const toggleDirection = () => {
  if (sort.value.direction === 'desc') {
    sort.value.direction = 'asc'
  } else {
    sort.value.direction = 'desc'
  }
}

const sortBy = (column) => {
  sort.value.column = column
  toggleDirection()
}

const loadDefaultColumns = () => {
  selectedColumns.value = props.columns.map(column => column.default && column.name).filter(column => column !== null && column !== undefined)
}

const saveSelectedColumns = () => {
  selectedColumns.value = dataTable.value.tempSelectedColumns
  modal.value.closeModal()
}

const restoreDefaultColumns = () => {
  dataTable.value.tempSelectedColumns = props.columns.map(column => column.default && column.name).filter(column => column !== null && column !== undefined)
}

const indeterminate = computed({
  get() {
    return dataTable.value.selectedItems.length > 0
  },
  set(value) {
    if (dataTable.value.selectedItems.length) {
      dataTable.value.selectedItems = []
    } else {
      let itemIds = []

      if (value) {
        dataTable.value.items.forEach((item) => {
          itemIds.push(item.id)
        })
      }

      dataTable.value.selectedItems = itemIds
    }
  }
})

const searchColumns = computed(() => {
  const searchByColumns = props.columns
    .map((column) => {
      if (!column.image) {
        return {
          label: column.name,
          value: column.field
        }
      } else {
        return null
      }
    })
    .filter((column) => column !== null)

  searchByColumns.unshift({
    label: 'All',
    value: 'all'
  })

  return searchByColumns
})

const sortColumns = computed(() => {
  const sortableColumns = props.columns
    .map((column) => {
      if (!column.image && column.sort) {
        return {
          label: column.name,
          value: column.field
        }
      } else {
        return null
      }
    })
    .filter((column) => column !== null)

  return sortableColumns
})

const visibleColumns = computed(() => {
  return props.columns.filter((column) => {
    return selectedColumns.value.includes(column.name)
  })
})

const defaultColumns = computed(() => {
  return props.columns.filter(column => column.default)
})

const additionalColumns = computed(() => {
  return props.columns.filter(column => !column.default)
})

const directionName = computed(() => {
  return sort.value.direction === 'desc' ? '(Descending)' : '(Ascending)'
})

watch([() => dataTable.value.perPage, () => sort.value.column, () => sort.value.direction], () => {
  fetchItems()
})

onMounted(() => {
  fetchItems()
  loadDefaultColumns()
})
</script>

<template>
  <div>
    <TableHeader :name="name" />
    <div class="rounded-md border bg-white">
      <div class="flex justify-between border-b p-4 gap-2 flex-wrap">
        <div>
          <DateRangePicker
            v-slot="{ value, placeholder }"
            v-model="date"
            placeholder="Filter by time range"
            separator=" - "
            :formatter="formatter"
            :shortcuts="customShortcuts"
          >
            <button class="group flex outline-none">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-s-md border border-slate-300 bg-slate-100 group-focus:border-primary-500 group-focus:bg-primary-500 group-focus:text-white"
              >
                <BaseIcon name="calendar" />
              </div>
              <span
                class="flex h-10 items-center rounded-e-md border border-l-0 border-slate-300 px-3 font-medium text-slate-500 group-focus:border-primary-500 group-focus:text-primary-500"
              >
                {{ value || placeholder }}
              </span>
            </button>
          </DateRangePicker>
        </div>
        <div class="flex gap-2 flex-wrap">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <Listbox
                v-model="dataTable.searchByColumn"
                :options="searchColumns"
                additional="border-l-0 border-y-0 rounded-r-none w-20"
              />
            </div>
            <input
              v-model="dataTable.keywords"
              class="w-full rounded-md border-slate-300 pl-[92px] pr-9 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:ring-0"
              type="text"
              placeholder="Search for anything..."
              @keyup.enter="search"
            />
            <button
              class="absolute inset-y-0 right-0 flex w-[38px] items-center justify-center text-slate-400 outline-none"
            >
              <BaseIcon
                name="magnifying-glass"
                type="regular"
              />
            </button>
          </div>
          <div class="flex gap-2">
            <BaseButton
              v-tooltip="'Refresh'"
              type="button"
              icon-left="rotate"
              @click="fetchItems"
            />
            <BaseButton
              v-tooltip="'Manage columns'"
              type="button"
              icon-left="table-columns"
              @click="openModal"
            />
            <BaseModal ref="modal">
              <template #title>Manage columns</template>
              <template #body>
                <p>Selected columns will appear in the table.</p>
                <div class="bg-primary-100 mt-4  items-center gap-2 border-t-2 border-primary-500 text-primary-700 flex px-4 py-3">
                  <BaseIcon
                    name="circle-info"
                    class="text-primary-500 text-base"
                  />
                  <p>You have selected <span class="font-semibold">{{ dataTable.tempSelectedColumns.length }}</span> columns</p>
                </div>
                <div class="flex justify-between mt-4">
                  <div class="flex flex-col">
                    <span class="font-semibold text-slate-900">Default columns</span>
                    <div class="flex flex-col mt-2 px-4 divide-y">
                      <div
                        v-for="column in defaultColumns"
                        :key="column"
                        v-tooltip="column.required && 'This column is required'"
                        class="flex gap-2 py-2 items-center"
                        :class="column.required && 'pointer-events-none'"
                      >
                        <Checkbox
                          :id="column.name"
                          v-model="dataTable.tempSelectedColumns"
                          :value="column.name"
                          :checked="selectedColumns.includes(column.name)"
                          :disabled="column.required"
                        />
                        <label :for="column.name">{{ column.name }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-semibold text-slate-900">Additional columns</span>
                    <div class="flex flex-col mt-2 px-4">
                      <div
                        v-for="column in additionalColumns"
                        :key="column"
                        class="flex gap-2 py-2 items-center"
                      >
                        <Checkbox
                          :id="column.name"
                          v-model="dataTable.tempSelectedColumns"
                          :value="column.name"
                          :checked="selectedColumns.includes(column.name)"
                        />
                        <label :for="column.name">{{ column.name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex mt-4 gap-2">
                  <BaseButton
                    intent="primary"
                    @click="saveSelectedColumns"
                  >
                    Save
                  </BaseButton>
                  <BaseButton
                    intent="text"
                    @click="closeModal"
                  >
                    Cancel
                  </BaseButton>
                  <BaseButton
                    intent="text"
                    @click="restoreDefaultColumns"
                  >
                    Restore default columns
                  </BaseButton>
                </div>
              </template>  
            </BaseModal>
          </div>
        </div>
      </div>
      <div class="flex justify-between p-4 flex-wrap gap-2">
        <Listbox
          v-model="dataTable.perPage"
          :options="dataTable.perPages"
        />
        <div class="flex flex-wrap gap-2">
          <Listbox
            v-model="dataTable.status"
            :options="status"
            title="Status"
          />
          <div class="flex">
            <Listbox
              v-model="sort.column"
              :options="sortColumns"
              :placeholder="sort.column"
              title="Sort by"
              additional="border-r-0 rounded-e-none "
              :right-icon="false"
            />
            <button
              v-tooltip="'Current sort direction ' + directionName"
              class="flex h-[38px] w-[38px] items-center justify-center rounded-e-md border border-slate-300  group-focus:border-primary-500 group-focus:bg-primary-500 group-focus:text-white"
              @click="toggleDirection"
            >
              <BaseIcon
                v-if="sort.direction === 'desc'"
                name="arrow-down-wide-short"
              />
              <BaseIcon
                v-else
                name="arrow-up-short-wide"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="max-h-screen overflow-y-auto">
        <table class="w-full">
          <thead
            class="border-t whitespace-nowrap border-slate-200 text-left ring-1 ring-slate-200"
            :class="dataTable.perPage > 10 && 'sticky top-0 z-10 bg-white shadow-md'"
          >
            <tr>
              <th class="pl-5 pr-4">
                <Checkbox
                  v-model="indeterminate"
                  :checked="dataTable.selectedItems.length"
                  :indeterminate="
                    dataTable.selectedItems.length &&
                      dataTable.selectedItems.length !== dataTable.items.length
                  "
                />
              </th>
              <th
                v-for="column in visibleColumns"
                :key="column"
                class="h-14 p-4 font-semibold text-slate-900"
              >
                <div :class="['flex items-center gap-2', column.image && 'justify-center']">
                  <span>{{ column.name }}</span>
                  <button
                    v-if="column.sort"
                    v-tooltip="'Current sort direction ' + directionName"
                    class="text-slate-400 flex flex-col"
                    @click="sortBy(column.field)"
                  >
                    <BaseIcon
                      type="solid"
                      name="sort-up"
                      class="-mb-[7px]"
                      :class="(sort.column === column.field && sort.direction === 'asc') && 'text-primary-500'"
                    />
                    <BaseIcon
                      type="solid"
                      name="sort-down"
                      class="-mt-[7px]"
                      :class="(sort.column === column.field && sort.direction === 'desc') && 'text-primary-500'"
                    />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              v-for="item in dataTable.items"
              :key="item"
              class="border-b border-slate-200"
            >
              <td class="pl-5 pr-4">
                <Checkbox
                  v-model="dataTable.selectedItems"
                  :value="item.id"
                />
              </td>
              
              <td
                v-for="column in visibleColumns"
                :key="column"
                class="px-4"
                :class="column.image ? 'h-14' : 'h-12'"
              >
                <RouterLink
                  v-if="column.link"
                  :to="name + '/' + item.id"
                  class="font-medium text-primary-500 outline-none"
                  :class="dataTable.loading && 'skeleton'"
                >
                  {{ item[column.field] }}
                </RouterLink>
                <div
                  v-else-if="column.image"
                  class="relative mx-auto w-fit"
                >
                  <Image
                    :src="item[column.field]"
                    class="h-10 w-10"
                    :class="[
                      column.field === 'avatar' ? 'rounded-full' : 'rounded-md',
                      dataTable.loading && 'invisible'
                    ]"
                  />
                  <div
                    v-if="dataTable.loading"
                    class="skeleton absolute inset-0"
                    :class="column.field === 'avatar' && '!rounded-full'"
                  ></div>
                </div>
                <div
                  v-else-if="column.badge"
                  class="flex"
                >
                  <template
                    v-for="(color, index) in column.badge"
                    :key="color"
                  >
                    <Badge
                      v-if="index === item[column.field]"
                      :color="color"
                      :class="dataTable.loading && 'skeleton !rounded-full'"
                    >
                      {{ item[column.field] }}
                    </Badge>
                  </template>
                </div>
                <span
                  v-else
                  :class="dataTable.loading && 'skeleton'"
                >
                  {{ item[column.field] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BasePagination
        v-if="dataTable.items.length"
        :current-page="dataTable.pagination.current_page"
        :total-pages="dataTable.pagination.last_page"
        class="flex flex-col items-center justify-between gap-2 p-4 xl:flex-row"
        @redirect-page="redirectPage"
      >
        <p>
          Showing
          <span class="font-semibold">{{ dataTable.pagination.from }}</span>
          to
          <span class="font-semibold">{{ dataTable.pagination.to }}</span>
          of
          <span class="font-semibold">{{ dataTable.pagination.total }}</span>
          {{ name }}
        </p>
      </BasePagination>
    </div>
  </div>
</template>
