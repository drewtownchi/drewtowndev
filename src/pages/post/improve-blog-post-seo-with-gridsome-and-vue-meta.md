---
title: Improve Blog Post SEO with Gridsome and Vue Meta
draft: false
author: Drew Town
excerpt: Get better SEO and social media cards for your blog when using Gridsome
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1570255208/drewtown.dev/ImproveBlogPostSeoWithGridsomeAndVueMeta.jpg
date: 2019-10-05T05:06:03.351Z
tags:
  - Gridsome
  - VueMeta
  - SEO
  - Blogging
layout: "../../layouts/MarkdownLayout.astro"
---
Gridsome generously includes [Vue Meta](https://vue-meta.nuxtjs.org/) which has become the de-facto standard for updating the `<head>` tag in Vue projects.  Combining the power of Vue Meta with various aspects of the Gridsome GraphQL API we can create relevant page titles, descriptions and create rich social media cards for blog posts that use Gridsome.

## Getting started

As long as you have a working Gridsome site there is nothing you have to do to get started!  From any of your Gridsome pages or templates

## Adding meta info to pages

As Gridsome's pages are generally static we can use the basic Vue Meta syntax to add a title.  In our site's `pages/Index.vue` we can add a `metaInfo` object in our JavaScript.

```js
export default {
  metaInfo: {
    title: "Hello, world!"
  }
}
```

Now when we visit the home page of our blog we will see the tile of our tab has changed to `Hello, world! - Drew Town Dev`. By default, Gridsome will append your site's name from `gridsome.config.js` file  using the `siteName` value.

```js
module.exports = {
  siteName: "Drew Town Dev",
  // ...other config
}
```

It is possible to override this by setting Vue Meta's `titleTemplate` property which could be set in your Layout `Default.vue` if you prefer a different title template. For example, switching to a pipe instead of a dash would require `titleTemplate` value of `%s - My Travel Blog` 

## Adding meta info to templates

Templates are where the real power of Vue Meta comes into play.  We can use the method syntax of Vue Meta to dynamically change values.  The method syntax will allow us to dynamically set the title and the meta description of the page for starters.  Additionally, we can detect if a post has various properties, such as a cover image, which will allow us to add extra tags to inform Twitter or Facebook that they can display our links as rich cards.

In this example, we will use information about our post from a Gridsome [page query](https://gridsome.org/docs/querying-data/#query-data-in-page-components) to add extra information to the head meta tags.

```js
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.excerpt
        },
        {
          property: "og:title",
          content: this.$page.post.title
        },
        {
          name: "twitter:card",
          content: this.$page.post.image ? "summary_large_image" : "summary",
        },
        {
          name: "twitter:creator",
          content: "@drewtown_chi"
        },
        {
          property: "og:description",
          cotent: this.$page.post.excerpt
        },
        {
          property: "og:image",
          content: this.$page.post.image || ""
        }
      ]
    };
  }
}
```

The title tag can be set as a direct property on the returned object as it is expected by Vue Meta.  The other meta tags must be returned as an array of `meta` objects via the meta property.

The content can be set using the `this.$page.post` values, static values, or event ternary expressions in the case of the `twitter:card` tag.  In this example, we assess whether an image exists or not to help Twitter determine which type of card to use for the post.

## Wrapping up

There are many [tags](https://ogp.me/) and [structured data types](https://developers.google.com/search/docs/data-types/recipe) such as recipes, events, books and many more that can be used to help guide users to your content and boost SEO rankings.

Using Vue Meta with Gridsome is the best way to make use of the various tags available with the least amount of effort required.
