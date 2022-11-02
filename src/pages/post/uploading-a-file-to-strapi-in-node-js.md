---
title: Uploading A File To Strapi In Node.js
draft: false
author: Drew Town
excerpt: Using the Needle library to upload a file to Strapi via the REST API
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1584556263/drewtown.dev/uploading-a-file-to-strapi-in-nodejs.jpg
date: 2020-03-18T18:26:12.448Z
tags:
  - Strapi
  - Node
layout: "../../layouts/MarkdownLayout.astro"
---
The [Needle](https://github.com/tomas/needle) Node.js library bills itself as a “Nimble, streamable HTTP client for Node.js. With proxy, iconv, cookie, deflate & multipart support.” The multipart support really had me interested, as dealing with file uploads in Node can be relatively challenging for what should be a simple operation.

By specifying `multipart: true` on our POST request, we are letting Needle know we should send multipart/form-data to the server which is required for file uploads. Needle will then convert our JSON object into form-data.

[Strapi](https://strapi.io) expects files to be uploaded using the files attribute. If the field name on the item is image, then the upload should contain a `files.image` property that contains the file and content_type.

```javascript
export async function createProduct(name, imagePath, authToken) {
    const data = {
      data: JSON.stringify({
        name,
        /* Your other properties on this type */
      }),
      "files.image": {
        file: imagePath,
        content_type: "image/jpeg"
      }
    }
 
    await needle("post", "http://localhost:1337/products", data, { 
        multipart: true, 
        headers: { 
            authorization: `Bearer ${authToken}` 
        } 
    })
  }
```

By just letting Needle know the path the image it does all the heavy lifting in turning the image into the appropriate data type. You do not have to worry about converting the image into a stream or creating the correct form-data, Needle will take care of all of that.
