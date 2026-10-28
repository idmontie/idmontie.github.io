---
title: From Wasted Time to Effective Code Reviews
tags: [programming, ai, architecture]

---

A monorepo has many advantages in the modern era of computing - a single engineer can make cross-domain and cross-platform changes in a single PR, LLMs and agents can access context of the entire stack in order to make code changes, and it is easier to determine the impact of a change to consumers.

But a downside to the monorepo is that the amount of Pull Requests can become unwieldy. The sheer number of engineers writing code, making Pull Requests, and asking for reviews a day is growing even faster now that a majority of code is being written with at least some help by AI agents.

<!--truncate-->

In order to help combat some of these issues, I have implemented a few tools and workflows that help PRs take less time to review, enable reviews to be more constructive and get feedback to engineers sooner.

## Fail Fast

Before any agent or human intervention is needed on a pull request, we should leverage the existing infrastructure to make sure that we fail fast on easy to identify issues. This typically happens in stages: at the local development level, when pushing that code to Github, and then leveraging the CI/CD infrastructure to check code for the Pull Request. Our overall goal is to make objectively wrong code fail before we bug a human to review it.

On local, that typically means using Husky for pre-commit and pre-push hooks to verify code formatting, linting, type-checking, and unit tests. Depending on the size of the repo, these commands often get optimized in some fashion to only apply to affected projects, or even just affected files.

When going to push that code to a remote repository, we also leverage husky. These checks typically take a bit longer depending on the size of the codebase. We might run checks that verify that generated code was built, that the bundles can build correctly, or that tests reach some code coverage statistics.

Together, these checks provide feedback to the engineer immediately about the code they wrote before they even create a pull request.

## Automate Reviews

Next we automate the review process as much as we can. There are many competing tools in the automated Pull Request review space right now. The one I am familiar with is CodeRabbit. With some prompt tweaking it can be highly effective at giving engineers fast feedback on their PRs.

We had CodeRabbit focus on the architectural approach and look for any security flaws or edge-cases that might have been missed. Comments or a PR block it from being merged in our set up, but it was up to the engineer whether CodeRabbit comments were valid or not. Sometimes the AI would hallucinate that an edge-case wasn’t covered, and the author of the PR would just close the comment opened by CodeRabbit.

Other times, the CodeRabbit comments would be helpful in identifying better approaches to some problems, or point out edge-cases that could throw an exception. These were often handled by engineers and fixed before pinging the rest of the team to review.

## Who should Review?

When working in a monorepo, it is easy to make cross-domain and cross-stack changes in a single PR. Github has announced Stacked PRs to help with this, but that is a fairly recent technology. We implemented CODEOWNERS that would automatically be assigned to a PR based on what files were touched. Infrastructure code was modified? We automatically tag the infrastructure group. Similarly, we had matching slack groups that could be mentioned so that guilds would be alerted if their review was requested on a Github PR.

This helped avoid PRs sitting around waiting for reviews, and also helped avoid the “Bystandard effect” where other team members would assume someone else was going to review the PR.

We also implemented a standard Pull Request Template that we expected everyone to always fill out. It would ask some pretty simple questions, but having them answered before reviewers spent time looking through the code was extremely helpful and time saving:

- What changed and why?
- What ticket is this associated with?
- Can you post a picture/video/console output of the change working?
- Are there any deployment/migration implications?
- Is there any known follow-up work or known limitations in the code?
- How was it tested?

## Building Towards Success

We often expected PRs to be intentionally small and incremental. Large migrations should be decomposed into reviewable PRs. As mentioned before, Github Stacked PRs seem to help mitigate this issue in larger repos. Smaller PRs help two-fold: 1. they are easier to look through for the reviewers, and 2. less code means reviewers often give MORE feedback. From my experience, the bigger the PR, the more likely reviewers are to skim it and just approve it, rather than fully understand the changeset.

We would often bring up the software delivery lifecycle in our guild meetings and retrospectives. These were great opportunities for engineers to express any frustration they had with the review process. These guild meetings would often result in action items that helped improve the SDLC, including some of the technology choices I mentioned above: adding CodeRabbit came out of a guild meeting, so did CODEOWNERS, and eventually a lot of AI prompting techniques and skills.

Focusing on how our systems would continusouly improve was an important part of the process, and as a team we were always open to hearing about any frustrations engineers had with the process.  At first, “what can be improved” was a lot of similar complaints:

- “It takes too long for someone to review my code” - we used CodeRabbit, and CODEOWNERS to improve this workflow.
- “The CI takes too long to fail” - we would continue to improve this by parallelizing some steps, and working on optimizing other steps.
- “PRs are too big” - we would reiterate that it is up to the engineer to figure the best way to split up a story into engineering tasks. We typically expected one PR per task, so we would expect engineering refinements to split up product work into pieces that were deliverable and reviewable.

Eventually we stopped hearing about these types of complaints, and the conversations started gearing towards:

- How can we make the CI even faster?
- Are there ways we can get the AI to stop using a certain pattern that we don’t agree with?
- Can we use a custom eslint rule to enforce certain naming conventions so that the infrastructure team doesn’t keep making the same comments on PRs?

## The Big Picture

The goal with Effective Code Reviews is a balancing act between getting feedback to engineers as quickly as possible, while still providing meaningful reviews, and not wasting engineers’ time solely reviewing code. We discussed how failing fast can help get instant feedback to the person requesting a review. We also saw how tools like CodeRabbit can help give meaningful reviews. And by leveraging these tools and standardizing the Pull Request process, we save the time for reviewers who are only brought in to review a PR that has already passed a majority of checks.

The age of AI has made it even easier to write code, but there are emerging technologies that are also making it easier to review that code as well. Balancing that throughput has always been a problem at companies since time is limited. And continuously inspecting where bottlenecks and frustrations are is an important part of improving the Software Delivery Lifecycle.