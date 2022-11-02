---
title: Display External User Avatars Using Strapi's Custom Routes as a Proxy
draft: false
author: Drew Town
excerpt: Creating custom routes outside of Strapi's content-types for accessing
  external APIs
image: https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1588947285/drewtown.dev/DisplayExternalUserAvatarsUsingStrapisCustomRoutesAsAProxy.jpg
date: 2020-05-11T13:56:22.196Z
tags:
  - Strapi
  - Node
layout: "../../layouts/MarkdownLayout.astro"
---
When using Strapi you may run across a scenario where you need to return data not stored in Strapi's database. Suppose you need to fetch a social media user avatar, a stock quote, or other data available from a third party API. We will use Strapi as a proxy to request the data and return the information to the client app, avoiding any potential CORS problems.

> While we will be using a user avatar as an example, the implementation presented in this article will also be application to any data that needs to be requested via a third-party API.

When registering a user on another one of my sites, picke.rs, I wanted to give the user an option to use an avatar they had registered with another service as their picke.rs avatar without requiring the user to find and upload an image from their device. We can use their email address and the [unavatar](https://unavatar.now.sh/) service to try and locate a social image for the user.

![Registration form showing email address returns a user avatar for the user to optionally use](https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1588947314/drewtown.dev/RegistrationFormWithAvatarShown.png)

## Why Custom?

You may have noticed the Strapi guide about [fetching external data](https://strapi.io/documentation/3.0.0-beta.x/guides/external-data.html). If your data does not need to be real-time or stored in Strapi's database, that will be a better route to follow.

In this example we want the results to be real-time and requested only when necessary. Therefore, we have no need of a model to store the data in the database and we can simplify the structure presented in Strapi guide.

## Creating The Route

Create the file `api/avatar/config/routes.json` in your Strapi project. You will need to create the `avatar` and `config` folders within the `api` folder.

```javascript
{
    "routes": [
      {
        "method": "GET",
        "path": "/avatars/:id",
        "handler": "avatar.find",
        "config": {
          "policies": []
        }
      }
    ]
}
```

This route defines the HTTP method, the path, and which method will handle the request.

The path has a dynamic `id` defined which will be passed to the handling method via the `ctx`.  We'll use the `id` set via the url submitted by the user in order to query the API.

## Handle The Request

Create the file `api/avatar/controllers/avatar.js` in your Strapi project.  This is where we will create the `find` method.

```javascript
const axios = require("axios");

module.exports = {
  /**
   * Retrieve a user avatar.
   *
   * @return {String}
   */

  async find(ctx) {
    if (ctx.params.id.length < 4 || !ctx.params.id.includes("@") || !ctx.params.id.includes(".")) {
      return ctx.badRequest("Invalid email address");
    }

    const { data } = await axios.get(`https://unavatar.now.sh/${ctx.params.id}?json`);
    if (data.url.includes("fallback")) {
      return ctx.send({ url: null });
    }

    return ctx.send(data);
  },
};
```

In this method we provide some very basic validation to return early if the requested email address does not appear it could be an email address.

Next, we use Axios (you can use any method or library of your choice to make the API request) to make a request to [unavatar](https://unavatar.now.sh/) which is a handy little service to query for avatars across multiple social media networks.

For this case, if unavatar cannot find a social media avatar for the supplied email address, we return null instead of the fallback image.  If you'd prefer to use the unavatar provided fallback, then return the returned data without the fallback check.

The `ctx` parameter is injected by Strapi and it is what contains information about the request such as the route ID we defined in the `routes.json` file

## Updating The Roles & Permissions

When the route and method have been created and the Strapi server is restarted Strapi will add the new `find` method to the available permissions in the admin's Roles & Permissions section.  We'll want to enable this for all the necessary available roles.  If only unauthenticated users will call this method, then only enable it for `public` if other roles will call this method then enable it for those roles as well.

![](https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1588951576/drewtown.dev/AvatarPermissionEnabled.png)

## Calling From The Client

Now in our client we can call the route `/avatars/me@example.com` in a Vue application the method would look something similar to the following.

```javascript
methods: {    
    async downloadAvatar () {
      if (this.login.length < 4) {
        this.avatarLink = null
        this.useAvatar = false
        return
      }
      const { data } = await this.$axios.get(`/avatars/${this.login}`)
      this.avatarLink = data.url
      if (data.url !== null) {
        this.useAvatar = true
      }
    }
}
```