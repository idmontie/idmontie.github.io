---
title: "Thoughts on Naming Utility Functions"
tags: [programming]
---

We all know that naming things is right up there in the top three most difficult things about programming, right next to concurrency and caching.

For common utility functions, I typically follow a few rules to at least prefix the function names in a consistent and meaningful way. Some of these are borrowed from React Testing Library, whose naming scheme I like very much as it is internally consistent with the return types that certain classes of functions return, but also easy to memorize how they behave.

- `getFoo` - “get” as a utility function prefix name should indicate that the function will return `type Foo` and that it is meant to be synchronous and without side-effects. Typically a `getFoo` would always return Foo from the current context or in-memory synchronous data store.
- `queryFoo` - functions with the prefix “query” should return `type Promise<Foo>`. Querying usually implies getting data asynchronously from an external data store and may have side-effects, let alone caching that data in a synchronous store for easier data-fetching in the future. I have also seen `fetchFoo` to indicate that the function will retrieve data from an external store, but I typically reserve `fetch` for low-level wrappers of the `fetch` utility.
- `createFoo` - similar to `getXYZ`, this creates a local, synchronously made instance of `Foo`. There may be side-effects here, but typically this function is idempotent. Following the pattern of `typeOrm` , creating an instance of `Foo` is NOT the same as making an instance with nice defaults. This instance of `Foo` might not have any data initialized, but may only come with the instance methods and unset variables.
- `mutateFoo` or `saveFoo` - create or update an instance of `type Foo`. Typically the only side-effect in these functions is storing the data in a cache, database, file, etc.
- `makeFoo` - this is very similar to `createFoo`, but this is typically reserved for mocks and default versions of `Foo`. For example, if you have a form with a lot of presets that a user is filling out, you might have a default version of the `Foo` object that you want to represent in your view state. When you extract that default, it would be returned in a `makeFoo` function (that might call `createFoo` in its internals to make an instance of `Foo`). Likewise, for mocks, you may want to make the process of creating a mock with a bunch of defaults simple, and have a function named `createMockFoo` with signature: `createMockFoo(overrides?: Partial<Foo>): Foo`.

This is by no means an exhaustive list, but I do find it helpful to follow this pattern for code consistency and setting expectations with other software developers. If I write a function called `getFoo`, it shouldn’t query a database. If I write a `makeFoo` function, I would expect a nicely initialized `Foo` to pop out.

To me, following these conventions is similar to legalistic words like “must” and “can”. If we were to use these words in programming conventions, then `mustXYZ` would mean a function will ALWAYS return a value, no matter what, while `canXYZ` would mean the function could return `null | undefined` as well. Similarly, having some standard naming convention helps teams write code that others will understand without having to read jsdocs or dive deeper into the code every single time.
