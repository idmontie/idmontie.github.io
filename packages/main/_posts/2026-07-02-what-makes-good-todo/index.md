---
title: "What Makes a Good TODO?"
tags: [technology, programming]
---

We all end up doing it: `// TODO implement this function`, or `// TODO handle this edge case`. Often as we write code, we use `TODO`s to track ephemeral work, and typically clean them up as we go along. But sometimes we keep that `TODO` around, and it ends up in main. Then what?

Sophie Alpert, in “TODOs aren’t for doing”, argues that the comments themselves are valuable since they may reveal the original authors’ intentions – or, more importantly, their lack of intention for handling a specific edge case. `TODO` comments often do a good job of saying “why” code is the way it is, rather than “how” something works the way it does.

The blog post goes on to say that requiring `TODO`s to have a ticket associated with them is something we should avoid. This is where our opinions diverge. In places I have worked, I have created custom lint rules that require a `TODO` to have a corresponding ticket written as part of their definition, something like `// TODO(xyz-123): description` . The intention here is twofold:

1. By making engineers write a ticket, they often think about whether writing a ticket is worth the time, rather than just implementing the functionality.
2. It helps deprioritize work that may not be necessary.

For example, I would often see code around error handling littered with `TODO`s; `// TODO implement a better fallback when X system fails` or `// TODO log the issue in our monitoring system`. With the rule enabled, that all but disappeared. Engineers simply started adding logging rather than creating a follow-up ticket.

Other times, a `TODO` turns into a task that we follow up later in a refinement. Engineers then get to discuss with product whether something is even worth doing.

```tsx
// TODO(XYZ-123): use new API to get the latest data, rather then the deprecated API
```

The team can now set aside time in their sprint or an upcoming sprint to tackle the tricky issue that the `TODO` marked. Or in the case where product decides it is not worth doing, the `TODO` can become documentation like Sophie Alpert mentioned

```tsx
// XYZ-123: decision was made to continue to use the old API for the foreseeable future
```

In this way, comments are linked with the work and decisions that were made, rather than one-off `TODOs`. Any amount of documentation is better than no documentation, so if you are using TODO comments as a way of documenting pending work, that is preferable to not marking work at all. In that way, a good `TODO` is linked with pending work. It marks the intention of what code was missing when writing the original implementation.

### References

[TODOs aren't for doing](sophiebits.com/2025/07/21/todos-arent-for-doing) - Big shout out to Sophie Bits, go check it out.