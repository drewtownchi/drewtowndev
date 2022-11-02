---
title: Introducing Picke.rs - A Podcast Picks Explorer and Manager
draft: false
author: Drew Town
excerpt: >-
  Building Picke.rs with modern web development tools such as Strapi, Nuxt and
  TailwindCSS
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1585924131/drewtown.dev/Introducing-Pickers.jpg
date: 2020-04-03T14:25:24.247Z
tags:
  - webdev
  - tailwindcss
  - nuxtjs
  - node
layout: "../../layouts/MarkdownLayout.astro"
---

> Unfortunately, I have discontinued Picke.rs but will leave this page up as historical documentation.

Picke.rs was born out of an idea I had when listening to a few podcasts. That section at the end where they talk about things they like or “picks.” Often I would hear something that sounded cool; a new podcast, some interesting article or a backpack which I can never seem to find one I like. But I, like I’m sure many others, listen to podcasts mainly on the go.

I often would forget about what I just heard or even where I heard it.  A place where I can see all the recent picks, picks by podcast, or even the individual who made the pick would help me better track those cool and interesting things they were talking about.

Thus, Picke.rs was born.

## Back-end 

I decided to not write my back-end for this project and instead try one of the many headless CMSs available today. I chose [Strapi](https://strapi.io) for the task.  While still a young project it is progressing rapidly, has a well thought out admin portal, everything is extensible, and the documentation is thorough and complete.

Another aspect I liked about Strapi is that it is self hosted.  While this might be a drawback for some. The hosting options are straightforward with one-click deployments for Digital Ocean, Heroku and others. The self-hosted option helps me keep costs down without adding too much of a burden.

Am I glad I used a pre-built CMS instead of writing my own? You bet! I could have written the same thing in Rails, ASP.NET, Laravel or any other framework, but for what?  Instead of worrying about writing my own models, controllers, authentication and everything else that a flexible CMS gives me for free out of the box.

## Getting The Data

Getting the data has been the hardest part of this project.  Some podcasts use JSON to structure their episode data 🎉. Some podcasts use very structured markdown, which is ok.  While still podcasts use very laissez-faire markdown, that changes frequently.

I’m use a Node.js script that fetches and parses the data that is specific to each podcast.  Because the format of episodes is different, I’ve found it more helpful to build a set of utilities and helpers that can be utilized in to each individual scraper.

If you have a podcast that you would like featured on the site help me, help you. Provide clean, consistent JSON or markdown. It should be easily available and include the name of the picker, their Twitter handle if they have one, the name of the pick and a URL.

If this interests you, get in contact with me, and we’ll chat.

## Front-end 💻

For the front-end I used [Nuxt.js](https://nuxtjs.org/). Before this project, I had always been hesitant to use Nuxt.  A framework sitting on top of a framework with extra conventions always felt redundant to me. I shook off my preconceived notions and tried it for this project.

So far the experience has been great.  Everything has a place, server-side rendering (SSR) works wonderfully and the module system is very help for getting up and running quickly.

That’s not to say it isn’t without its quirks.  The error messages can be frustratingly obtuse.  On occasion there is an error that messes up SSR and the error message "Mismatching childNodes vs. VNodes” will leave you crawling through your code trying to figure out what went wrong.

## Style System

If you have read any of my previous articles, you know I am a big [TailwindCSS](https://tailwindcss.com/) fan.  Sensible defaults, built-in style system, perfect for a component based front-end.

## Images

For each of the picks I am using [Puppeteer](https://developers.google.com/web/tools/puppeteer/) to capture a screenshot of the page.  In order to more easily process and serve the images in various formats and sizes I am using [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/mhsl3bf7nlmbmfiaovrs) (referral link).  Strapi has a Cloudinary provider to upload the images via the CMS and serving them as the necessary size is as easy as change a URL parameter.

## CDN

For the rest of my CDN needs, I am using Cloudflare. It is free, convenient and ubiquitous. There isn’t much more I can say about Cloudflare that hasn’t already been said. 
