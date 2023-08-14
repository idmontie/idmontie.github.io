---
title: "Forbidden Typescript: ensuring all of a type"
tags: [typescript]
---

When creating more complex systems, there are times where you will want to ensure that an array contains every value of a defined type. We have a union of primitive literal types to define the possible values a type can have:

```tsx
type Colors = 'red' | 'green' | 'blue';
```

Then, throughout our codebase, we can use the `Color` type to ensure functions can only be called with those values:

```tsx
addColor(name: Colors);
```

But, we may want to make sure that when we create a new possible value for the type, we don’t forget to use that value to do some initialization:

```tsx
function initColors() {
  addColor('red')
  addColor('green');
  addColor('blue');
}
```

There are a few ways to do this, one would be to create a record that must contain every color:

```tsx
const allColors: Record<Colors, boolean> = {
    red: true,
    green: true,
    blue: true,
};

function initColorsUsingRecord() {
    (Object.keys(allColors) as Colors[]).forEach((color) => {
        addColor(color);
    });
}
```

In the above snippet, we create a record that will have every `Colors` type as a key, and Typescript will complain when we add a new literal type to the `Colors` union and forget to add it to the record.

Notice though that we end up just getting the list of keys in `allColors` as an array anyway, then casting that type to help with the type-hinting for `Object.keys`.

We can also ensure that we create an array with every value of a given type:

```tsx
/**
 * Generator function to create functions that will throw typing exceptions when
 * the given array does not contain all values of the type
 */
function ensureAllOf<T>() {
    return <U extends T[]>(array: U & ([T] extends [U[number]] ? unknown : "Invalid")) => array;
}

type Color = 'red' | 'green' | 'blue';
const ensureAllColors = ensureAllOf<Color>();
const colors = ensureAllColors(['red', 'green', 'blue']);

function addColor(color: Color) {
    // just a stub
}

function initColorsUsingEnsure() {
    colors.forEach(color => {
        addColor(color);
    });
}
```

[Typescript Playground](https://www.typescriptlang.org/play?#code/PQKhCgAIUhxBTAdvATgQwC4HsWQGYCuiAxhgJZaKTaTErybz5GkWIDO1AFppAO5kANoO4osfagE8ADmUQBzSPAAexeNPKVOfLkigwMuyPLIA3JJDQp0kyABMs8ToiwZalDGjmXhkU2kECJ0gsPG4mDBl4fWBwQhJNKiR2AnoAQWEAeTwAHgAVAD4ACgBKSABvKEhq+gxUqhyAVSVlDCQ7TjyAbQBdYqsbAC5IZoAySCKuvJ6WtsQOyC7GrsQCAFsAI1QemYB+SCIAaxc+KmGAIgBJRH9BMjtzkrKAXgLLazRJAG5wAF9wcCRaRMADCWEEOEgz0gAHJ6HYYZAAD6w+T0JCIlEwjaBeAwn7ELRuZKpeAZQRgiEoTjQknpLK5Sk4YolAlE9xUmlKDik8lM6mTOHwBEAGlR6MQMLF2NxMJ6rIB8VYlEsdjs-KKhKpw35ZUq1WqwGAkAAVgR2G40JALQQNn9FSxEpA5GQMPz2I12HJ5ABRHn0UoVKrVLU4dgAOjwOB9aGIXE14MhryDBtTqvViZQCapCtTvwVvyAA)

In the above example, we have a template `ensureAllOf` that takes a type and spits out a function that takes an array of that type and will throw a typing error if that array does not contain all of the possible values.

If we add “yellow” to the `Colors` type, then `ensureAllColors` will remind us that we need to add “yellow” to the list of values

## Takeaway

While `ensureAllOf` may come in handy in some cases, it is almost always easier to use an enumeration:

```tsx
enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue'
}

function addColor(color: Color) {
    console.log('init', color);
}

const colors = Object.values(Color);

function initColorsUsingEnsure() {
    colors.forEach(color => {
        addColor(color);
    });
}
initColorsUsingEnsure();
```

[Typescript Playground](https://www.typescriptlang.org/play?#code/KYOwrgtgBAwg9gGzgJygbwFBW1ZwAmUAvFAOR76kA0WOA5nqMWQ8KNbdgEYJjDOkefUhgC+GDADMwIAMYAXAJZwQUAIb588JMgAUsxCgBcsQ8gCU6TlAMgAzomAA6JHV2lFIRfOo2z5gG4xCVs7eT8dO2YAeS4AK2AFJwA3NV5gO11tFECJaTklFShPb2zkOwBVO086AFF7MDxdS0wcCJQ7J0kUWrVZAAt9M2IAPis2to0tMyGdXLbRXPES+TLK6pA6hqbAoA)

Using an enumeration, there is no need to write a type and have to add the new value to the ensureOfAll array.
