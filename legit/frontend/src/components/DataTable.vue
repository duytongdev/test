<script setup>
import { singularize } from '@/utils/stringUtils'
import DateRangePicker from 'vue-tailwind-datepicker'
import Listbox from './Listbox.vue'
import adminService from '../services/adminService'
import Checkbox from './Checkbox.vue'
import Image from './Image.vue'
import Badge from './Badge.vue'
import Pagination from './Pagination.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
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
  selectedItems: []
})

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
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="mb-2 text-base font-semibold capitalize text-slate-900">{{ name }}</h2>
        <p>A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <BaseButton
        as="a"
        :href="`/admin/${name}/create`"
      >
        Add {{ singularize(name) }}
      </BaseButton>
    </div>
    <div class="divide-y rounded-md border bg-white">
      <div class="p-4">
        <div>
          <DateRangePicker
            v-slot="{ value, placeholder }"
            v-model="date"
            placeholder="Date range selection"
            separator=" - "
            :formatter="formatter"
            :shortcuts="customShortcuts"
          >
            <button class="group flex focus:outline-none">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-s-md border border-slate-300 bg-slate-100 group-focus:border-primary-500 group-focus:bg-primary-500 group-focus:text-white"
              >
                <Icon name="calendar-week" />
              </div>
              <span
                class="flex h-10 items-center rounded-e-md border border-l-0 border-slate-300 px-3 font-medium text-slate-500 group-focus:border-primary-500 group-focus:text-primary-500"
              >
                {{ value || placeholder }}
              </span>
            </button>
          </DateRangePicker>
        </div>
      </div>
      <div class="flex p-4">
        <Listbox
          v-model="dataTable.perPage"
          :options="dataTable.perPages"
        />
      </div>
      <div>
        <table class="w-full">
          <thead class="border-y bg-slate-50">
            <tr>
              <th class="mr-auto px-4 text-left">
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
                v-for="column in columns"
                :key="column"
                class="whitespace-nowrap px-3 py-3.5 font-semibold text-slate-900"
              >
                <div
                  :class="[
                    'flex items-center gap-2',
                    (column.badge || column.image) && 'justify-center'
                  ]"
                >
                  <span>{{ column.name }}</span>
                  <Icon
                    class="cursor-pointer text-primary-500"
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
              class="group relative border-b"
            >
              <td class="px-4 leading-none">
                <Checkbox
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
                  class="font-medium text-primary-500 hover:text-primary-500 focus:outline-none"
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
                    <Badge
                      v-if="index === item[column.field]"
                      :color="color"
                    >
                      {{ item[column.field] }}
                    </Badge>
                  </template>
                </div>
                <Image
                  v-else-if="column.image"
                  class="mx-auto h-10 w-10"
                  :src="item[column.field]"
                >
                  <span>
                    {{ item[column.field] }}
                  </span>
                </Image>
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
      <Pagination
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
      </Pagination>
    </div>
  </div>
</template>
