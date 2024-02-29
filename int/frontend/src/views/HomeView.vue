<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref()
const router = useRouter()

async function logout() {
  await axios.post('/logout').then((response) => {
    router.push('/login')
  })
}

onMounted(async () => {
  const data = await axios.get('/api/user')
  user.value = data.data
  console.log(user.value)
})
</script>

<template>
  <div>
    <h1>This is home view</h1>
    <button
      v-if="user"
      class="rounded-md bg-primary-500 px-4 py-2.5 text-white"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>
