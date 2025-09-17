---
title: Reviewing Your Frontend Applications
tags: [frontend, onboarding, documentation]
---

Below are some notes I’ve taken from setting up new code repositories and onboarding new team members. Hopefully they can help improve your current documentation and notes to make onboarding a smooth process.

## Onboarding

When new members start, do you have processes and documentation in place to make onboarding easy?

☐ Is your process written down?

☐ Add a note for people onboarding continue to improve it when they walk through it. Every time a new members onboards, they should follow the documentation and update it with any missing steps or new errors and resolutions if they come across them.

## Environment Setup

Part of onboarding is getting your environment set up. Usually, a team will have a preferred IDE and environment set up so that it is easy to help each other if there are any problems.

☐ Is the preferred IDE documented?

☐ Are preferred 3rd party plugins that developers install listed and documented somewhere?

☐ If there is a VPN, are all the VPN details documented?

☐ Is the preferred Git usage documented? IE git-flow etc?

## README

Each repository should have a main README that acts as a starting point for people new to the project to read. This should be useful to people who have been at the company for years, all the way to someone new who has just received their laptop:

☐ Does the README have all the steps to:

1. Download
2. Install
3. Run
4. Deploy
5. Test

☐ Architecture - Is the architecture documented? This doesn’t need to be all documented within the README, but the README should at least link out to external documentation that covers:

1. Clients, servers, databases, 3rd party systems are documented
2. Data flows between systems are documented

☐  API Documentation - How is the API documented? This is similar to the architecture section.

1. If your repo has components, is there a Storybook or similar site to document the interfaces?
2. If your repo has web APIs, is there a OpenAPI spec that can be viewed?
3. Other projects will want to document their APIs as well.

☐ Design System - Similar to the API documentation, if there is a design system that is used or implemented, does your README call that out?

1. Documentation - do you have a link to how to get to the documentation?
2. Storybooks - is there already a live storybook link somewhere? Does your README document how to run the storybook as well?

### Building and CI/CD

If your project is buildable or deployable, do you have documentation on the Build Pipeline and the CI/CD PIipelines? These are important to simplify and document. Someone new to the project should be able to follow the README in the repo to build the application and understand what happens when they push a commit to the repository.

☐  Build Pipeline

1. Can the app be built in one step?
2. Is the pipeline modern?

☐  CI/CD

1. Is there a CI/CD runner?
2. Is it documented?
3. Are there lint guidelines?
    1. Are they checked on the CI/CD?
4. Are there unit tests?
    1. Are they run on every commit?
5. Are there pre-push and pre-commit hooks? You can use Husky to set these up

### Testing

As mentioned above, running unit, integration, and e2e tests may be part of the CI/CD pipeline. Will new people who onboard be able to follow the repo’s README or some other document in order to understand how to test their changes? If there is code-coverage, how do new members of the team know where to find them?

☐ Testing

1. Is there a test pipeline
2. Are there unit tests
3. Are there automated code coverage reports?

☐ Bundle Sizes

1. Make sure tree shaking is happening correctly
2. Analyze the bundle size with create-react-app or BundleSizeAnalyzer webpack plugin

☐ Performance

1. Analyze your web app for pagespeed, lighthouse rating, and [a11y](https://github.com/thecreazy/siteaudit)

### External Services

Sometimes repositories are self-contained, but more often than not, a repository will pull external information from a service. This might be feature flags from providers like LaunchDarkly, or website content from a Content Management System (CMS). Do new members of the team need API keys for these services? Make sure to document any external services and how to access them.

☐ CMS

1. Are there a lot of text and content that is constantly updated?
2. Is there a CMS already implemented?

### Conclusion

This is not meant to be an exhaustive list of everything to think about concerning onboarding members to a project. Documentation is nice to have, but working with the team to understand what is missing and how to improve it goes a long way to keeping the team happy and productive.

I highly recommend reviewing the onboarding process from time to time and making sure that it is easy to onboard. You never know when your computer will crash and you need to set up your entire environment again.
