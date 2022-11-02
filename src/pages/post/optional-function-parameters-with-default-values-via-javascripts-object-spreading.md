---
title: >-
  Optional Function Parameters With Default Values Via JavaScript's Object
  Spreading
draft: false
author: Drew Town
excerpt: >-
  Optional parameters are a thing of the past. Use the object spread syntax for
  easy parameter overriding
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1563818306/drewtown.dev/Optional-Options-Via-JavaScripts-Object-Spreading.jpg
date: 2019-07-22T17:55:15.034Z
tags:
  - JavaScript
  - Tutorial
  - Webdev
layout: "../../layouts/MarkdownLayout.astro"
---
More than likely at some point you have had to deal with a function that has 4 parameters and 10 optional parameters. Most of the time you never need to touch the optional parameters and life is great. But, on occasion, you will need to change the 7th optional parameter.  All of that flexibility comes at a cost and optional parameters are often used to guide you in the right direction. Changing the 7th optional parameters means specifying optional parameters 1 through 6 even though you wanted to use the defaults all along!

We'll take a look at how we can use objects and the spread operator to provide good default values while still allowing for overrides in a much simpler way.

One of the features added to ES2018 is object spreading with object literals. Object spreading is a helpful new feature which can help with the problem described above. Spreading allows developers to copy an object and *spread* it into another object creating a copy of the new and old object merged together.

```js
const newData = { b: 3, c: 4 }
const data = { a: 2, ...newData} // data === { a: 2, b: 3, c:4 }
```

One of the key aspects of how the copying is performed is that when an object is spread into the other object the properties that come later in the declaration are used over the properties that were declared earlier.

```js
const newData = { a: 10, b: 3, c: 4 }
const data = { a: 2, ...newData} // data === { a: 10, b: 3, c:4 }
```

Even though `a: 2` is created directly in the `data` object it is overwritten by the `newData` that is being spread into the object.  This is great for setting default values in a function and then allowing callers of the function to override them with other values.

First, let's take a look at the old way of doing things.

## The Old Way

This is an example of one of many ways we could set function parameters with a default value.

In our sample application we need to create an array of cats.  Our function will provide a way for the caller to provide a name and a color.  Optionally, the callers will have the ability to set the type of food the cat eats as well as their favorite toy.

```js
function createCat(name, color, foodType = "dry", favoriteToy = "yarn") {
  return {
    name,
    color,
    foodType,
    favoriteToy
  }
} 

console.log(createCat("Tom", "grey")); // { name: 'Tom', color: 'grey', foodType: 'dry', favoriteToy: 'yarn' }
```

Now, in this example if we wanted to change Tom's favorite toy to "ball" we would need to change our function call to specify the `foodType` and the `favoriteToy` even though we want to use the default value for food.  This is because there is no way to specify optional parameters by name, the orders matters and is required.

## Updating The Function

Instead of specifying optional parameters in the function signature let's update the function to accept a parameter called `options`.

```js
function createCat(name, color, options) {
  return {
    name,
    color,
    foodType: "dry",
    favoriteToy: "yarn",
    ...options
  }
} 

console.log(createCat("Tom", "grey")); // { name: 'Tom', color: 'grey', foodType: 'dry', favoriteToy: 'yarn' }
```

Now we can get the same results as before by just passing in "Tom" and "grey" like we were doing with the optional parameters.  In this case we are accepting an options parameter and we are leaving it `undefined`. This is fine and the spread operator will not throw an error.

Now, if we want to change Tom's favorite toy to "ball" we can provide an object to the `createCat` function that specifies the `favoriteToy` property along with our updated value.  All without having to specify a `foodType`!

```js
createCat("Tom", "grey", { favoriteToy: "ball" });
```

## Real-world Example

It's not hard to imagine a scenario where there are many default parameters that could be updated this way in a real-world application.  For example, when working with tables formatting options are generally fairly similar.  Most of the time they will all be the same size and follow the same alignment. But, you may want all number cells right-aligned to make it easier to scan. 

We can use these types of functions that accept optional parameters.  Better still we can compose them together to create a more friendly API for users.  In our example where we want all number cells to be the same we can create a new function `createTableNumberCell` which will pass along predefined options to a `createTableCell`.

```js

createTableCell(value, options) {
  return {
    value,
    align: "left",
    ...options
  }
}

createTableNumberCell(value) {
  return createTableCell(value, {align: "right"});
}
```

Composing functions together like this is generally easier to use and doesn't require users to remember various options or always be referring to the documentation. 

## Drawbacks
There are a few drawbacks to using this method that we should address.

### No deep cloning

In JavaScript objects are references and the spread operator only copies the first level of the object that is being spread.  This means if you want to use nested objects in the overrides it is possible to change those overrides after you have passed the overrides into the function.  This is generally not going to be your intention and should be avoided or handled with extra caution.

```js
const overrides = {
  prop: {
    itemA: 1
  },
  itemB: 2
}

function makeCell(title, overrides) {
  return {
    title,
    ...overrides
  }
}

const cell = makeCell("New Cell", overrides);
console.log(cell); // { title: 'New Cell', prop: { itemA: 1 }, itemB: 2 }

// Whoops
overrides.prop.itemA = "ABCD";
console.log(cell); // { title: 'New Cell', prop: { itemA: 'ABCD' }, itemB: 2 }
```

### Need to know the available options/internals of the function

It can be difficult for users of the function to know what the available options are compared to explicitly using function parameters.  Users will need to dig into the function to see what options are available and how they should be set as it is not immediately obvious.

This can be remedied in part by using the composable functions discussed previously. This allows you to make simpler use cases more streamlined while still providing escape hatches for more complex scenarios.
