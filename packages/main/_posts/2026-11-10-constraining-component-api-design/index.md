---
title: Constraining Component API Design
tags: [react, design-systems, apis, ai]
---

Which is better – a single Button component with lots of props, or splitting that button component up into a PrimaryButton, SecondaryButton, OutlineButton, etc? Having worked on implementing and restructuring several design systems at this point, I eventually came around to an API design philosophy that I didn’t really agree with when I first started picking up React.
<!--truncate-->
I was attending a React meetup in Phoenix, when the discussion about how to structure components came up. The presenter took the stance that for their component library, they split up components into separate components – PrimaryButton, SecondaryButton, OutlineButton, etc – rather than having a generic Button component. Someone in the audience asked if that meant they really had dozens of different button components that they had to maintain, and the presenter proudly said yes. The audience member remained skeptical – as did I.

If React allows us to use props to define how to present a button component, why would you split the button components up? It seemed like unnecessary maintenance and overhead. Anyone using React back in the day would probably agree – there were only class components and they had a lot of overhead to write and maintain a simple presentational components. Sharing behavior was also difficult, with mixins having been deprecated and classes relying on the Higher Order Component pattern in order to share behavior.

For anyone that has read my blog, you’ll know I’ve pivoted from believing that a component should allow a bunch of different visual style props that might create a [cartesian explosion of component variants](/blog/post/2026-02-01-api-complexity-revisited).

Going back to the button example: if we have a `variant` prop with `primary | secondary` as options, and `outline: Boolean` prop, but we don’t want to support an secondary outline button, we have support it anyway because it is a valid prop combination.

Focusing on how to constrain the UI and how we build components has helped me guide teams towards better consistency across the applications I have worked on. Additionally, with AI coding agents writing a majority of the code we are implementing now, these constraints help guide the coding agent without having to reiterate how to use these components in every prompt/context.

## Component Variants

Component variants should correspond to the real design language used by designers and engineers. We should expect specific button variant components to be well defined, documented, and have examples of when and how to use them. We don’t want dozens of boolean props that can lead to unsupported visual combinations. 

Instead we should focus on which combinations are actually valid. I dive into why this matters in my post about API Surfaces [API Surfaces](/blog/post/2025-01-12-api-surfaces), which boils down to making invalid combinations of props impossible. And when revisiting API Surfaces [API Complexity Revisited](/blog/post/2026-02-01-api-complexity-revisited), I go into practical patterns for reducing prop combinations.

## Avoid (Some) Passthrough Props

As a general rule when defining component APIs, I take the approach of minimizing the [API Surfaces](/blog/post/2025-01-12-api-surfaces) as much as possible.

What this means in practice for building components is to avoid passing through props as much as possible. The `className` prop is one that I almost always see included on component prop types, and then merged with the component’s defined `className`s. The more engineers use this className to try to style a component, the harder it gets to make design or refactoring changes to the component. Essentially, allowing pass-through props like this is a [Leaky Abstraction](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/).

Instead, I prefer that props are as specific as possible, listing out either variants or slots in cases where custom content is required.

I typically also pair this hand-in-hand with custom lint rules that disallow certain classNames from being used. If the component library is supposed to encapsulate the the look and feel of the site, then disallowing background color and text color classNames outside of the component library is typically my go to. This can be difficult in larger code-bases with lots of legacy code, so I reach for tools that help accomplish this, like `eslint-seatbelt` created by Notion [How We Evolved Our Code Notion’s Ratcheting System Using Custom ESLint Rules](https://www.notion.com/blog/how-we-evolved-our-code-notions-ratcheting-system-using-custom-eslint-rules) - [eslint-seatbelt](https://github.com/justjake/eslint-seatbelt). 

All of these lint rules are always errors. Eslint warnings are pretty much useless and no-one pays any attention to them. They litter the eslint output and they never get fixes.

## Align Across the Organization

The difficulty with what we have discussed in this article is that a lot of the component naming, types of props, and when to split up variants is subjective. Analyzing your repo and the decisions you make are important to keeping these patterns consistent in the future. With the continued use of coding agents, documenting these patterns and decisions in the repo as part of a README or AGENTS file helps the agent gain context. Then how to design the component APIs and when to split the components can be part of the agent planning process and execution. That context can also be pulled in to evaluate code during the code review process.

When possible, I also build custom eslint rules to continue to enforce certain properties of the components: naming convention, how these components are structured in folders with markdown, stories, and unit tests, and accessibility rules are often built into custom eslint rules that will fail PRs.

Building these conventions and adhering to them takes time, and often takes the whole team to be onboard with conventions. Loop in the team, set up retrospectives and guild meetings, and keep encouraging the team to build better and smarter.