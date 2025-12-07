---
title: "Forbidden Typescript: Spreading Type-holes"
tags: [technology, programming, react, typescript]
---

I've discussed [full and partial objects before on this blog](/blog/post/2023-08-14-partial-objects), and in this article I'm going to investigate a common factory pattern
in Typescript that can lead to type-holes.
When writing tests or complex components, I'll often create prop factory utilities.

<!--truncate-->

For tests, the goal is to create props with all the default values, except a few that may be
overidden for a specific test case. The function signature typically looks like this:

```jsx
function makeFoo(partial?: Partial<Foo>): Foo;
```

The expectation is that a software developer can call `makeFoo` and get a version of `Foo` that has all the defaults set to use in tests. Then, if the developer want to override a few fields to test an edge case, all they do is call `makeFoo({ fieldA: 'special-case })`.

I’ve seen developers try to implement this a few ways, each with its pros and cons.

### Spreading

The easiest way to implement this function is to just provide defaults and spread the partial:

```jsx
interface Foo {
  fieldA: string;
  fieldB?: string;
  fieldC?: boolean | null;
}

function makeFoo(partial?: Partial<Foo>): Foo {
  return {
	  fieldA: 'test',
    fieldB: 'example',
    fieldC: false,
    ...partial
  };
}
```

Here, we create a `Foo`  mock with overrides for the defaults, which are provided by `partial?: Partial<Foo>` . However, even though `fieldA` is required, we can see a type-hole with the default Typescript compilation settings:

```jsx
const instance = makeFoo({ fieldA: undefined, fieldB: undefined, fieldC: undefined });
console.log(instance.fieldA);

// No type error, but this blows up
console.log(instance.fieldA.toLowerCase());
```

When we spread, `undefined` actually overrides the default! But why were we allowed to provide `undefined` in the first place?

In Typescript, `Partial<Foo>`  keeps all the fields, but makes them optional. In the default compilation settings, an optional field can be set to `undefined`.

[Typescript Playground Link](https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnIzAQA2AJgIIBcyAzmFKAOYDc+hx5AQgPw32MQrdkVJkAwn2QAjTCQhwQyAD7IQAVxIk2AX1y4Y6kAjDB0SgLZwA1hAzoAFAAc4UU3BJSACq-ckAPPYAfACUNPY47FAQYOpQSngAkASi5NTIAOSQ9BkANOwpnGRcNBkQAB5wFk7yeQUcYuI08CS0EPkEBAB0PS5uwB7sOrr6COb0yKD0ikjIALzIVrb2DtgNaTRGZBBEIBBkyDohbGMgtOjyXSToTA5TYDMQXamUx-oA9O-IAHJYYACeThQ0Cg6CguRk6jAyDAAAtgLQZNcAO6I9ROXCnc6Xa63e6PZ5FChdMDoAAy6GR0HEcDaDhCxyAA)

There is a Typescript compilation flag to throw a type-error and keep our sanity: `exactOptionalPropertyTypes`. Enabling this flag makes Typescript show an error for `makeFoo({ fieldA: undefined, fieldB: undefined, fieldC: undefined });`. We can add the field to the call if it is set to a value.

