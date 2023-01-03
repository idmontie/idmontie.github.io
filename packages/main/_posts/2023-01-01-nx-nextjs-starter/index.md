---
title: NX NextJS Starter
---

To kickstart the year, I created a repo that contains a simple starter kit for using NextJS with NX. You can see the repo here:

[Github](https://github.com/idmontie/nx-nextjs-starter)

This personal Github page is built using this starter kit. I wanted to create a starter kit that was simple and easy to use and also has a lot of eslint and Typescript configuration setup. I've also been working on revamping the website for Dark Emblem - my NFT side-project. The starter kit is based on the linting rules and Typescript set up that I've been using for that project.

## Nx

I've traditionally used Lerna for my monorepo projects, but now that Nx has taken over maintenance of Lerna, I decided to give Nx a try directly.

Nx has been enjoyable to use. Managing many different React projects with internal libraries has been very easy to set up, use and deploy.

## NextJS

My last few projects have been Single Page Apps (SPAs) or statically generated sites using Gatsby or Docusaurus. All three of those tools are great, but I wanted to try out NextJS for a few reasons:

* In my Dark Emblem project, I was having difficulty getting share links to Discord and Twitter to work properly. This was mainly caused by those sites not running JavaScript, so page links would just render the default SPA title and description. I knew that NextJS had a solution for this, so I wanted to try it out.
* I wanted more control of my documentation and blog websites, so I needed to be able to use custom server-side code.

## Starter Kit

Overall the starter kit is a pretty simple example. It just containers preconfigured Nx, husky, lint-staged, eslint, prettier, Typescript, and NextJS. It does not contain any UI components or anything like that. It's just a simple starter kit to get you up and running with a monorepo NextJS project.

Feel free to check it out at [Github](https://github.com/idmontie/nx-nextjs-starter).