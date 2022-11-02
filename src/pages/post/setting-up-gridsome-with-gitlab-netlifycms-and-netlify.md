---
title: 'Setting up Gridsome with GitLab, NetlifyCMS and Netlify'
draft: false
author: Drew Town
excerpt: The steps to get a static git-based blog up and running
date: 2019-05-04T13:17:50.952Z
tags:
  - Gridsome
  - Vue
  - NetlifyCMS
  - Netlify
  - Tutorial
layout: "../../layouts/MarkdownLayout.astro"
---
There is really no better set of tools to get up a blog up and running that is fast, free and still provides a great development experience.  Here is a [link](https://drewtownchi-cat-blog-example.netlify.com/) to a demo of what we will be creating

If you are unaware of [Gridsome](https://www.gridsome.org) it is the new to the scene static site generator akin to Gatsby that utilizes Vue.js instead of React.

[NetlifyCMS](https://www.netlifycms.org) is a CMS created by the team over at Netlify.  The CMS is relatively low-featured compared to offerings such as Wordpress. But, the shining star of the CMS is that it allows non-technical users to create markdown files in a git repository.  Committing markdown files to a Git repository allows your build system to receive notifications about changes to the repository and trigger a new static site build.  All without non-technical users ever having to know what Git is.

We'll be walking through how to get these 2 frameworks and 2 services to work together to create, fast, reliable, static blogs.

# Prerequisites

## Git

A working Git CLI is required and a UI will make everything much easier.  For Windows, install [Git For Windows](https://gitforwindows.org/) and your preferred Git UI.

## Node.js

Node and npm are required and while the documentation does not specify it is probably a good idea to install the [latest available](https://nodejs.org/en/download/) LTS version.

## Install the Gridsome CLI

```bash
// npm
npm i -g @gridsome/cli

//yarn
yarn global add @gridsome/cli
```

## Netlify and GitLab account

If you don't already have a Netlify and GitLab account you will need to be signed up for those services.

# Setup a GitLab repository

This demonstration is based around GitLab but in general, the same steps will apply to other providers and should work with just a few configuration tweaks.

You will need to note the **username** and **project slug** in this case drewtown_chi/cat-blog

## Create an application to allow the Netlify CMS to authenticate to your GitLab project

When logged into GitLab open your user settings by clicking your avatar in the top right and then hit **Settings**.  Find **Applications** on the left-hand side.

Provide a name, a redirect URL `http://localhost:8080/admin/` and grant **api** scope. Finally, click save and note the application ID for later.

# Create the Gridsome project and push to Git

Once Node, npm, and the Gridsome CLI are all installed navigate to the directory where your new project will live and run Gridsome's create command.

```bash
grisome create catblog
```

After a few seconds, once the command has finished, navigate into the directory and run the following commands. 

> If you haven't already setup GitLab SSL keys you may need to visit [this page](https://gitlab.com/profile/keys) and follow the documentation for generating keys. This post does not go into details about how to configure your GitLab account for access via SSH

```bash
git init
git remote add origin git@gitlab.com:[Your username]/[Your project slug].git
git add .
git commit -m "Initial commit"
git push -u origin master
```

If you would like to start running the site locally run `gridsome develop` from the project folder and then browse to `http://localhost:8080` in your browser

# Setting up Netlify to pull from the repository

At this point, we have a working Gridsome setup that is pushed to the GitLab repository.

Login to Netlify and navigate to the **Sites** section of the dashboard where you can click on the **New site from Git** button.

From here choose GitLab from the **Continuous Deployment** section and then select the appropriate repository, in this case, "drewtown_chi/cat-blog".

Now we need to enter our build command **gridsome build** and our Publish directory **dist.** Finally, hit **Deploy site**

![Netlify Setup GitLab commands](https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1556978791/drewtown.dev/NetlifySetupGitlab.png)

# Adding Netlify CMS to the Gridsome Project

Install the Netlify CMS and the required Gridsome plugins to your project

```bash
npm add netlify-cms gridsome-plugin-netlify-cms @gridsome/source-filesystem @gridsome/transformer-remark
```

Adjusting gridsome.config.js is next

```js
module.exports = {
  siteName: "Cat Blog",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "post/**/*.md",
        typeName: "Post"
      }
    },
    {
      use: "gridsome-plugin-netlify-cms",
      options: {
        publicPath: "/admin",        enableIdentityWidget: false, // necessary if using implicit auth
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"]
    }
  },
};
```

Now that Gridsome knows about Netlify CMS via the plugins we need to add the CMS to the project.

Create an `admin` directory within the `src` folder.

Add the following files to the admin directory: `index.html`, `index.js` and `config.yml`.

## index.html Contents

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netlify CMS</title>
</head>
<body>
  <script src="index.js" type="module"></script>
</body>
</html>
```

## index.js Contents

```js
import CMS from "netlify-cms";
```

## config.yml Contents

```yaml
backend:
  name: gitlab
  repo: [Your username]/[Your project slug]
  auth_type: implicit
  app_id: [App ID from your GitLab repository setup]

media_folder: "static/uploads"
public_folder: "/uploads"

collections:
  - name: "post"
    label: "Post"
    folder: "post"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
```

After restarting the Gridsome development environment you should be able to browse to `http://localhost:8080/admin` and authenticate via GitLab.  Try creating a few test posts that we can use to loop through on the home page.

# Querying and showing the blog posts

Gridsome uses GraphQL to query data from the back-end.  In order to show the data we need to setup a `<page-query>` on our `Index.vue` to query the posts we create from the CMS and iterate through them. You can read more about querying data [here](https://gridsome.org/docs/querying-data).

The following is a basic example of querying all of the posts and using a `v-for` to loop through the posts to show their title and body contents.

```html
<template>
  <Layout>
     
    <h1>Cat Blog!</h1>
   
    <div v-for="post in $page.posts.edges" :key="post.node.id" class="content">
      <h2>{{post.node.title}}</h2>
      <p v-html="post.node.content">
      </p>
    </div>

  </Layout>
</template>

<page-query>
query Posts {
  posts: allPost {
    edges {
      node {
        id
        title
        content
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>
```

# Wrapping up

We've got a basic working blog and now it is up to you to style your pages, add [additional fields](https://www.netlifycms.org/docs/widgets/#default-widgets) and create [templates](https://gridsome.org/docs/templates) to show individual posts.

You can view the full [repository for this post](https://gitlab.com/drewtown_chi/cat-blog). Next check out how to [add tags to a Gridsome project with a NetlifyCMS](/post/adding-tags-to-a-gridsome-project-with-netlifycms).
