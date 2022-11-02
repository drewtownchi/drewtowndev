---
title: Setting up an RSS feed with Gridsome
draft: false
author: Drew Town
excerpt: Allows users to easily follow your blog via an RSS feed generator
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1564933145/drewtown.dev/gridsome-feed-plugin.jpg
date: 2019-08-04T15:23:42.657Z
tags:
  - Gridsome
  - Blog
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
RSS (Really Simple Syndication) is a technology nearly as old as the World-Wide Web itself. Its earliest uses date back to 1999. The technology took off with Google Reader in 2005 until its abrupt discontinuation in 2013. Since then Twitter, Email lists and specialty aggregators have taken the place of the humble RSS feed.

Within the last few years the push-back against blog aggregators such as Medium and new technology such as static site blogs has lead to the resurgence of the personal blog. Being independent means it is more difficult to connect with users without having to rely on email lists, which are plagued with privacy concerns and management, or 3rd party services such as Twitter.

Setting up an RSS feed will allow users who are interested in your blog subscribe on their own terms. Luckily, with a simple Gridsome plugin, it is possible to accomplish this with minimal time and effort.

## The Plugin

The [gridsome-plugin-feed](https://github.com/onecrayon/gridsome-plugin-feed) is the best RSS feed generator I have seen for the Gridsome ecosystem.

It is easy to configure, allows for a decent amount of configuration options, and is able to output many different feeds if that is something you desire.

First, let's start by installing the plugin via npm into the project

```bash
npm install gridsome-plugin-feed
```

Once the plugin is installed we will need to configure the plugin in our gridsome.config.js.

```js
        module.exports = {
          siteUrl: "https://www.drewtown.dev",
          plugins: [
          {
              use: "gridsome-plugin-feed",
              options: {
                contentTypes: ["Post"],
                feedOptions: {
                  title: "DrewTown.dev Post Feed",
                  description: "Blog about Vue, JavaScript, and programming in general",
                  link: "https://www.drewtown.dev/",
                  language: "en"
                },
                rss: {
                  enabled: true,
                  output: "/rss.xml"
                },
                maxItems: 25,
                filterNodes: node => node.draft === false,
                nodeToFeedItem: node => ({
                  title: node.title,
                  author: node.author,
                  date: node.date,
                  content: node.excerpt
                })
              }
            },
            // Your other plugins
          ]
        }
```
The plugin requires a `siteUrl` to be declared in the general configuration.  Without it the plugin will not know how to generate the links to your posts in the feed.

`ContentType` is giving to match your `typeName` specified in whatever source plugin you are using.  For me I am using the type name of "Post", yours could be "Blog" for example.

One thing to make sure to get right is the filterNodes configuration.  The plugin allows you to specify a function that returns true or false based on fields in each node.  This could be something such as finding only nodes that have draft set to false.  Or, posts that are dated in the past if you schedule posts to go out at a certain time.

Finally, you will need to configure how your posts will be presented to the users in their feed readers using the `nodeToFeedItem` property.  The plugin is utilizing Feed under the hood which has a [variety of available properties](https://www.npmjs.com/package/feed#example) such as title, description, content, date and image.

## Using a feed:// Link

Once everything is feed to go you'll need to create a link on your page to allow users to find and subscribe to your RSS feed.

A tip I learned from a Twitter follower is that there is a feed:// prefix for URLs.  This prefix will allow users who use a desktop feed reader to click on the link and have it automatically launch in their feed reader of choice.

Quick and easy!

## Gotchas

One thing I learned the hard way is that once you publish an article you must never change the slug.  Even if you notice quickly and change the URL of the post feed readers may have already downloaded the feed and cached that URL.  When your users go to click on the link the URL will result in a 404 because the application has cached the old link.

## Conclusion

Now that you know how to setup a RSS feed for a Gridsome blog consider [subscribing](//www.drewtown.dev/rss.xml)! Or following me on [Twitter](https://twitter.com/drewtown_chi).