[Typescript Playground Link](https://www.typescriptlang.org/play/?exactOptionalPropertyTypes=true#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnIzAQA2AJgIIBcyAzmFKAOYDc+hx5AQgPw32MQrdkVJkAwn2QAjTCQhwQyAD7IQAVxIk2AX1y4Y6kAjDB0SgLZwA1hAzoAFAAc4UU3BJSACq-ckAPPYAfACUNPY47FAQYOpQSngAkASi5NTIAOSQ9BkANOwpnGRcNBkQAB5wFk7yeQUcYuI08CS0EPkEBAB0PS5uwB7sOrr6COb0yKD0ikjIALzIVrb2DtgNaTRGZBBEIBBkuevFmyDbu-uHqRInZ6D7yDohbGMgtOjyXSToTA5TYDMQLpXChPUbjd6Ar4-P4AoFFChdMDoAAy6AA7tBxHA2g4Qk8gA)

But this causes another problem: it is perfectly valid to create an initial instance of `Foo` without fieldB being set (and its value being `undefined`). But now our `makeFoo` object doesn’t allow us to pass `fieldB: undefined` anymore. Only when the interface explicitly defines fieldB as optional AND undefined does it allow us to so.

[Typescript Playground Link](https://www.typescriptlang.org/play/?exactOptionalPropertyTypes=true#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnIzAQA2AJgIIBcyAzmFKAOYDc+hx5AQgPw32MQTZAB9kAVxBkIREBDJsCRUmQDCfZACNMJCHBCjkIcSRJsAvrlwxJCMMHQGAtnADWEDOgAUABzhR7OBINAAV-QJIAHk8APgBKGk8cdigIMHEoAzwASCVOShoAckh6QoAadjyVLiKIAA84Jx9dcsqOFVUaeBJaCAqCAgA6Yb8A4CD2cwsrBEd6ZFB6fSRkAF5kF3dPL2x27hpJaVl5ZHM4tlmQWnRdQZJ0Ji9FsGWIQeVyCnOZuZu3+8ez1e73yFEGYHQABl0AB3aCqOC9Lxxc5AA)

Generally this pattern without the flag is fine for creating mock data, since any type-holes would only be scoped to tests and not real production code. But the question is: can we have `makeFoo` take a partial, return Foo without type-holes, and have allow `undefined` for partials?

## Null-Coalescing Every Field

Another common implementation I have seen is to add nullish coalescing to every field:

```jsx
interface Foo {
  fieldA: string;
  fieldB?: string;
  fieldC?: boolean | null;
}

function makeFoo(partial?: Partial<Foo>): Foo {
  return {
	  fieldA: partial?.fieldA ?? 'test',
    fieldB: partial?.fieldB ?? 'example',
    fieldC: partial?.fieldC ?? false,
  };
} 
```

Let’s also turn off the `exactOptionalPropertyTypes` compilation flag for now.

We know every field will be set correctly, so there are no type-holes in `Foo`, however, we still have the problem where we cannot override a field to the `unset` value of `undefined` :

[Typescript Playground Link](https://www.typescriptlang.org/play/?exactOptionalPropertyTypes=false&ssl=13&ssc=2&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnIzAQA2AJgIIBcyAzmFKAOYDc+hx5AQgPw32MQrdkVJkAwn2QAjTCQhwQyAD7IQAVxIk2AX1y4Y6kAjDB0SgLZwA1hAzoAFAAc4UU3BJSACq-ckAPPYAfACUNPY47FAQYOpQSngAkASi5NTILm7AHjwAdKmUyDw8yADkkPSlADTsKZxkXDSZfnkFXEUlpRAAHnAWTvLVtRxi4k2+2Z759eIdhB60EDUEOrr6COb0yKD0ikjIALzIVrb2DtgjaTRGZBBEIBBkVZcN1yC394-IOiFsGyC0dDyXIkdBMBw7MB7CDTMQUX64f6A4Gg8GQ6Gw7gIxGbIEw1EQgFQ4wwgoUXJgdAAGXQAHdoOI4IsHCEEUA)

Turning on the `exactOptionalPropertyTypes` also doesn’t save us here since we didn’t have a type-issue anyway, but more of a logic issue. `makeFoo({ fieldB: undefined })` will still set `fieldB` to `example`.

## Allowing bad inputs

This last approach takes the first and second approaches above and combines them using a `pickOrDefault` function. Here if any value is passed into the partial, we will return it, except when that value would be incorrect in the output type:

```tsx
function isValuePresent<T extends object>(obj: T, key: keyof T): boolean {
    return key in obj;
}

function pickOrDefault<T extends object, K extends keyof T>(partial: T, key: K, fallbackValue: T[K]): T[K] {
  if (key in partial) {
    return partial[key];
  }

  return fallbackValue
}

interface Foo {
  fieldA: string;
  fieldB?: string;
  fieldC?: boolean | null;
}

function makeFoo(partial: Partial<Foo> = {}): Foo {
  return {
	  fieldA: pickOrDefault(partial, 'fieldA', 'test') ?? 'test',
    fieldB: pickOrDefault(partial, 'fieldB', 'example'),
    fieldC: pickOrDefault(partial, 'fieldC', true),
  };
}

const instance = makeFoo({ fieldA: undefined, fieldB: undefined });
console.log(instance.fieldA);
console.log(instance.fieldB);

console.log(instance.fieldA.toLowerCase());

```

For each field, we prefer the input partial, except here the type mismatch for `fieldA` forced us to add the default value twice, once if the partial didn’t have a value, and once if the partial had `undefined` which isn’t allows in the final version of `type Foo`.

While more verbose, this does eliminate the type holes the code!