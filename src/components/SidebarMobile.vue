<template>
  <TransitionRoot as="template" :show="$sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen.set(false)">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-slate-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-slate-800">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen.set(false)">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div class="mb-4 flex flex-shrink-0 items-center px-4 text-sm text-slate-300">Navigation</div>
              <nav class="flex-1 space-y-1 bg-slate-800 px-2" aria-label="Sidebar">
                <template v-for="item in props.navigation" :key="item.name">
                  <div>
                    <a
                      :href="item.href"
                      :class="[
                        item.href === props.page ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                        'group flex items-center rounded-md px-2 py-2 text-left text-base font-medium',
                      ]">
                      {{ item.name }}
                    </a>
                  </div>
                </template>
              </nav>
            </div>
            <div class="flex flex-shrink-0 bg-slate-700 p-4">
              <a href="/about-us" class="group block flex-shrink-0">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block h-10 w-10 rounded-full" :src="avatar" alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-base font-medium text-white">Created By</p>
                    <p class="text-sm font-medium text-slate-400 group-hover:text-slate-300">Drew Town</p>
                  </div>
                </div>
              </a>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline/esm/index.js';
import { CalculatorIcon } from '@heroicons/vue/24/solid/esm/index.js';

import { sidebarOpen } from '../menuStore';
import { useStore } from '@nanostores/vue';
import avatar from '../images/drewtown.webp';

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
  navigation: {
    type: Array,
    required: true,
  },
});

const $sidebarOpen = useStore(sidebarOpen);
</script>
