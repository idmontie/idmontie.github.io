---
title: "Forbidden Typescript: full/partial objects"
tags: ["typescript"]
---

When trying to be as type-safe as possible in Typescript, there are times when you may have to dynamically construct an object. You know as a programmer that all the keys will have values, but because you have to dynamically construct the values, the type system doesn’t know that the object is complete:

```tsx
/**
 * An example interface to demonstrate
 */
interface KnownCodes {
  code1: number;
  code2: number;
  code3: number;
}

function createValuesForKnownCodes(): KnownCodes {
  const knownCodes: Partial<KnownCodes> = {};

  // In a real example, these keys may come from some other object
  // or external data
  for (const key in ['code1', 'code2', 'code3']) {
     knownCodes[key as keyof KnownCodes] = dynamicValue(key);
  }

  return knownCodes as KnownCodes;
}

// Stub for the example
function dynamicValue(key: string) { return 0 };
```

In the above example, we know that `knownCodes` will have all the keys will have values for the interface `KnownCodes`. However, Typescript can’t infer that, so we have to cast the value.

As the function gets more complex with additional feature work, this can become brittle and lead to some type-holes where we may have accidentally forgotten to set a key.

One way to get around this is to use an assert:

```tsx
type RequireAll<T> = {
  [K in keyof T]-?: T[K];
};

function ensureAllRequired<T>(obj: Partial<T>, template: RequireAll<T>): asserts obj is T {
  for (const key in template) {
    if (obj[key] === undefined) {
      throw new Error(`Missing required property: ${key} in ${JSON.stringify(obj)}`);
    }
  }
}

interface KnownCodes {
  code1: number;
  code2: number;
  code3: number;
}

const TEMPALTE_CODES: KnownCodes = {
  code1: -1,
  code2: -1,
  code3: -1,
}

function createValuesForKnownCodes(): KnownCodes {
  const knownCodes: Partial<KnownCodes> = {};

  // In a real example, these keys may come from some other object
  // or external data
  for (const key of ['code1', 'code2']) {
     knownCodes[key as keyof KnownCodes] = dynamicValue(key);
  }

  ensureAllRequired(knownCodes, TEMPALTE_CODES);

  return knownCodes;
}

createValuesForKnownCodes();

// Stub for the example
function dynamicValue(key: string) { return 0 };
```

[Playground link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAShCOBXAlgJwgQQDZYDwBUA+KAXigG8AoKKAbQGkpkA7KAawhAHsAzKfALoBaAPwAufgwEBuSgF9ZlHomYBjYMi6sIzAM6J02LHCRoIAEwKEAFFwBGAKwkAFAIaoNrvEQA0UYBAAtmBYrgESJiiGOFYAlBKuuroQHrpQ9g5MafgU1FA8XKhQ1qpausDsnEysAcGhAbG5NDTIfLaOtBwgAqQkZCrmEDwsFo1Uzc3AABaoXADuUMwQCwCiqLOo1gAGALLISSwA5lDopujmUGCzkB4gEgAk5F1y1VCPAFIAygDyAHIAdOVUEdWiB2g5YnItrFZBM5Hl4fDKCwAqgeK5VNB6Mx5swAMJcQZpcZQUqDACMEmYiECdhSsNJhIgACYqTS6ahZABIMkQADMbNp9PklEopT0FXwKx2zgwABkpQB9PHfAAiK0+EmxuIJRNITUZFIkQnJPjyvNZUBNZpovIFVtNIqUKnUmlYqnQYQgADUvIgILoAGKFbVzfFM3TWeJQUPhvUk8Xldg4sO6gMudyePCxtO6YhkcgKUU0AD0JagAElWK4ThAvFAIAAPVx1CB+aYB6BdNKBVwgRmBaA8WaBKC6LiD9IdooZCDqPJl9JFJuo5j18xhVx5ApFEplCpddJ8WgAcl55JPfjPTOZJ4EYzyzTYKbjAc6VUSlW4fBzEZ6ZHMEA10CZBVF9LB-WsLoYQRYsGz0AxMBwSIzHMKCX1zPwpRleUlRVdVPhgvJ0GAAxWGfHUI1kJEPTrAJwP9IMQwwiMo0URdPlIux8kKfwpmgJsWxCCBnTUDQtCgQDgNAhiICgzgJCBI4xlrUjUFYAAGKAiyAA)

The above code does a **************runtime************** check that the object has all the keys that are defined in the template. This ensure that any missing keys are caught as well.

I have seen other examples online where only the object is passed in, but this ends up not working if the keys are not defined in the object:

```tsx

function ensureAllRequired<T>(obj: Partial<T>): asserts obj is T {
  for (const key in obj) {
    if (obj[key] === undefined) {
      throw new Error(`Missing required property: ${key} in ${JSON.stringify(obj)}`);
    }
  }
}

```

The above will let any empty object partial to pass the assert.

## Takeaway

This ends up being a lot of work to do a runtime check to improve our typings, which I’m not sure is the best approach. Most of the time when we construct objects from an empty object, it’s difficult to ensure that the full object has been safely created.

Since we have to create a template object anyway, it is almost always simpler to do the following:

```tsx
interface KnownCodes {
  code1: number;
  code2: number;
  code3: number;
}

const TEMPALTE_CODES: KnownCodes = {
  code1: -1,
  code2: -1,
  code3: -1,
}

function createValuesForKnownCodes(): KnownCodes {
  const knownCodes = { ...TEMPALTE_CODES };

  // In a real example, these keys may come from some other object
  // or external data
  for (const key of ['code1', 'code2', 'code3']) {
     knownCodes[key as keyof KnownCodes] = dynamicValue(key);
  }

  return knownCodes;
}

createValuesForKnownCodes();

// Stub for the example
function dynamicValue(key: string) { return 0 };
```

[Playground link](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgNIgPYHcQGEMAmEAzsgN4BQyyChEAjAFzIgCuAtgEbQDcVNdAEzM2XXv1pEAzCI7cofAL4UKtEMTDIAKgFEAsgAUAggBldAfVwB5ACI6Ays3TY8dUgF5yEuk2QBaegAabyJhfyCQiBlw4OUKGFYQBDBgDBAaKAg4SAA1OAAbVhIAMQwoZxx8ImIACgBKJ0xKty9qNQ1kAGsm12rkTzJkADoR3UNTC2s7e2RFPn4AegXkAEl0uGRMguQIAA84dgAHfIhA5DAACxIUTogAT1J2ODuBdhQYKAx2ZGIvlAxLtBkBhOAArCDJRbLMo7XaQKAgbYEbJwfgwGE1dqaW4vDAwZAAbQA5JIGESziShOTkJTpESALp1VrUajdFxVEgEnHIOCkHF4tA9DnEen9ZAEO6I9jABB5QoQGo4up8ahxaiZMCsBFdIVuJQqBBbXIFIrEUrlXXVerzJbIeyazjIdFQc5XWEHY4QeKJZKpdISqUyuVFRX3ZgaKCgADmTMGGq16QADLM+EA)

Here we take the easy way out and clone the template and then built the object from there. Even if we forget to add a key (like `code3`) to our list of keys or its missing from our external data that we are using, we will be guaranteed that the return value is the correct shape and types.
