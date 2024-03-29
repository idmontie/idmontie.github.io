---
title: Security
tags: [security]
---

This post was originally on a blog I started for creating web applications. This post goes into security for web applications.

## Prevent Against SQL Injection

Read about [SQL injection](http://en.wikipedia.org/wiki/SQL_injection) and learn how to prevent it for the langauge and database you are using.

## All User Input is Filtered

Never trust user input.  This includes cookies and hidden form field values.

## Read the Open Web Application Security Project

Read [the Open Web Application Security Project](https://www.owasp.org/index.php/Category:OWASP_Guide_Project).

## All Passwords are Hashed with a Salt

Hash all passwords using a [salt](http://security.stackexchange.com/q/21263/396) and all salts are different to prevent against [rainbow attacks](http://en.wikipedia.org/wiki/Rainbow_table).

The hashing algorithm should be bcrypt or scrypt for storing passwords.  Look into [How To Safely Sroe a Password](http://codahale.com/how-to-safely-store-a-password/).

Do **not** use MD5 or any SHA algorithm.  SHA algorithms are meant to be fast, which should not be used for trying to securely store passwords.

## Use a Standard Authentication System

Do not role your own authentication system.

## Process Credit Card Information Correctly

Look into the [PCI Security Standards](https://www.pcisecuritystandards.org/) for financial security information.

## Use HTTPS for Sensitive Data

Set up your [SSL](http://www.mozilla.org/projects/security/pki/nss/ssl/draft302.txt)/[HTTPS](http://en.wikipedia.org/wiki/Https) certs correctly and check it against [SSL Labs Server Test](https://www.ssllabs.com/ssltest/).

## Prevent Session Hijacking

Built in session systems are usually premade to handle these types of attacks. It is not recommended that you roll your own, but it should have the following features:

- Encrypted data traffic.  The session key in particular should be encrypted, but ideally all traffic should be encrypted by using SSL/TLS.
- Long random session key.  Attackers should not be able to guess valid session keys.
- Regenerating the session id after a successful login.  Prevents [session fixation](http://en.wikipedia.org/wiki/Session_fixation].
- Change the cookie value with each and every request.  This reduces the window for an attacker to hijack the session.

## Prevent Cross Site Scripting (XSS)

Unfiltered query parameters that are added to the DOM are an easy way for attackers to use cross site scripting to pull data from your users.  Filter all query parameters; see [Cross-site Scripting](http://en.wikipedia.org/wiki/Cross-site_scripting) for more information on common attacks and prevention methods.

## Prevent Page Embedding

You can prevent page embedding with the following header:

```
X-Frame-Options: DENY
```

This will cause browsers to refuse requests for framing in that page.

You can also prevent page embedding with JavaScript to prevent users from accessing your website in an iframe.  Look into this [StackOverflow solution](http://stackoverflow.com/questions/7776281/javascript-jquery-how-to-detect-if-a-page-is-embedded-by-others).

## Prevent Cross Site Request Forgeries

Cross site request forgeries are attacks by a malicious user whereby they craft a link to a site which a user is know to have been authenticated.  For example, say your site is a bank website; the malicious user may craft a URL for you site that when a user clicks on it, deposits money into the attacker's account.  The attacker then sends the link to users who may have been logged into your bank website.

According to [Wikipedia](http://en.wikipedia.org/wiki/Cross-site_request_forgery):

> At risk are web applications that perform actions based on input from trusted and authenticated users without requiring the user to authorize the specific action. A user who is authenticated by a cookie saved in the user's web browser could unknowingly send an HTTP request to a site that trusts the user and thereby causes an unwanted action.

## Prevent Click Jacking

Similar to [Page Embedding](#prevent-page-embedding), click jacking works by:

> A user might receive an email with a link to a video about a news item, but another valid page, say a product page on Amazon.com, can be "hidden" on top or underneath the "PLAY" button of the news video. The user tries to "play" the video but actually "buys" the product from Amazon.

Other known exploits include:

- Tricking users into enabling their webcam and microphone through Flash
- Tricking users into making their social networking profile information public
- Making users follow someone on Twitter[8]
- Sharing links on Facebook

See [Wikipedia](http://en.wikipedia.org/wiki/Clickjacking) for more information.

## Verify That Server Software is Up to Date

Make sure that the software on your system is up to date with the latest patches.

## Verify That Packages, Modules, Plugins, etc are Up to Date

Make sure that the latest software used by your projest is up to date with the latest patches.

## Verify That Your Database is Secured

Make sure that connections to the database are at least password protected.  Verify that only the least amount of permissions are being used.

Make sure that confidential information is encrypted or hashed.

## Attempt to Make Your App Run As Non-Root

Apply [the principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) and try to have your app run as non-root as often as possible.

## Use the Content-Security-Policy Header

Specify the following header to make the browser only run certain content depending on its origin:

**example**

```
Content-Security-Policy: script-src 'self' https://apis.google.com
```

You can also specify the following type of content:

- script-src (JavaScript)
- connect-src (XMLHttpRequest, WebSockets, and EventSource)
- font-src (Fonts)
- frame-src (Frame Urls)
- img-src (Images)
- media-src (Audio and Videos)
- object-src (Flash)
- style-src (CSS)

## Do Not Allow Mime Sniffing with User Uploaded Content

You can tell browsers to not try to guess Mime Types of files with the following header:

```
X-CONTENT-TYPE-OPTIONS: nosniff
```

For example, say a user uploads an HTML file. You intend to serve it to users as a text file, but the browser will attempt to serve it as an HTML page.  You can tell the browser that you know what you are doing and that the Mime Type you are providing is indeed correct by using the above header.

## Force HTTPS Traffic

You can force HTTPS Traffic with the following header:

```
Scrict-Transport-Security: max-age=31536000; includeSubDomains
```

This will force `https://website.com` even when typing in `http://website.com`
