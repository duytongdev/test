<script setup>
import TableLayout from '@/components/TableLayout.vue'

const columns = [
  {
    name: 'Id',
    field: 'id',
    sort: true,
    default: true,
    required: true
  },
  {
    name: 'Name',
    field: 'name',
    sort: true,
    link: true,
    default: true,
    required: true
  },
  {
    name: 'Email',
    field: 'email',
    sort: true,
    default: true
  },
  {
    name: 'Avatar',
    field: 'avatar',
    image: true,
    default: true
  },
  {
    name: 'Phone',
    field: 'phone_number',
    default: true
  },
    {
      name: 'Gender',
      field: 'gender',
      sort: true,
      badge: {
        male: 'green',
        female: 'red',
        other: 'yellow'
      },
    invisible: true
    },
    {
      name: 'DOB',
      field: 'date_of_birth',
    invisible: true
    },
  {
    name: 'Role',
    field: 'role',
    sort: true,
    badge: {
      user: 'primary',
      admin: 'error'
    },
    default: true
  },
  {
    name: 'Date created',
    field: 'created_at',
    sort: true,
    invisible: true
  },
  {
    name: 'Date updated',
    field: 'updated_at',
    sort: true,
    invisible: true
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
  <TableLayout
    name="users"
    :columns="columns"
    :status="status"
  />
</template>
