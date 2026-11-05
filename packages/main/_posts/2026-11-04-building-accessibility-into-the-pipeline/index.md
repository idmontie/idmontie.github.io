---
title: Building Accessibility into the Pipeline
tags: [accessibility, pipeline, web, development]
---

Throughput is the name of the game now that the majority of engineers are using AI coding agents to write code. Delivering high quality product experiences that still provide accessible functionality is as important as ever.

At Couchsurfing, I wanted to make sure that our web applications were as accessible as possible. As with my other articles touching on design systems and component architecture, my goal was to make it easy to write accessible applications, and make it extremely difficult – if not impossible – to write create bad experiences.

This doesn’t just help those that need to use accessibility tools, but also uplifts the experience for everyone. Keyboard navigation works better, buttons are easier to click or press on any device, etc.

## Make the Wrong Way the Hard Way

Let’s start at the bottom of the design hierarchy and recognize that if something is broken at the lowest level, there isn’t much hope of fixing it when delivering features or having a coding agent write code that utilizes that low level code.

From ensuring that the low level tokens pass contrast rations, to ensuring that buttons always have an accessible label, our goal should be that if an engineer or coding agent uses a component from our component library, we provide an accessible experience. Writing good components is always a balancing act between creating a component that is too rigid, and one that is too flexible. The more flexible a component, the easier it is to use in the wrong way. I’ve [written about allowing too many boolean props](/blog/post/2025-01-12-api-surfaces) in components before that can lead to a cartesian explosion in different component states, but also think about allowing too many pass-through props.

If, for example, we allow ariaLabel to be passed through to the button component, when do we expect engineers to pass in the prop? Leaving that question open means that we can end up in a case where we aren’t passing the prop when we need to, or we pass it in and conflict with the default accessible label of the button which would just be the content.

When we split up components into their intended usage, it ends up being more clear when we should force an ariaLabel to be provided, and when we should just let the content act as the label.

As a concrete example, I often have an IconButton split from the Primary|SecondaryButton family:

```jsx
 export interface IconButton extends CoreButtonProps {
   ariaLabel: string;
   icon: ReactNode;
 }
 
 export interface PrimaryButton extends CoreButtonProps {
   label: string;
   prefixIcon?: ReactNode;
 }
```

The rest of the props have been removed so we can focus on the label. I used `ariaLabel` as a required string, to indicate that we aren’t showing the label, but for accessibility purposes we require one. And on PrimaryButton, we don’t allow that prop at all, but we do require a string label. If we allowed arbitrary ReactNodes, we might not guarentee that it is text that can be detected as the label by the browser. This is also where I would enforce localization, but I have written [separate articles about that](/blog/post/2023-08-19-localization).


## Catching Issues

With our low level components set up for success, we beed a way to ensure we don’t introduce any issues – and we would like to catch any existing issues for any components that already exist. We’ll tackle this with a wide approach of tools:

- Linting
- Unit tests
- Storybook
- E2E

At the linting level, I recommend looking at [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) which catches a lot of bad patterns that seep into code. At Couchsurfing, we would also write out own custom rules on top of these any time we noticed a bad pattern being introduced.

For unit tests, we maintain a 80%+ code coverage metric which helps ensure we are writing tests for components. These gates fail the CI if they fall below the threshold. We would also use [jest-axe](https://dev.to/ibn_abubakre/automated-testing-with-jest-axe-6fa) as a mechanism for catching a11y issues at the component level. The last tool we utilized as a jest plugin that turns all console warning and console errors into failing tests. If any unit test had an unexpected console warn or error, the entire test would fail.

At the storybook level, we would leverage the a11y plugin and periodically check if any components were breaking any issues. Typically these would be color contrast issues and we would work with designers to determine how best to fix them.

For E2E testing, let’s shift our focus to Feature Delivery.

## Feature Delivery

Delivering features typically has a different software lifecycle than working on a component library. Features are steadily shipped out, perhaps behind a feature flag, and combine a wide variety of design system level components and what I call “app level” components. These are reusable chunks of functionality that get shared across features in the application that might not belong to the design system. Maybe its a user card with functionality already wired up to load the user’s data. Or perhaps its an animated statistic that gets reused in a few spots in the application, but hasn’t been pulled into the design system.

I typically treat these “app level” components similarly to that of a design system component. But in practice it is much harder to maintain the level of documentation, testing, and accessibility requirements at the “app level” since these are not all contained within a structured design system. These app level components might be scattered across different domains in the application, or maybe even different repos.

To help ensure that accessibility is maintained across all these components and across the application as a whole, I like to add page level scanning as part of the continuous delivery pipeline. These type of tests might not run on every Pull Request, instead the might be a lagging indicator that runs nightly, and smoke checks a bunch of different pages in the application.

One toolset I like to run nightly is Lighthouse CLI which checks a bunch of pages, and emits a reports that can be joined together. The output then goes to Slack or a ticket tracking system to be triaged and worked on by engineers. The nice thing about Lighthouse is that it already comes with a suite of accessibility checks that run against the actual running web application that customers would see.

Even with jest unit tests and lint rules, there are some semantic accessibility checks that can still fail when components are composed together. For example, a link may have no descernable name when components are composed together and presented to the user. Or maybe the heading hierarchy of the page is out of order. In any case, the Lighthouse CLI audit will often catch these kind of issues.

## Conclusion

Knowing all the different edge-cases that can cause accessibility issues is a challenge, but we can catch a lot of the issues early in the development cycle. This is especially true if we set engineering and coding agents up for success by building solid component libraries. The better these building blocks, the better the application will be overall. And with the majority of code being written by AI coding agents, having different types of checks at different points in the process will help catch issues that the agent may not have reasoned through.