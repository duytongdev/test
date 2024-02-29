<script setup>
import DataTable from '@/components/DataTable.vue'

const columns = [
  {
    name: 'Id',
    field: 'id',
    sort: true
  },
  {
    name: 'Name',
    field: 'name',
    sort: true,
    link: true
  },
  {
    name: 'Email',
    field: 'email',
    sort: true
  },
  {
    name: 'Avatar',
    field: 'avatar',
    image: true
  },
  {
    name: 'Phone',
    field: 'phone_number'
  },
  //   {
  //     name: 'Gender',
  //     field: 'gender',
  //     sort: true,
  //     badge: {
  //       male: 'green',
  //       female: 'red',
  //       other: 'yellow'
  //     }
  //   },
  //   {
  //     name: 'Date of birth',
  //     field: 'date_of_birth'
  //   },
  {
    name: 'Role',
    field: 'role',
    sort: true,
    badge: {
      user: 'primary',
      admin: 'error'
    }
  }
]

const status = [
  { label: 'All', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Seller', value: 'seller' }
]
</script>

<template>
  <DataTable
    name="users"
    :columns="columns"
    :status="status"
  />
</template>
