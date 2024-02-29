<script setup>
import Avatar from '../Avatar.vue'
import Dropdown from '../Dropdown.vue'
import DropdownItem from '../DropdownItem.vue'
</script>

<template>
  <div
    class="sticky top-0 flex h-16 items-center justify-between border-b bg-white px-4 lg:justify-end"
  >
    <slot />
    <div>
      <Dropdown>
        <button>
          <Avatar
            src="/src/assets/avatar.jpg"
            class="h-10 w-10"
          />
        </button>
        <template #items>
          <DropdownItem>Log out</DropdownItem>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
