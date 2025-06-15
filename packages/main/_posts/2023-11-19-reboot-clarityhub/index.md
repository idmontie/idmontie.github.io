---
title: "Looking back on Clarity Hub"
tags: ["clarityhub", "startups"]
---

In my projects list on this blog is a set of projects related to Clarity Hub. This was a startup I did with a group of friends where we aimed to create software to enable software product teams to gather customer feedback, and then action on it.

I've been thinking about rebooting Clarity Hub for some time. When I was devoting my time to the Clarity Hub startup, the offering was split into two parts: 1. Interviewing software for product teams, and 2. an AI and NLP set of APIs for inference and predictions.

We ended up open sourcing as much of our Clarity Hub code as we could: [Clarity Hub on Github](https://github.com/Clarityhub). This included all of our original code pivots as well. While interviewing with a few startups, a couple asked me for details on Clarity Hub and how we approached the problem domain, architectural decisions, and software design. All these notes ended up as part of the README: [Architecture notes on Github](https://github.com/clarityhub/clarityhub-server-core).

Looking at all these diagrams, seeing all the incredible work I did with my small team on Clarity Hub, I can see that a lot has changed since we tackled this problem.

The first major change is that Notion has become a common name in note-taking. I consider myself an early adopter of Notion and have referred many friends over to it. Clarity Hub as a Notion for Product Teams seems very useless now, especially with the second change in consideration.

The second major change being how far AI and NLP came within just a few years. Focusing on this as our differentiator is now irrelevant. Notion has released their API, new AI tools, and a plethora of other features. And while Notion doesn't provide an easy way to record, video call, automatically transcribe meetings, and pull topics from conversations, this seems pretty trivial to add as a Notion extension. I think Dovetail will be in the same boat. As OpenAI continues to provide more powerful models, and makes them easy to use, well-positioned apps like Notion will be able to continue to get better.

But not is all lost, part of failing as a start-up is at least learning a lot.

## Microservices, but not really

Looking back on our startup adventure, one thing I'd recommend for a new business just trying to start out is to think about microservices, but not fully committing to the complexity of microservices. We approached this by making the entire application in Serverless, using lambdas for each main endpoint that was needed as lambdas to handle asynchronous services. This let us share code, but move quickly.

## Billing

Billing is one of those items that can easily become a time-sink – and it did. Looking back, I feel like we wasted so much time, effort, and thought on billing. If I had to do Clarity Hub over again, I'd ignore billing for just Free Trial and Contact Sales for custom billing.

Without customers, there's no point in building a billing system, especially when you don't know what type of customers you will have.

We definitely learned a lot about Stripe and how to build in eventing into our systems to help support billing cycles, upgrading, and more.

We also spent very little time looking into alternative billing providers, since we were part of Stripe Atlas. One that has always interested me was Lago, since it is available as Open Source and a hosted solution.

## Conflict-free replicated data types

We originally used Slate for our editor, and as is usual in programming, they went through a major version bump right after we finished our original implementation. I wish we had investigated Conflict-free replicated data types for this more and built-in real-time multi-user editing for notes early in the development stage.

Implementing a basic solution for this would have been well worth it from a learning perspective, and from a code-reusability perspective. As is, a lot of the editor code is obsolete and tightly coupled with the specific version of slate that we used.

## Conclusion

If I could do Clarity Hub all over again, I would. It was a great learning and growing experience for me, and I've often looked back on what we did and thought about rebooting Clarity Hub. But when I look around the current technology landscape, I think the scope of the product and its main differentiators would have to change dramatically.
