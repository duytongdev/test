<script setup></script>

<template>
  <div>
    <h1>This is dashboard page</h1>
    <div
      v-for="index in 100"
      :key="index"
    >
      {{ index }}
    </div>
  </div>
</template>
