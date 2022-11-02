---
title: Uploading Images and Files to Keystone.js via the GraphQL API
draft: false
author: Drew Town
excerpt: Using multipart/form-data and fetch to upload images to Keystone.js
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1582827425/drewtown.dev/UploadingAnImageToKeystonejsViaTheGraphQLAPI.jpg
date: 2020-02-27T18:14:32.496Z
tags:
  - KeystoneJS
  - Node
  - GraphQL
layout: "../../layouts/MarkdownLayout.astro"
---
I’ve been working on a new project that uses [Keystone.js](https://www.keystonejs.com/) as the server. One requirement for this project is to upload images to Keystone via a Node.js service that performs a task.

There are potentially some clients like [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client) that may work to upload files but I found a fetch POST request was the simplest way to upload a file to a GraphQL API when working in a Node.js environment. Most of the documentation I could find was for frontend applications and React.  After some time struggling this is the solution I came up with for uploading a file to a Keystone.js GraphQL API.

## Requirements

```javascript
npm install form-data cross-fetch
```

## The Code

```javascript
import * as FormData from "form-data"
import fetch from "cross-fetch"

const CREATE_PICK_MUTATION = `
mutation CreatePick ($data: PickCreateInput!) { // Name of the Operation and data type from schema
    createPick(data: $data) {
      id // What is returned after a successful mutation
    }
}
`

function createPick(name, stream) {
  const body = new FormData()

  body.append(
    "operations",
    JSON.stringify({
      operationName: "CreatePick", // The name of the operation from the mutation above
      query: CREATE_PICK_MUTATION, // Const from above
      variables: {
        data: {
          name,
          image: null // Is always null
        }
      }
    })
  )

  body.append("map", JSON.stringify({ 1: ["variables.data.image"] }))
  body.append("1", stream as Blob)

  return fetch($process.env.apiUrl, { // Use your API endpoint /admin/api
    method: "POST",
    body: body
  })
}
```

I used the requests from the Admin API to work backwards into how to shape the request.  You will need to adjust the data on the `createPick` function to include all required data for your new entry and then include that data in the `variables.data` object as well.
