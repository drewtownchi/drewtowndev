---
title: Using Vue's v-model With Objects
draft: false
author: Drew Town
excerpt: Updating Vue objects in child components while allowing parents to use v-model
date: 2019-05-06T21:53:22.636Z
tags:
  - Vue
  - JavaScript
layout: "../../layouts/MarkdownLayout.astro"
---
I'll occasionally run across a scenario where I have an object or a list of objects that would be useful to extract into a child component.  You could go through the process of creating HTML elements for each item in the object and directly binding a v-model to the input elements but this is Vue! We have the power to extract these repeated fields into a child component and save ourselves from having to generate tons of HTML boilerplate.

> JavaScript objects are pass by reference which through this quirk means that we could effectively bypass Vue's parent-child events by altering the object directly.  **This is bad** and can make troubleshooting your application very hard.

```js
// Child component
// DO NOT DO THIS!
export default {
  props: [value]
  methods: {
    update(key, newValue) {
      value[key] = newValue
    }
  }
}
```

# Example of using v-model with an Object

For this example let's say you have a list of known events that also have a description or some other metadata associated with them.  These could be conferences, holidays or birthdays.  We'll use an array of holidays for this example.

https://codesandbox.io/embed/9l6oz33klw?fontsize=14

## Data

An example of the type of data we are working with.  A simple list of holidays which includes their name, the date and a description of the holiday.

```js
  data() {
    return {
      holidays: [
        {
          name: "Fourth Of July",
          date: null,
          description: ""
        },
        {
          name: "Thanksgiving",
          date: null,
          description: ""
        }
      ]
    };
  }
```

## List the child components in the parent

In the parent we can loop the holiday array and bind the holiday to the child component using `holiday[i]` in this case.

```html
      <div v-for="(item, i) in holidays" :key="i">
        <h2 class="is-size-4">{{item.name}}</h2>
        <Child v-model="holidays[i]"/>
      </div>
```

## The child

The child component should appear similar to most other components you've seen that use implement the `v-model` pattern.  The exception being we need to emit a copy of the entire object back to the parent.  Remember, when passing down an object to the child we are passing down a reference.  We must copy it before we alter the values on the object to avoid later headaches and follow the approved parent-child 1-one data flows.

### Template

In the template the HTML input elements cannot use v-model because we need to control how the values are updated.

On the `@input` event specify a method `updateValue` and provide the first parameter as the name of the key on the object, the second parameter can be `$event.target.value` or whatever you want to set the key's value to.  Repeat this for all of the object's fields you wish to modify in the child component.

```html
<template>
  <div>
    <div class="field">
      <div class="control">
        <label for="name" class="label">Name</label>
        <input class="input" :value="value.name" @input="updateValue('name', $event.target.value)">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label for="date" class="label">Date</label>
        <input
          class="input"
          type="date"
          :value="value.date"
          @input="updateValue('date', $event.target.value)"
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label for="textarea" class="label">Textarea</label>
        <textarea
          class="textarea"
          :value="value.description"
          @input="updateValue('description', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
```

### Script

For the script section, we need to accept a value prop in order to be compatible with `v-model`.  

Finally, the most important part is handling the emit event.  We'll want to emit a standard input event but the value is going to be special.

The `UpdateValue` method is going to emit the value of new object through this code `{ ...this.value, [key]: value }`. Here we will use 2 advanced JavaScript features that help keep our code very clean.  The first is the [object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) which copies the object passed down via the prop and will merge the updated key/value into the object.  

The second is using the [computed property name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) which allows us to use the variable `key` as the name of the key in the object.  This allows us to have a generic `updateValue` method that can accept a key and a value as parameters and using the inputs update the correct key on the object and emit it back to the parent.

```js
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateValue(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    }
  }
};
```

Special Thanks to Dan Vega and his [Gridsome Codesandbox Plugin](https://www.danvega.dev/blog/2019/05/02/gridsome-codesandbox-plugin)
