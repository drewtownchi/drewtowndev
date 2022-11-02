---
title: Finding the Right Purgecss Extractor
draft: false
author: Drew Town
excerpt: >-
  When using Tailwind with Vue's computed styles tweaking the extractor is
  required
date: 2019-05-11T12:46:56.407Z
tags:
  - Vue
  - Tailwind
  - Purgecss
  - Tips
layout: "../../layouts/MarkdownLayout.astro"
---
When I was writing the tutorial on [Setting up Tailwind with Purgecss](/post/setting-up-tailwind-and-purgecss-with-gridsome-without-using-any-plugins) I was running into an issue where my Vue.js computed styles were getting purged by Purgecss.  I was having a hell of a time and hat tip to [@adamwathan](https://twitter.com/adamwathan), the creator of Tailwind, for pointing me in the right direction.

https://twitter.com/drewtown_chi/status/1126644092325322753

When considering the "default" extractor for Tailwind `/[A-Za-z0-9-_:/]+/` it would absolute make sense that `hidden:` would be considered a valid class name.  Unfortunately if `hidden:` is the only place that our hidden class name appears then the class name that we really want `hidden` will no longer be in our CSS file.

Playing around with the RegEx and my Vue files I was able to adjust my RegEx to use the `\b` meta character on both the beginning and end of the RegEx.

```js
/-?\b[A-Za-z0-9-_:/]+\b/g
```

This has worked perfectly for me as I do not use any special characters to start or end my CSS classes and I do not see any cases where Tailwind does either. So now in my computed properties the RegEx finds only `hidden` and not `hidden:`.

```js
  computed: {
    navClasses() {
      return {
        block: this.navOpen,
        hidden: !this.navOpen
      };
    }
  }
```
