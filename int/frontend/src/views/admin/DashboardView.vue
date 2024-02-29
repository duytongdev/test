<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const admin = ref()
const router = useRouter()

async function logout() {
  await axios.post('/admin/logout').then((response) => {
    router.push('/admin/login')
  })
}

onMounted(async () => {
  const data = await axios.get('/api/admin')
  admin.value = data.data
  console.log(admin.value)
})
</script>

<template>
  <div>
    <h1>This is dashboard view</h1>
    <button
      v-if="admin"
      class="rounded-md bg-primary-500 px-4 py-2.5 text-white"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>
