---
title: "API Complexity Revisited"
tags: [technology, programming, apis]
---

In a previous article, I discussed [Surfaces](/blog/post/2025-01-12-api-surfaces) as an abstraction on APIs and how we could measure complexity as the size of that surfaces' perimeter – the "visible" part of the API to consumers. I shared this article with a colleague who I was actively working closely with on a new implementation of a design system. They has some interesting feedback on different ways of reducing complexity of certain APIs that I felt compelled to revisit this topic.

<!--truncate-->

In the context of a design system, we have tokens, components, and combinations of lower level components that typically follow the [Brad Frost](https://atomicdesign.bradfrost.com/) pattern of attems, molecules, and organisms. At the atom level, a component's complexity follows the Surface API pattern I described very closely in the previous article. As the number of props increases, the component's complexity increases with it:

$$
C \propto |p|
$$

It also increases with the number of prop combinations that the type system allows:

$$
C \propto \prod_{n=1}^{|p|} p_n
$$

So the goal should be to keep the number of prop combinations as low as possible to avoid the possible cartiesian explosion in size, and therefor a dramatic increase to the component's complexity. My last article described a few ways to limit the combinations by using strict typings to reduce multiple props into a single prop. In this article, I'll explore some very specific examples of this and additional ways to reduce complexity.

## Reducing Prop Complexity

Before we dive into reducing prop complexity, I'd like to split the types of Design Systems I am going to discuss into two categories: those meant to serve many different projects, and those meant to serve a handful of projects.

HeroUI (formerly NextUI), Boostrap, Material Design, etc are the former. They are meant to be flexible enough to serve a wide range of use-cases. The components contained in these design systems will often exhibit the complexity explosion caused by the cartesian product of the props they have to support. For example, let's look at the prop types for just the button in HeroUI:

![HeroUI button props](./heorui-button-props.png)

We'll focus on just the first three props after `children`: we have 7 different variants, 6 colors, and 3 sizes. Just these props alone means we already have 126 different ways the button can be styled. If we want to ensure a change does not break anything, I would expect the CI to take snapshots of these 126 different combinations. Which means 126 states to capture, snapshot, and review. We haven't even taken into account that these buttons can have normal, hovered, pressed, and disabled states. Or that they can have startContent, endContent, or loading states as well.

On the other hand, if we are designing for an internal design system, we can be much more discerning in the props we allow. We might use HeroUI, Boostrap, or another UI toolkit as a base, however, when constructing an internal design system, the mainainters should aim to reduce the API complexity as much as possible. This helps both the maintainers keep a consistent design without introducing breaking changes everytime there is an update, and helps the consumers be able to work with a straightfoward design system. The internal design system can act as a facade for the more generic component library, and in doing so will achieve two benefits: 1. it enables a layer to allow the internals of the design system to change without impacting the consumers, and 2. it provides a reduced API complexity to consumers which is our main goal in this article.

Most of the reduction in prop complexity from facading the general design system component in our internal design system is made by making strong opinions. If we can determine that there will only ever be two kinds of buttons on our site – DefaultButton and PrimaryButton – we can reduce the complexity of the API by omitting secondary, success, warning, danger, and other variants. Likewise, if we know we only want Solid and Bordered versions of buttons, we can mit light, flat, faded, shadow, and gost variants. This alone reduces the possible combinations from 126 to just 12 button states. We may even have the opinion that there will never be a Bordered Primary Button, and we can omit that type combination from the props to reduce the number of button states even further.

These examples cover in more concrete terms what I abstractly covered in my last article. We can reduce complexity of atom-level components by restricting the number of props, the size of those props, and the prop combinations that are invalid. The next section will cover a new technique that comes up when designing molecule-level components.

## Reducing Props Complexity Via Composition

Imagine we have an Accordion component. This accordion can be open or closed, it can have a title, icon, description and content. When it has an icon, the size of the title and description must account for it. When there is no description, we want to ensure that the icon and title are centered vertically in the space. If there is a description, we want the icon, title, and description to be top aligned.

Rather than thinking a the Accordion as one giant component that takes in props for its open state, title, icon, description, and content, we can *decompose* the Accordion into smaller components with their own APIs.

If we try to write the Accordion as one large component, we have:

* `isOpen: boolean` - 2 states
* `title: string` - 1 state
* `description: string | undefined` - 2 states
* `icon: IconComponent | undefined` - 2 states
* `content: JSX.Element` - 1 state

Altogether, this has 8 state combinations.

If we split the component into an Accordion and an AccordionHeader, we have for the Accordion:

* `isOpen: boolean` - 2 states
* `header: AccordionHeader` - 1 state
* `content: JSX.Element` - 1 state

And AccordionHeader:

* `title: string` - 1 state
* `description: string | undefined` - 2 states
* `icon: IconComponent | undefined` - 2 states

Which when split up leads to 2 state combinations for the Accordion, and 4 state combinations for the AccordionHeader. Meaning that the composition of the two is:

$$
C(S) = \sum_{i=1}^{n} c(f_i)
$$

This, we only have 6 state combinations as our API complexity for the split up components instead of 8. You can see how letting consumers compose smaller components instead of giving consumers a large complex componnent that does everything, we reduce the API complexity.


## Takeaways

While restricting prop combinations can be extremely useful for reducing API complexity, it can be complemented by using composition to help break up molecules back into atom-size components. By pushing composition to the consumer, we can keep API complexity manageable.