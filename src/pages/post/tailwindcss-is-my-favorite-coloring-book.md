---
title: Tailwindcss is My Favorite Coloring Book
draft: false
author: Drew Town
excerpt: How a constrained set of choices makes your design better
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1565533500/drewtown.dev/Tailwindcss-is-my-favorite-coloring-book-sara-torda-unsplash.jpg
date: 2019-08-11T14:24:43.471Z
tags:
  - Tailwindcss
  - design
  - webdev
  - css
layout: "../../layouts/MarkdownLayout.astro"
---
I am, by nature, a tinkerer. When putting a design together rarely am I satisfied on my first attempt. Rarely, am I satisfied with my design until iteration 3, 4 or even 5. Let's see how a limited set of choices can help you create a cleaner page with less CSS and less mental overhead for designers and developers.

[Tailwindcss](https://tailwindcss.com/) has a well-crafted design system of utility classes. If you are unaware of utility-first CSS it is a system of hyper-focused classes that do exactly 1 thing. `mx-1` or `shadow-lg` are responsible for doing 1 thing, increasing the horizontal margin or adding a large box-shadow. These classes can be combined to create cards or buttons or any other aspect of your page.

## The Design System

Utility classes provide the guidelines to your design system. The design system allows you to tinker by changing values but only to a limited set of alternatives. The creators of Tailwindcss like to express this as a "constrained set of choices."

A constrained set of choices limits your ability to adjust the margin from 1rem to 1.05rem as that is not a choice within the design system provided. Why is that good? If you need 1.05rem shouldn't you be able to use that value as your margin? Seldom has such fine-grained control over such small details lead to a better design. You've introduced a small detail that may only appear in 1 place, or worse still, may need to be remembered and used in other places.

Instead, Tailwindcss provides a thoughtful design system of limited choices.  The choices provided are flexible but still force you to work within the lines. 

## Consistency is Key

One key to a professional-looking design is consistency. Having to decide about spacing or shadows or font sizes while trying to build a new design will add a lot of mental overhead. Tailwindcss takes those decisions out of your hands and has created a design system that allows you to be flexible, tinker.

The limited choices available helps both designers and developers be more consistent and agree on a design language without needing a full blown design system.

## Remove Choices, Reduce File Size

Having a guide such as Tailwindcss will always reduce your CSS bundle size. Taking the choices out of designing will prevent designers and developers from adding 9 versions of red, all which look the same. Or, adding 12 different box-shadow styles where 4 would do.

It is a dual benefit, reduce cognitive overhead of making design system choices and also prevent CSS bloat. When there are only 4 well-known choices for a box-shadow it is harder for developers and designers to go rogue and introduce their own. Trust and use the system.

## Alternatives

The constrained design system isn't unique to Tailwindcss. A similar system could be implemented using SASS variables. This would be a workable alternative but would need an immense amount of work to recreate. Additionally this is something that Tailwindcss has already done very well and provides a ton of flexibility with the configuration system.

Get out there and start coloring.
