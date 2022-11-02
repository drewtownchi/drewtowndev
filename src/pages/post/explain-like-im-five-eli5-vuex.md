---
title: Explain Like I'm Five (ELI5) Vuex
draft: false
author: Drew Town
excerpt: How Vuex is like the humble vending machine
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1572020712/drewtown.dev/ExplainLikeImFiveVuex.jpg
date: 2019-10-25T16:22:23.032Z
tags: 'Vue,Vuex,Beginners'
layout: "../../layouts/MarkdownLayout.astro"
---
A question that I see come up from new users to Vue is, “What is Vuex?” Or, “Can someone ELI5 (explain like I’m five) what Vuex is?” and usually the response is something like “Vuex is a flux pattern for storing and retrieving data from a centralized global object store”.  While technically correct, this answer always leaves me scratching my head and wondering what five-year-olds this person is hanging around?  When I was five, I was more excited by Tonka trucks or playing soccer than learning about programming patterns.

When this question came up on Reddit, I spent some time to figure out about how I could explain Vuex to a five-year-old.  An answer without the jargon and straight to the point.  I feel a good analogy for Vuex is a vending machine.

If you’ve ever used a vending machine, you know that a user can buy items using buttons. The machine also needs to be stocked; someone needs to deliver those goods to the machine, and it needs a mechanism to get the user’s choice into their hands.

Let’s go over the different Vuex concepts and see how we can best relate them to the vending machine.

## State

The Vuex concept of state is fundamentally what is in stock at the vending machine.  This might be anything for chips to cookies to strings.  Or even integers, arrays, or objects.

Vending machines can seemingly carry any number of items under the sun the same holds true for Vuex.  Vuex can hold any JavaScript type.  Keep in mind though that Vue’s [reactivity caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) also hold true for Vuex.

## Getters

Getters are how you access the contents of the vending machines.  If you would like to buy the cookies, you insert your money and punch the buttons to get your item.  

In Vuex getters are more powerful than simple vending machine buttons.  Instead of getting back one item, you could select only the chocolate chip cookies.  It would be possible to combine various pieces of your state to create something that didn’t even exist before.  

Getters are a powerful way to shape your data to retrieve only items you want or to build new items from the data that exists in state.

If you are familiar with Vue’s computed properties, they are comparable to Vuex’s getters.

## Mutations

When a vending machine is new or getting low, someone needs to come around a stock it full of goods.  Mutations are how we fill up our Vuex vending machine.

When we receive our Vuex vending machine, we don’t want to change the contents as that may break Vue’s reactivity.  You should make sure all of your fields, or items for sale, are set up ahead of time.

## Actions

Sometimes when you go to fill your vending machine, you may not have all the items you need.  Instead of leaving the vending machine to go get more items to fill it up, you call a friend (async request) to retrieve the items and bring them to you.

Once your friend arrives with the goods, you can now fill the vending machine with a mutation.
