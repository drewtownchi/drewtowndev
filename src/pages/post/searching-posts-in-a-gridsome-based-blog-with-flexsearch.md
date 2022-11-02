---
title: Searching Posts in a Gridsome Based Blog with FlexSearch
draft: false
author: Drew Town
excerpt: Filtering directly on the client without relying on a third-party service
date: 2019-05-05T23:37:35.962Z
tags:
  - Gridsome
  - Search
  - FlexSearch
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
Search services like Algolia and others are great. They provide an easy to use API that is able to index your data and provide a sleek interface to search your data for your site.  For some cases though these services might just be a bit overkill. Such as the case of a small blog or documentation site.  In a small data set where you may be only searching hundreds or thousands of pages a local search library will likely get the job done without having to rely on a third-party.

There are plenty of JavaScript-based libraries that can provide a great tokenized advanced searching solution similar to one provided by a service.  One that has really stood out is [FlexSearch](https://github.com/nextapps-de/flexsearch) which bills itself as, "Web's fastest and most memory-flexible full-text search library with zero dependencies.".  I have found FlexSearch to be fast, efficient and most importantly very easy to use.

> The examples in this post will use Gridsome's `<static-query>` but it would be possible to implement this using plain Vue, another framework or data source.

# Prerequisites

To get started we'll need the `flexsearch` package from npm.

```bash
npm install flexsearch
```

# Creating the Search.vue page

The most important parts of the Search.vue page are going to be the `<static-query>` and the `<script>` sections.

## Static Query

For this example we are using a very simple static query that is retrieving all of the posts and the fields necessary for searching and displaying in a list.  It may be necessary to add additional filtering if your data set is very large or you only want to search a portion of your data set.

```html
query Posts {
  posts: allPost {
    edges {
      node {
        id
        title
        date
        path
        excerpt
      }
    }
  }
}
```

## Script
There is a bit going on in the script section so let's break it down into 2 sections `beforeMount` and `computed` after taking a look at the full script section.  

> I will not cover using v-model to bind an input and looping through the `searchResults` and instead will leave that as an exercise to the reader.

```js
import Flexsearch from "flexsearch";

export default {
  data() {
    return {
      index: null,
      searchTerm: ""
    };
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "id",
        field: [
          "title",
          "excerpt"
        ]
      }
    });
    this.index.add(this.$static.posts.edges.map(e => e.node));
  },
  computed: {
    searchResults() {
      if (this.index === null || this.searchTerm.length < 3) return [];
      return this.index.search({
        query: this.searchTerm,
        limit: 10
      });
    }
  }
};
</script>
```

### BeforeMount

In Vue's beforeMount [lifecycle method](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) we will setup the FlexSearch index.

`tokenize` set to forward tells FlexSearch to divide up the words as chunks and search forward in the word. Meaning, `tag` would match `tags` but `ags` would not be a match.

The `doc` object helps FlexSearch understand the array of data objects we will be passing into the instance.  Id should match the id field in the object and the field array should contain a list of field names we want FlexSearch to query against.

There are many available [options](https://github.com/nextapps-de/flexsearch#options) that can be tweaked based on your requirements or data set that are too advanced for this post.

```js
this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "id",
        field: [
          "title",
          "excerpt"
        ]
      }
    });
```

Once the index has been setup add the static query results to the index as an array.

```js
this.index.add(this.$static.posts.edges.map(e => e.node));
```

Finally, we need a way to match the searchTerm that is bound to an input to the data in the index.  A computed property will allow the results to be instantly available to the template.

It will be prudent to put some safeties in this property such as checking if the FlexSearch index is null or the searchTerm does not meet a minimum character length.

```js
  computed: {
    searchResults() {
      if (this.index === null || this.searchTerm.length < 3) return [];
      return this.index.search({
        query: this.searchTerm,
        limit: 10
      });
    }
  }
```
