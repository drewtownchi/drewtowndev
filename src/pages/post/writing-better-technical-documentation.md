---
title: Writing Better Technical Documentation
draft: false
author: Drew Town
excerpt: Learn to write better documentation through board game rules
image: >-
  https://res.cloudinary.com/recipecache/image/upload/c_scale,f_auto,q_auto,w_800/v1576426419/drewtown.dev/WritingBetterTechnicalDocumentation.jpg
date: 2019-12-15T14:01:30.670Z
tags:
  - Programming
  - Documentation
  - Beginner
layout: "../../layouts/MarkdownLayout.astro"
---
Writing technical documentation for a project is a task that everyone agrees is a good idea but often is skipped over for more exciting work. Or, if it gets completed, it is often of poor quality and rarely gets updated.  There is a way to fix these problems though; write clear, concise documentation that removes all the prose and gets to the point in clear and defined language.

Oddly enough, some of the best technical documentation I’ve run across comes from board game rulebooks.  Let’s take some time to look at how [Ticket To Ride](https://ncdn0.daysofwonder.com/tickettoride/en/img/tt_rules_2015_en.pdf) lays out an entire set of rules in 4 pages of text.

## Purpose and Objective

A common part of technical writing I see that is often missing is the overall aim and purpose of the document.  A blurb or paragraph that defines what the document is attempting to accomplish is critical in preserving the context in which the author wrote the document. 

The purpose or objective is your introduction to the user and setting up the context so they know what they will read about.  Depending on the context of the document, this may be the reasoning behind a policy or a quick introduction to the topic. 

> The object of the game is to score the highest number of total points. Points can be scored by:[…]

For a game rule book, the objective will guide the users and set up the context for all the other rules.  Without providing an objective the other rules may lack clarity of meaning if the reader doesn’t know what they are working towards.

For a technical document, let’s look at GitLab’s [password policy](https://about.gitlab.com/handbook/security/#gitlab-password-policy-guidelines). We can see what the authors were trying to accomplish when they laid out this document: Secure passwords that follow defined recommendations.

> Passwords are one of the primary mechanisms that protect GitLab information systems and other resources from unauthorized use. Constructing secure passwords and ensuring proper password management is essential. GitLab's password guidelines are based, in part, on the recommendations by [NIST 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html). To learn what makes a password truly secure, read this [article](https://medium.com/peerio/how-to-build-a-billion-dollar-password-3d92568d9277) or watch this [conference presentation](https://www.youtube.com/watch?v=vudZnjp5Uq0&t=19183) on password strength.

Not every document will need such a verbose purpose statement.  Adjust the introduction to your article to define the required background for the document and prepare your users and your future self with the necessary context to know why the document was written how it was.

## Defining language

One of the most important parts of writing a technical doc is to use clear, unambiguous language that cannot leave the reader wondering about the meaning.  Defined in 1997, [RFC2119](https://tools.ietf.org/html/rfc2119) has been used to provide clear, purposeful language for IETF documents and we can use the same concepts for other types of writing.
Words such as **must**, **should**, and **may** as outlined in the RFC leave no room for interpretation.

> On his turn, a player **must** perform one (and only one) of the following three actions.

Each player must take a turn when it is their turn.   There is no ambiguity. The rule leaves no room for questioning.  

> The player draws 3 Destination Tickets from the top of the deck. He **must** keep at least one of them, but he **may** keep two or all three if he chooses.

Again, the rule is explicit.  Any player of this game will know what they **must** do and what they **may** do based on these rules.

> When the deck is exhausted, the discards are reshuffled into a new draw pile deck. The cards **should** be shuffled thoroughly, since all the cards have been discarded in sets.

Finally, the word **should** can provide recommendations.  There is no requirement to do it, but you will want to.

We should apply similar patterns to all technical documentation.  Must, may and should and their opposites must not, may not and should not are the best way I’ve found to convey clarity, intent and purpose from me the writer to you the reader of my technical documentation.

## Keep It Short

I haven’t met many people who love to write technical documentation and even less that enjoy reading it.  Keep the prose to a minimum and focus on providing important information in as compact a format as possible.

Writing long paragraphs or providing extraneous information will derail the readers. If you even get the thing written…

## Organize The Document

Hierarchical organization of documentation, like HTML, provides a natural outline for writers and readers. Headers, sub-headers, and sections make it easier for readers to find relevant information.

Don’t make your users read huge walls of text to find the information they need. Lay out the document into clear, logical sections that are easy to scan and read.

## Read Good Documentation

As I mentioned in introducing this article, board games are often great examples of technical writing.  So grab your favorite board game, take out the rule back and study.

Alternatively, there is no shame in stealing the format or techniques of another project’s documentation either.  [Vue.js](https://vuejs.org/v2/guide/index.html) and [Redis](https://redis.io/documentation) are both respected for their documentation but have different styles and tones.  Choose a project where you like the documentation and use that as a guide for writing your own documentation.

## Use a Writing Aid

If writing isn’t your strong suit, or even if it is, a writing tool can easily improve the overall clarity, structure and grammar of your documentation.

My favorite tool is [ProWritingAid](https://prowritingaid.com/en/Account/Register2?twafid=1340117) (referral link) for writing help.  Other free tools exist as well, such as [Hemingway Editor](https://hemingwayapp.com/), [Grammarly](https://grammarly.com), [Grammar Lookup](https://www.grammarlookup.com/) and [LanguageTool](https://languagetool.org/) just to name a few.

## Get feedback

It is extremely difficult to write documentation in a vacuum.  We should consult users of different levels and abilities who are using the documentation to understand their clarity and understanding of our writing.  

Often I will write documentation that is clear to me but skips steps or makes assumptions that would not be clear to a person coming into a project cold.  Finding someone who does not have all the built-up context around what you are writing about is crucial to make sure your document is understandable by everyone.
