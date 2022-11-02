---
title: Setting up Tailwind and Purgecss with Gridsome Without Using Any Plugins
draft: false
author: Drew Town
excerpt: >-
  Configuring Tailwind, the utilities based CSS library to work with Gridsome
  without any plugins
date: 2019-05-09T20:37:06.191Z
tags:
  - Tailwind
  - Gridsome
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
> Note: This article has been updated in spots for Tailwind 1.4.0 which has PurgeCSS built-in.

If you haven't heard of Tailwind by now it is a rising star in the utility-first CSS framework space that makes developing with CSS fun and productive.  With Tailwind you are no longer fighting against the framework to try and get the box outline blue or the margin between your cards a certain `rem` size.

Instead, Tailwind gives you the tools and utilities to build unique looking websites by composing the necessary pieces together.  There are opportunities still to create a pre-defined `.button` or `.box` component. But instead of providing those out of the box Tailwind gives you the flexibility to decide what those defined components should be and how many of them you will need.

When using a utility-based CSS library you are always selecting the parts of the library that you want to take into your project.  Adding `my-8 shadow-lg rounded-sm` to a div means that your project now depends on those classes.  But what about `my-0 and my-2` and all of the other varieties that come with Tailwind?  Without using something like Purgecss your deployed site would need to bring all of those unused classes that Tailwind helpfully provides along for the ride to production.  This is sub-optimal as the client is now the server is going to need to ship those bytes and each client will be downloading them.

Even though Tailwind provides many options for various padding, margin, colors and more most likely you'll only be using a fraction of those. With Purgecss we can cut the bloat and do so aggressively by scanning files for instances of those class names and removing those that went unused in any of the templates.  

At the time of writing this article the styles for all of [drewtown.dev](https://www.drewtown.dev) are 3.6KB gzipped while still having access to all of the power of Tailwind when developing.  Combining Tailwind and Gridsome is a no-brainer. The speed of a static JAM stack demands and efficient CSS stack to go with it and Tailwind is the answer.

# Dependencies

> No longer required for Tailwind > 1.4.0

```bash
npm i -S @fullhuman/postcss-purgecss tailwindcss
```

# Create a Tailwind Configuration File

Tailwind requires a [configuration file](https://tailwindcss.com/docs/configuration) that will be used to generate the necessary classes.  We need to initialize one and by default it will create a `tailwind.js` file.

```bash
npx tailwind init [optionally provide a file name here]
```

Update the generated `tailwind.config.js` to include purge settings.

```js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {},
  variants: {},
  plugins: [],
}
```

# Importing Tailwind

Once the initializing process is complete we have to import Tailwind into our project.  This could be done in your `App.vue` file but I prefer to create a `global.css` file.  In the global.css file I can create any necessary global components outside the scope of the Gridsome project.

```css
/* global.css */
@tailwind base;
@tailwind components;
/* Add your btn/input/etc components here */
@tailwind utilities;
```

Import the global.css file into your main.js file.

```js
//main.js
import "./styles/global.css";
```

# Gridsome Configuration

Gridsome provides [CSS loader options](https://gridsome.org/docs/config/#cssloaderoptions) which is what allows us to hook into the build process without a plugin.

First we must import Tailwind and tell it where to locate the Tailwind configuration file.  Next, import Purgecss's Postcss plugin.  When we are developing it would be time consuming and unnecessary to run Purgecss.  Instead of running it all the time it is possible to conditionally add the purgecss plugin to the postcss plugins array by checking the value of `process.env.NODE_ENV` for production.

```js
const tailwindcss = require("tailwindcss");
// No longer needed as of Tailwind 1.4.0
// const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  siteName: "The Site Name",
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
          // No longer needed as of Tailwind 1.4.0
          // ...process.env.NODE_ENV === "production" ? [purgecss] : []
        ],
      },
    },
  }
};
```

# Purgecss Configuration Options

If you are using Tailwind > 1.4.0 you can pass options through to PurgeCSS via the `tailwind.config.js` file. You only need to perform these customization if your production build is unable to extract all of your required classes your you use a library that injects classes during runtime.

```js
// tailwind.config.js
module.exports = {
  purge: {
    content: [
      './src/**/*.vue',
      // other content types mentioned above
    ],
    options: {
      whitelist: ['my-special-class', 'other-class'],
      whitelistPatterns: [/^fa-/, /^svg-inline--fa/], 
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/], 
    }
  }
}
```

Finally, If you are using Tailwind < 1.4.0 we need to make a few modifications to the Purgecss purge.config.js file.

```js
module.exports = {
  content: [
    "./src/**/*.vue",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.html",
    "./src/**/*.pug",
    "./src/**/*.md",
  ],
  whitelist: ["svg:not(:root).svg-inline--fa"], 
  whitelistPatterns: [/^fa-/, /^svg-inline--fa/], 
  whitelistPatternsChildren: [/^token/, /^pre/, /^code/], 
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [] 
};
```

## Content

The content array allows you to specify a series of paths to check for CSS classes.  You can be as inclusive or restrictive as necessary.

## Extractor

It is required to provide a `defaultExtractor` to Purgecss that will be able to correctly parse Tailwind classes.  Without adding the extractor Purgecss will miss many classes in your template that have dashes or colons in them.

## Whitelisting

Sometimes Purgecss can be a bit too aggressive in pruning classes from your CSS files.  Usually, this happens with dynamic classes or third party libraries that Purgecss doesn't have access to or are loaded at runtime.  It is your responsibility to whitelist these either in the one of the [whitelist options](https://www.purgecss.com/whitelisting) available in Purgecss whether that is in the configuration file like the example above, or via a comment in the CSS file.

## Wrapping up

At this point Tailwind is loaded into the Gridsome project and all of the many help utilities should be available to make styling your pages a breeze.
