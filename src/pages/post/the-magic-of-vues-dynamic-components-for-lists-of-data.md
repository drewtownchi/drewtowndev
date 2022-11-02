---
title: The Magic of Vue's Dynamic Components For Lists of Data
draft: false
author: Drew Town
excerpt: How to use dynamic components to create lists with rich content
date: 2019-06-29T14:10:25.896Z
tags:
  - Vue
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
If you enjoy this post please consider following me on [Twitter](https://twitter.com/drewtown_chi). 🐤 Thanks!

Vue's Dynamic components are one of the most underutilized superpowers of Vue.  They allow developers to reduce presentation logic and verbosity by specifying child components to load at runtime via variables or computed properties.

```html
<component :is="activeTabComponent" />
```

The oft given example is a [tabs component](https://jsfiddle.net/chrisvfritz/Lp20op9o/) which dynamically brings in the correct child component based on the selected active tab.  This is a wonderful usage of the pattern but I would like to take a look at something a bit different.

I want to explorer when you have an object that contains a variety of items and data types.  With these items you want to show them in a lists showing well formatted output that could be a date, an array of items, really long text, or even just a name.

Let's take a look of the object and see what kind of data we are working with.

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  birthdate: "1986-06-22T00:00:00Z",
  anniversary: "2005-10-09T00:00:00Z",
  activities: ["Skiing", "Hiking", "Cycling", "Drinking Beer"],
  about: "John talking about himself. It goes on and on forever...[snip]",
  metadata: {
    lastUpdateUTC: "2019-06-29T15:14:00Z",
    lastUpdatedBy: "admin"
  }
}
```

This is just a small example but you can imagine a scenario with 20, 30, or even 40 fields with 5-10 different types of data.

## Using HTML Templates

You could put everything you need into the HTML template. It's simple, it works.

```html
<li><span class="item-title">Birthday</span> {{formatDate(person.birthday)}}</li>
```

There are a few downsides to this though.  

First, if your data set is very large and if your presentation elements are complicated enough you can end up with a ton of HTML while working through your data set. We have the power of Vue but we are effectively using it like a dumb templating language. Having a ton of HTML can make the component really hard to grok and even harder to update.  Changing a class name becomes an exercise in find and replace and changing the actual HTML structure is the stuff nightmares are made of. 

Second, you now must have formatting logic in your HTML template.  Sprinkling around `formatDate` methods, possibly with parameters attached is not good practice. 

For the about field we may want to hide text over a certain length behind a 'Show More/Less' toggle.  That involves handling state in this component that is better handled by a child component. 

Maybe we should be moving all of this logic to child components for these items. 🤔

## Moving all of the logic to child components

Now that we've established that our object's children contains logic that is complicated enough that it may need its own state, formatting, or external libraries we are going to move all of that logic to child components such as `details-date`, `details-text` or `details-list`.

```html
<li><span class="item-title">Birthday</span> <details-text :value="person.firstName + ' ' + person.lastName" /></li>
<li><span class="item-title">Birthday</span> <details-date :value="person.birthday" /></li>
<li><span class="item-title">About</span> <details-text-expander :value="person.about" /></li>
<li><span class="item-title">Activities</span> <details-list :value="person.activities" /></li>
```

This is better! At least now we don't have details about each items formatting and display properties leaking into the parent.  The parent shouldn't care how the date is implemented or whether that really long text field is expanded or not.  Those are the responsibilities of the child and should be encapsulated away.

We can do better though.  There is still the problem of repeating the HTML.

## Bringing in a dynamic component

Let's shape our data into a slightly new format

```js
  // Make sure you import and register all of the components you specify here
  computed: {
    items() {
      return [
          { name: "Name", value: `${this.person.firstName} ${this.person.lastName}`, component: "DetailsText" },
          { name: "Birthday", value: this.person.birthday, component: "DetailsDate" },
          { name: "About", value: this.person.about, component: "DetailsTextExpander" },
          { name: "Activities", value: this.person.activities, component: "DetailsList" },
      ];
    }
  }
```

Our computed property is going to return us an array of objects.  Each object will give the name, the value to be passed to the child component and which child component to use.

Our complete HTML now looks like the following regardless of how many items are in our list.

```html
<li v-for="item in items" :key="item.name">
  <span class="item-title">{{item.name}}</span>
  <component :is="item.component" :value="item.value" />
</li>
```

We loop through everything in our items array, set the title, and create the dynamic child component using the component specified in the object and passing in the value specified as well.  It is compact, makes updating the presentation trivial and allows you to keep all of the details about what is going to be displayed in a single computed property that is easy to understand.
