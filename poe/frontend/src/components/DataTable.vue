<script setup="">
import DropdownItem from './DropdownItem.vue'
import DropdownItemGroup from './DropdownItemGroup.vue'
import Dropdown from './Dropdown.vue'
import BaseListbox from './BaseListbox.vue'
import { singularize } from '@/utils/stringUtils'
import adminService from '../services/adminService'
import BaseBadge from './BaseBadge.vue'
import BaseImage from './BaseImage.vue'
import BasePagination from './BasePagination.vue'
import DateRangePicker from 'vue-tailwind-datepicker'
import BaseCheckbox from './BaseCheckbox.vue'

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

const dataTable = ref({
  perPage: 10,
  perPages: [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ],
  emptyData: false,
  items: [],
  keywords: null,
  pagination: null,
  selectedItems: [],
  loading: false,
  deleting: false,
  status: 'all',
  sortBy: 'newest',
  sorts: [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Last updated', value: 'last_updated' }
  ],
  searchByColumn: 'all',
  predefinedDate: 'all_time',
  date: [
    { label: 'All time', value: 'all_time' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'last_7_days' },
    { label: 'Last 30 days', value: 'last_30s_days' },
    { label: 'This month', value: 'this_month' },
    { label: 'Last month', value: 'last_month' },
    { label: 'This quarter', value: 'this_quarter' },
    { label: 'Last quarter', value: 'last_quarter' },
    { label: 'This year', value: 'this_year' },
    { label: 'Last year', value: 'last_year' }
  ]
})

const date = ref([])

