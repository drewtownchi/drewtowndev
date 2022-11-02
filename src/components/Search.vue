<template>
  <div class="flex flex-1 justify-center px-2 lg:ml-6">
    <div class="w-full max-w-lg lg:max-w-xs">
      <label for="search" class="sr-only">Search</label>
      <div class="relative text-slate-400 focus-within:text-slate-600">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search"
          v-model="searchTerm"
          class="block w-full rounded-md border border-transparent bg-slate-700 py-2 pl-10 pr-3 leading-5 text-slate-100 placeholder-slate-100 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-offset-slate-600 sm:text-sm"
          placeholder="Search"
          type="search"
          name="search" />
      </div>
    </div>
  </div>
  <div class="mt-16 text-white">
    <div class="md:border-l md:border-slate-700/40 md:pl-6">
      <div class="mx-auto flex max-w-3xl flex-col space-y-16">
        <card v-for="result in searchResults" :key="result.title" :url="result.url" :title="result.title" :post-date="result.date" :excerpt="result.excerpt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as lunr from 'lunr';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/esm/index.js';
import { computed, onBeforeMount, ref } from 'vue';
import card from './Card.vue';

interface Post {
  title: string;
  url: string;
  date: string;
  excerpt: string;
}

let idx = ref<lunr.Index>();
let posts = ref<Array<Post>>([]);
onBeforeMount(async () => {
  const docsResult = await fetch('/search-index.json');
  posts.value = await docsResult.json();

  idx.value = lunr(function () {
    this.ref('title');
    this.field('title');
    this.field('excerpt');
    this.field('body');

    [...posts.value].map((post) => {
      this.add(post);
    }, this);
  });
});

let searchTerm = ref('');
const searchResults = computed(() => {
  if (searchTerm.value.length >= 2) {
    if (idx.value === undefined) return [];
    let results: Array<lunr.Index.Result> = idx.value.search(searchTerm.value);
    let titles = results.map((r) => r.ref);
    let filteredPosts = posts.value.filter((p: Post) => {
      return titles.includes(p.title);
    });
    return filteredPosts;
  }
  return [];
});
</script>
