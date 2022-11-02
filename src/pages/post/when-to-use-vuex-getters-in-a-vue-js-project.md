---
title: When To Use Vuex Getters In a Vue.js Project
draft: false
author: Drew Town
excerpt: Using the right tool for the right job when using Vuex
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1566912885/drewtown.dev/WhenToUseVuexGettersInaVuejsProject.jpg
date: 2019-08-27T13:32:42.575Z
tags:
  - Vuex
  - Vue
  - Webdev
layout: "../../layouts/MarkdownLayout.astro"
---
One of the features of [Vuex](https://vuex.vuejs.org) is its ability to parse and cache values from the store's state for quick retrieval via getters. [Vuex getters](https://vuex.vuejs.org/guide/getters.html) are equivalent to Vue's computed properties in that they both are reactive to changes in dependencies and cached for improved performance.  A question I often see from beginners when learning Vue and Vuex is when to use getters in their project.  There is often a misunderstanding that Vuex must be used for all data retrieval from the store and a tendency to overuse getters.  Often time retrieving the state from the store and performing operations on that state within components is a better solution with less boilerplate required.

The line between when to use access the state directly and when to use getters is a thin gray line.

## When accessing the state is good enough

My general rule of thumb is that whenever I need the entire value of the variable from Vuex's state, I will retrieve it directly from the state. Some examples where you would want the entire value may be a boolean, a string, a whole object or an entire array. When you are retrieving the entire variable from the state it makes sense to retrieve the entire value by accessing it directly from the state.

```js
export default {
  computed: { 
    isOpen() {
      return this.$store.state.isOpen; 
    }
  }
}
```

There is little value gained from wrapping the retrieval of these values in a getter.  The computed property in the component will cache the result and will also watch the dependency, in this case, the store's state, for any changes. You receive the benefits of the getter without the boilerplate required by Vuex.  By creating a getter in these cases you've essentially created two different access points into the store that returns the exact same value.

The inclination of beginners starting to use Vuex is to use it for everything and use all of its features.  At first, it seems smart. All your state, mutations, actions, and getters in one centralized place which should make it easy to reason about. You'll quickly realize that adding unnecessary boilerplate is one of the great follies of the Flux pattern that Vuex is based on.  The excess code required is tiresome for the value extracted in certain cases such as the one outlined above.

Use Vuex where it is the strongest and best option but avoid overusing it because it is available.

## When to use getters then?

Most of the time getters are the best option when you need to access state **and** filter or manipulate the data in some way.  Getters are even better when you need to access state and use the same filtering and parsing in multiple components.

> Getters provide a great interface for containing and reusing data logic in a centralized place.

Let's take a look at a to-do application that needs to provide different views.  Certain views may only need to show a list of all to-dos where others may need to sort them by the due date attached to the to-do item.

```js
getters: {
  openTodos: state => {
    return state.todos.filter(todo => !todo.done);
  },
  sortedTodos: state => {
    //remember sort mutates the original array so, copy it first with a spread.
    return [...state.todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
}
```
Implementing the filtering and sorting logic in Vuex allows you to centralize and organize data manipulation across the application.  This helps keep components less concerned about how to manipulate the data and allows for easier refactoring. When logic is changed or data is updated there are fewer places to update reducing the work required to update the code.

## Using variables in getters

Another good use for getters is to retrieve object items from an array by their id.

```js
getters: {
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id);
  }
}
```

Because getters can accept a variable via the [method style access](https://vuex.vuejs.org/guide/getters.html#method-style-access) getters are a convenient way to centralize and organize access to data even when you need to supply parameters.  Rather than having the find logic spread across many components and files a single method can be used to contain all the required logic.

## Conclusion

Getters are a great tool but not every problem is a nail.  Use them often when needing to extract parts of the state in the store or manipulate data before retrieving it. Centralizing the logic will reduce the amount of code reuse and duplication at the cost of adding some boilerplate.  In those cases, the benefit greatly exceeds the cost.