const formatter = ref({
  date: 'MMM DD, YYYY',
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

const fetchItems = async () => {
  dataTable.value.loading = true

  const response = await adminService.getItems(`/admin/${props.name}`, {
    perPage: dataTable.value.perPage
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
  const response = await adminService.getItems(`/admin/${props.name}`, {
    perPage: dataTable.value.perPage,
    page: page
  })

  dataTable.value.items = response.data.data
  dataTable.value.pagination = response.data
}

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

onMounted(() => {
  fetchItems()
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h2 class="text-base font-semibold text-gray-900">Users</h2>
        <p class="mt-2">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <Button
        as="a"
        :href="`/admin/${name}/create`"
      >
        Add {{ singularize(name) }}
      </Button>
    </div>
    <div class="bg-white rounded-md shadow">
      <!-- Start done -->
      <div class="flex flex-wrap justify-between gap-2 p-4 border-b border-gray-200">
        <div>
          <DateRangePicker
            v-slot="{ value, placeholder }"
            v-model="date"
            placeholder="Date range selection"
            separator=" - "
            :formatter="formatter"
            :shortcuts="customShortcuts"
          >
            <button class="flex group focus:outline-none">
              <div
                class="flex h-[38px] w-[38px] items-center justify-center rounded-s-md border border-gray-300 bg-gray-100 group-focus:border-primary-600 group-focus:bg-primary-600 group-focus:text-white"
              >
                <Icon name="calendar-week" />
              </div>
              <span
                class="flex h-[38px] items-center rounded-e-md border border-l-0 border-gray-300 px-3 text-gray-500 group-focus:border-primary-600 group-focus:text-gray-900"
              >
                {{ value || placeholder }}
              </span>
            </button>
          </DateRangePicker>
        </div>
        <div class="flex flex-wrap gap-2">
          <!-- Start doing -->
          <Button
            type="button"
            intent="ghost"
            icon-left="rotate-right"
            @click="fetchItems"
          >
            Refresh
          </Button>
          <Dropdown>
            <template #button="">
              <Button
                type="button"
                intent="ghost"
                icon-left="file-export"
              >
                Export
              </Button>
            </template>
            <template #items="">
              <div class="mx-1 border border-gray-200 divide-x rounded-md">
                <router-link
                  class="px-4 py-2 hover:bg-gray-100"
                  to="/"
                >
                  <Icon
                    class="mr-2"
                    name="file-csv"
                  >
                    <span>CSV</span>
                  </Icon>
                </router-link>
                <button class="px-4 py-2 hover:bg-gray-100">
                  <Icon
                    class="mr-2"
                    name="file-excel"
                  >
                    <span>Excel</span>
                  </Icon>
                </button>
              </div>
            </template>
          </Dropdown>
          <Button
            type="button"
            intent="ghost"
            icon-left="table-columns"
          >
            Columns
          </Button>
          <!-- End doing -->
        </div>
      </div>
      <!-- End Done -->
      <div class="flex flex-wrap justify-between gap-2 p-4">
        <BaseListbox
          v-model="dataTable.perPage"
          :options="dataTable.perPages"
        />
        <div class="flex flex-wrap gap-2">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <BaseListbox
                v-model="dataTable.searchByColumn"
                :options="searchColumns"
                additional="border-l-0 border-y-0 rounded-r-none w-20"
              />
            </div>
            <input
              v-model="dataTable.keywords"
              class="w-full rounded-md border-gray-300 pl-[92px] pr-9 text-sm placeholder:text-gray-400 focus:border-primary-600 focus:ring-0"
              type="text"
              placeholder="Search for anything..."
              @keyup.enter="search"
            />
            <button
              class="absolute inset-y-0 right-0 flex w-[38px] items-center justify-center text-gray-400 focus:outline-none"
            >
              <Icon
                name="magnifying-glass"
                type="regular"
              />
            </button>
          </div>
          <BaseListbox
            v-model="dataTable.status"
            :options="status"
            title="Status"
          />
          <BaseListbox
            v-model="dataTable.sortBy"
            :options="dataTable.sorts"
            title="Sort"
          />
        </div>
      </div>
      <div
        v-if="dataTable.selectedItems.length"
        class="flex justify-center py-4 border-t"
      >
        <p>
          All <b class="text-gray-900">{{ dataTable.selectedItems.length }}</b> {{ name }} on this
          page are selected.
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-y bg-gray-50">
            <tr>
              <th class="px-4 mr-auto text-left">
                <BaseCheckbox
                  v-model="indeterminate"
                  :checked="dataTable.selectedItems.length"
                  :indeterminate="
                    dataTable.selectedItems.length &&
                      dataTable.selectedItems.length !== dataTable.items.length
                  "
                />
              </th>
              <th
                v-for="column in columns"
                :key="column"
                class="whitespace-nowrap px-3 py-3.5 font-semibold text-gray-900"
              >
                <div
                  :class="[
                    'flex items-center gap-2',
                    (column.badge || column.image) && 'justify-center'
                  ]"
                >
                  <span>{{ column.name }}</span>
                  <Icon
                    class="cursor-pointer text-primary-600"
                    name="sort"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataTable.items"
              :key="item"
              class="relative border-b group"
            >
              <td class="px-4 leading-none">
                <BaseCheckbox
                  v-model="dataTable.selectedItems"
                  :value="item.id"
                />
              </td>
              <td
                v-for="column in columns"
                :key="column"
                :class="['whitespace-nowrap px-3.5', column.image ? 'h-14' : 'h-12']"
              >
                <router-link
                  v-if="column.link"
                  class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
                  :to="name + '/' + item.id"
                >
                  {{ item[column.field] }}
                </router-link>
                <div
                  v-else-if="column.badge"
                  class="flex justify-center"
                >
                  <template
                    v-for="(color, index) in column.badge"
                    :key="color"
                  >
                    <BaseBadge
                      v-if="index === item[column.field]"
                      :color="color"
                    >
                      {{ item[column.field] }}
                    </BaseBadge>
                  </template>
                </div>
                <BaseImage
                  v-else-if="column.image"
                  class="w-10 h-10 mx-auto"
                  :src="item[column.field]"
                >
                  <span>
                    {{ item[column.field] }}
                  </span>
                </BaseImage>
                <span v-else>
                  {{ item[column.field] }}
                </span>
              </td>
              <td>
                <!-- <Dropdown>
                  <button>
                    <Icon
                      type="regular"
                      name="ellipsis"
                      class=""
                    />
                  </button>
                  <template #items>
                    <DropdownItemGroup>
                      <DropdownItem>Details</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownItemGroup>
                  </template>
                </Dropdown> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BasePagination
        v-if="dataTable.items.length"
        class="flex flex-col items-center justify-between gap-2 p-4 xl:flex-row"
        :current-page="dataTable.pagination.current_page"
        :total-pages="dataTable.pagination.last_page"
        @redirect-page="redirectPage"
      >
        <p>
          Showing
          <b>{{ dataTable.pagination.from }}</b>
          to
          <b>{{ dataTable.pagination.to }}</b>
          of
          <b>{{ dataTable.pagination.total }}</b>
          {{ name }}
        </p>
      </BasePagination>
    </div>
  </div>
</template>
