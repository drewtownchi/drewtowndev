<template>
  <button
    type="button"
    class="-ml-0.5 -mt-1 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    @click="sidebarOpen.set(true)">
    <span class="sr-only">Open sidebar</span>
    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline/esm/index.js';

import { sidebarOpen } from '../menuStore';
import { useStore } from '@nanostores/vue';

const $sidebarOpen = useStore(sidebarOpen);
</script>
