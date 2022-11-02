<template>
  <article class="md:grid md:grid-cols-4 md:items-baseline">
    <div class="group relative flex flex-col items-start md:col-span-3">
      <h2 class="text-base font-semibold tracking-tight text-slate-100">
        <div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-slate-700/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
        <a :href="props.url">
          <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span class="relative z-10">{{ props.title }}</span>
        </a>
      </h2>
      <time class=":text-slate-500 relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm md:hidden" :datetime="props.postDate">
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span class="h-4 w-0.5 rounded-full bg-slate-500" />
        </span>
        {{ formattedDate }}
      </time>
      <p class="relative z-10 mt-2 text-sm text-slate-400">{{ props.excerpt }}</p>
      <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
        Read article
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
          <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <time class="relative z-10 order-first mt-1 mb-3 flex hidden items-center text-sm text-slate-500 md:block" :datetime="props.postDate"> {{ formattedDate }} </time>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
});

const formattedDate = computed(() => {
  if (props.postDate === undefined) return '';
  return new Intl.DateTimeFormat('en-US').format(new Date(props.postDate));
});
</script>
