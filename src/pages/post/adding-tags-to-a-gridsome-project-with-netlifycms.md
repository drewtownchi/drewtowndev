---
title: Adding Tags to a Gridsome Project with NetlifyCMS
draft: false
author: Drew Town
excerpt: Using Gridsome's refs configuration option to create post tags
date: 2019-05-04T20:14:30.670Z
tags:
  - Gridsome
  - NetlifyCMS
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
Adding tags to posts in a Gridsome project has a few configuration quirks but once you are up-and-running the workflow is relatively straightforward.

> This post builds on top of the previous [post](/post/setting-up-gridsome-with-gitlab-netlifycms-and-netlify) and has a demo [here](https://tags--drewtownchi-cat-blog-example.netlify.com).

![Example of tags on a post](https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1557004216/drewtown.dev/GridsomeTagsExample.png)

## Prerequisites

If you don't have the `@gridsome/transformer-remark` package added to your Gridsome project you will need it installed.

```bash
npm install @gridsome/transformer-remark
```

## Adding the tag field to the config.yml

```yaml
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Tags", name: "tags", widget: "list"}
```

The last line is what needs to be added.  The [list widget](https://www.netlifycms.org/docs/widgets/#default-widgets) in the NetlifyCMS will allow us to generate a list of tags in our CMS for each post.

## Adjusting gridsome.config.js

Next, we'll need to add a `remark` and `refs` section to our source filesystem section.  This section tells Gridsome how to create the reference based on the tags field and what the route should be.

```js
module.exports = {
  siteName: "Cat Blog",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "post/**/*.md",
        typeName: "Post",
        remark: {
          plugins: []
        },
        refs: {
          tags: {
            typeName: "Tag",
            route: "/tag/:id",
            create: true
          }
        }
      }
    }
    // Other Plugins
   ]
    // Other configuration options
};
```

## Create the template

For a list of items Gridsome uses [**templates**](https://gridsome.org/docs/templates).  The tags page is a collection of posts based around a tag id therefore we'll need to use a template to query, filter and display them all.

Let's go over the various parts of the `Tag.vue` template file.

### Page Query

The page query is a little different than your standard query.  Using the id passed in by the route and made available from Gridsome we can query for the tag.  Using the `belongsTo` relationship allows us to get all of the posts that have the specified tag attached.

```html
<page-query>
query Tag ($id: String!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            id
            title
            path
            content
          }
        }
      }
    }
  }
}
</page-query>
```

### Script

This section is fairly straightforward.  Set the title of the page to be the tag name and create a little helper computed property that will simplify the template.

```js
<script>
export default {
  metaInfo() {
    return {
      title: this.$route.params.id
    };
  },
  computed: {
    posts() {
      return this.$page.tag.belongsTo.edges.map(e => e.node);
    }
  }
};
</script>
```

### Template

We now have everything we need to render out a list of the filterd posts in our template. All that is left is to loop through the list of posts and display the glorious cat pictures that match our specified tag.

```html
<template>
  <Layout :title="this.$route.params.id">
    <div class="container">
      <main>
        <h1>All {{ $route.params.id }} posts</h1>
        <article v-for="post in posts" :key="post.id">
          <h2>{{post.title}}</h2>
          <div v-html="post.content"/>
        </article>
      </main>
    </div>
  </Layout>
</template>
```

**Note:** It is important when setting a `v-html` on an elemnt that you use a `div` and not a `p` tag as it can [confuse hydration](https://github.com/gridsome/gridsome/issues/337) when deploying to production.

## Showing tags

Any place we want to show the tags we'll need to update our query to include the tags. For example, on the home page `Index.vue` we now want to show a list of the tags below the title of the post.

```
query Posts {
  posts: allPost {
    edges {
      node {
        id
        title
        content
        tags {
          id
          path
        }
      }
    }
  }
}
```

This query adds the `tags` section to the node and gets the **id** and **path** for each tag. The id will be the text of the tag and the path will be the slugified tag name.

```html
<div v-for="post in $page.posts.edges" :key="post.node.id">  
  <h2>{{post.node.title}}</h2>
  <div class="badge" v-for="tag in post.node.tags" :key="tag.id">
    <g-link class="badge-link" :to="tag.path">{{tag.id}}</g-link>
  </div>
</div>
```

Looping the tags is now as easy as a `v-for` loop and passing the necessary components to the `g-link` component.

See the full source in the [demo repository](https://gitlab.com/drewtown_chi/cat-blog/tree/tags).
