---
title: SEO
tags: [seo]
---

This post was originally on a blog I started for creating web applications. This post goes into SEO considerations for web applications.

## Use Search Engine Friendly URLs

Use [semantic URLs](http://en.wikipedia.org/wiki/Semantic_URL).  Semantic URLs help improve usability and accessibility of a website.  The following table from the Wikipedia entry illistrates how to use semantic URLs:

| Non-semantic URL                                                | Semantic URL                              |
|-----------------------------------------------------------------|-------------------------------------------|
| `http://example.com/index.php?page=name`                          | `http://example.com/name`                   |
| `http://example.com/index.php?page=consulting/marketing`          | `http://example.com/consulting/marketing`   |
| `http://example.com/products?category=2&pid=25`                   | `http://example.com/products/2/25`          |
| `http://example.com/cgi-bin/feed.cgi?feed=news&frm=rss`           | `http://example.com/news.rss`               |
| `http://example.com/services/index.jsp?category=legal&id=patents` | `http://example.com/services/legal/patents` |
| `http://example.com/kb/index.php?cat=8&id=41`                     | `http://example.com/kb/8/41`                |
| `http://example.com/index.php?mod=profiles&id=193`                | `http://example.com/profiles/193`           |

## Use Hashbangs for Dynamic Content When You Normally Use Hashes

If you normally use the hash `#` character for dynamic content, change it to the hashbang `#!`.  This allows googlebot to use `#_REQUEST["_escaped_fragment_"]` instead of `#!`.

## Use Push State If You Can

If the user is using Firefox or Chromium, you can use `history.pushState( object, pageName, "./?param=1");` so that the address bar changes, but the page does not reload.  This allows you to use `?` instead of `#!` to keep dynamic content.

## Use Descriptive Links

When creating links, refrain from using "this" or "click here" or similar phrases for your links.  Link descriptions should be descriptive.

## Have an XML Sitemap

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling.

Have a [sitemap](http://www.sitemaps.org/) at `/sitemap.xml` for search engines to crawl.

Have a [image sitemap](https://support.google.com/webmasters/answer/178636) for your images!

Create a [mobile sitemap](https://support.google.com/webmasters/topic/2370586?rd=1)!

## Use Canonical URLs For Duplicate Content

Use `<link rel="canonical" ... />` when you have duplicate content on multiple pages. Remember, multiple URLs that point to the same content coint as dusplicate content. Also remember that `?page=1&subject=my-subject` and `?subject=my-subject&page=1` are different pages to web crawlers!

## Setup Webmaster Tools

Use [Google Webmaster Tools](http://www.google.com/webmasters/) and [Bing Webmaster Tools](http://www.bing.com/toolbox/webmaster).

## Setup Google Analytics

Have [Google Analytics](http://www.google.com/analytics/) set up.  Or something like [Piwik](http://piwik.org/).

## Have robots.txt Configured Properly

Set your [robots.txt](http://en.wikipedia.org/wiki/Robots_exclusion_standard) file properly.  Each subdomain must have its own robots.txt file.

## 301 Redirect for WWW Requests

`www.example.com` or `example.com` should be your primary domain, not both. Have one 301 Redirect (Moved Permanently) to the other.

## Read the Search Engine Optimization Starter Guide

The [starter guide is viewable here](http://static.googleusercontent.com/external_content/untrusted_dlcp/www.google.com/en/us/webmasters/docs/search-engine-optimization-starter-guide.pdf).

### The Basics

- Create unique, accurate page titles. These titles are displayed in the search results. Titles reflect what is on each individual page.
- Use the description meta tag. Google will use them as snippets for your pages.
- Use simple to understand (ie "friendly") URLs.  URLs should contain relevant words. `http://mysite.com/article/basket-ball-scores` is a friendly URL.
- Navigation is very important for search engines.  Think of you website as folders that should be easy to navigate.  Use breadcrumbs!
- Use [sitemaps](#have-an-xml-sitemap)!  Prepare one for users and one for search engines.
- Use 404s when necessary.

### Improving Site Structure

- Create a naturally flowing hierarchy.
- Avoid having all navigation based entirely on dropdown menus.  Your website should be accessible, pages should be conntected with normal text links.

### Optimizing Content

- Create compelling and useful content.
- Offer unique and exclusive content.
- Checkout the [Keyword Planner](https://adwords.google.com/KeywordPlanner) by Google AdWords.
- Write easy-to-read text.  Don't embed text in images
- Create fresh content.
- Create content for users, not for search engines.
- Write good anchor text: `<a href="...">Top Ten Basketball Shots</a>` is a descriptive link.
- Use `alt` tags on your images! This also helps with accessibility.
- Use descriptive filenames for your images and assets!
- Supply an [image sitemap file](https://support.google.com/webmasters/answer/178636)!
- Use heading tags correctly!  `<h1>` is the most important. `<h6>` is the least important.

### Dealing with Crawlers

- Restrict crawling with robots.txt.
- Use `rel="nofollow"` when necessary for links. Normally, user generated links through comment systems should be tagged with nofollow.

### SEO for Mobile Phones

- Configure mobiles sites so that they can be indexed accurately.
- Create a [mobile sitemap](https://support.google.com/webmasters/topic/2370586?rd=1)!
- If you use User-agents to generate your mobile site, make sure to allow `Googlebot-Mobile`!
- If you use a seperate domain for your mobile app, redirect them to the correct page!

### Promotions and Analysis

- Backlinks increase the value of your site ( backlinks are links that other people post to your site).
- Know how to utilize your social media sites.
- Utilize the Google Webmaster Tools.
