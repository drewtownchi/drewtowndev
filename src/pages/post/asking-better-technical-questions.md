---
title: Asking Better Technical Questions
draft: false
author: Drew Town
excerpt: Providing the right context to help others help you
image: https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1589924090/asking-better-questions_2_yj9et8.jpg
date: 2020-05-19T13:19:32.195Z
tags:
  - Advice
  - Soft Skills
layout: "../../layouts/MarkdownLayout.astro"
---
After 12 years of working professionally in systems administration and development I have learned some helpful ways of asking technical or development questions that will get you better answers, faster.

When asking a question most of the time you are looking for an answer, unless you are waxing philosophically.  So, set yourself and the person you are posing the question up for success. Or, as the venerable Dr. Cox would say, "help me, help you.”

## Set The Tone

No matter who it is, if it is the first time today you are talking to this person, start with a greeting.  Simply starting your conversation with, "Hey Susan, how are you today?” Always keep in mind that this person will be taking time out of their day to help you with your problem. So, treat them with empathy, professional courtesy, and be friendly out of the gate.

Opening with your question or hitting them with a wall of text before saying hello is a surefire way to make sure this person won't be starting off on the right foot.

## Provide Context

Assume the person you are asking your question to has absolutely no context about what you are asking them about. This is by far the most common mistake I see when people are asking questions. 

When you are deep into a problem, you have built up a lot of mental models and context about the current situation.  So, when you ask "How do I fix this?" to a colleague they do not understand that you are working on a problem regarding slow network latency between the app server and the Redis server in the staging environment.

When you are posing your questions you must help the person you are asking of the question of quickly build up the necessary context to help you.

Being able to provide this information is a skill that must be practiced.  Before you hit send in your chat app look at your message and ask yourself, if someone sent me this message would I even know what they are talking about? Would I be able to solve this problem with the information I provided?

Save yourself time by thinking ahead to the information they will need to help you solve the problem.

## Don't Bury The Lede

So far we have discussed setting the tone and providing relevant context, but it is also important to not surround your question with useless details. Don't whine, or try to stir up sympathy by providing a long unnecessary story.

Your question should only include relevant details, necessary background and the actual question you are seeking an answer to. Don't make the person try to find your question in a wall of text or interpret your story as a question.

## Don't Propose Solutions, Tell Them What You Want To Do

When asking a question it is best not to propose a solution as a question.  When you propose a solution to your own question, you are limiting the scope of thought to your solution rather than allowing alternative solutions.

Instead of saying, “How can I cache my query in the database?” Ask, “I working on a slow query that is causing pages to load slow. How can I speed up my page?”  Maybe the solution is to better tune database caching. But the conversation might instead flow to storing full page caches in Varnish, or using a CDN, or questioning the query, or studying the indices in the database.

When you propose a solution as a specific question you limit the potential solutions.  Instead, ask your question as something you are trying to do.

## Show Your Homework

Always take the time to discuss potential solutions you have already tried.  When you do this, you eliminate potential solutions that you've already tried but haven't panned out. Also, you show the person you are asking that you've put a bit of time and effort into the issue.

You don't need to put an excessive amount of detail into this. But just showing that you tried a solution may eliminate potential solutions or help the other person better direct their thoughts.