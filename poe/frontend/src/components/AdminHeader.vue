<script setup>
import Dropdown from './Dropdown.vue'
import BaseAvatar from './BaseAvatar.vue'
</script>

<template>
  <div
    class="fixed inset-x-0 z-20 flex items-center justify-between h-16 px-4 bg-white shadow sm:px-8 lg:left-64 lg:justify-end"
  >
    <slot></slot>
    <div class="flex items-center gap-8">
      <div class="hidden sm:flex">
        <Icon
          name="magnifying-glass"
          class="text-xl text-gray-500"
        />
      </div>
      <!-- <Dropdown>
        <template #button>
          <div class="relative flex">
            <Icon
              name="inboxes"
              class="text-xl text-gray-500"
            />
            <div
              class="absolute -right-2 top-[-10px] font-medium flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white"
            >
              6
            </div>
          </div>
        </template>
        <template #items>
          <div class="mx-1 border border-gray-200 divide-x rounded-md">
            <router-link
              to="/"
              class="px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                name="user-gear"
                class="mr-2"
              />
              <span>Account settings</span>
            </router-link>
            <button class="px-4 py-2 hover:bg-gray-100">
              <Icon
                name="right-from-bracket"
                class="mr-2"
              />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown>
        <template #button>
          <div class="relative flex">
            <Icon
              name="tv"
              class="text-xl text-gray-500"
            />
            <div
              class="absolute -right-2 top-[-10px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white"
            >
              6
            </div>
          </div>
        </template>
        <template #items>
          <div class="mx-1 border border-gray-200 divide-x rounded-md">
            <router-link
              to="/"
              class="px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                name="user-gear"
                class="mr-2"
              />
              <span>Account settings</span>
            </router-link>
            <button class="px-4 py-2 hover:bg-gray-100">
              <Icon
                name="right-from-bracket"
                class="mr-2"
              />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown>
        <template #button>
          <div class="relative flex">
            <Icon
              name="bell"
              class="text-xl text-gray-500"
            />
            <div
              class="absolute -right-2 top-[-10px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white"
            >
              9
            </div>
          </div>
        </template>
        <template #items>
          <div class="mx-1 border border-gray-200 divide-x rounded-md">
            <router-link
              to="/"
              class="px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                name="user-gear"
                class="mr-2"
              />
              <span>Account settings</span>
            </router-link>
            <button class="px-4 py-2 hover:bg-gray-100">
              <Icon
                name="right-from-bracket"
                class="mr-2"
              />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown class="hidden sm:flex">
        <template #button>
          <Icon
            name="grid-2"
            class="text-xl text-gray-500"
          />
        </template>
        <template #items>
          <div class="mx-1 border border-gray-200 divide-x rounded-md">
            <router-link
              to="/"
              class="px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                name="user-gear"
                class="mr-2"
              />
              <span>Account settings</span>
            </router-link>
            <button class="px-4 py-2 hover:bg-gray-100">
              <Icon
                name="right-from-bracket"
                class="mr-2"
              />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown>
        <template #button>
          <BaseAvatar
            src="/src/assets/avatar.jpg"
            class="w-10 h-10"
          />
        </template>
        <template #items>
          <div class="mx-1 border border-gray-200 divide-x rounded-md">
            <router-link
              to="/"
              class="px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                name="user-gear"
                class="mr-2"
              />
              <span>Account settings</span>
            </router-link>
            <button class="px-4 py-2 hover:bg-gray-100">
              <Icon
                name="right-from-bracket"
                class="mr-2"
              />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown> -->
    </div>
  </div>
</template>
