---
title: "Forbidden Typescript: Enumerating Properties"
---

In [“JavaScript: The Definitive Guide”](https://amzn.to/3rV5Xov), there are functions described in **6.5 Enumerating Properties** that probably shouldn’t be used in production code because they modify their input parameters: `extend`, `merge`, `restrict`, and `subtract`.

Let’s re-create each one using more modern practices in Typescript that don’t modify the input parameters:

```tsx
/**
 * Create a new object that returns the properties of target, overwritten with the properties in props
 */
function extend<T extends object, P extends object>(target: T, props: P): T & P {
    return {...target, ...props};
}
```

Even in a more modern implementation, I would never recommend this. It is almost always easier to write `{...a, ...b}` inline and have its meaning be more clear.

Next we have merge, not to be confused with extend:

```tsx
/**
 * Create a new object that returns all the properties of target and props, but the properties
 * in target are left alone.
 */
function merge<T extends object, P extends object>(target: T, props: P): T & P {
    return {...props, ...target};
}
```

Same thing here, even with a more type-safe implementation, it’s almost always more clear to have an inline spread of `{...b, ...a}`.

A more interesting function implementation is `restrict`:

```tsx
/**
 * Create a new object that returns all the values in target that also exist in props.
 */
function restrict<P extends object, T extends P>(target: T, props: P): Pick<T, keyof P> {
    const t: Partial<T> = { ...target };

    for (let key in target) {
        if (!(key in props)) {
            delete t[key];
        }
    }

    return t as Pick<T, keyof P>;
}

const obj1 = { a: 123, b: 222 };
const obj2 = { b: 0 };

console.log(restrict(obj1, obj2)); // { b: 222 }
```

Here we end up cloning our target object in order to delete keys from it later. An alternative approach might be to only construct the object with keys in props in the first place. This implementation is at least type-safe and will give you the correct typings for the object returned from `restrict`.

Lastly, here is our type-safe version of `subtract`:

```tsx
/**
 * Create a new object that returns all the values in target that do not exist in props.
 */
function subtract<T extends object, P extends object>(target: T, props: P): Omit<T, keyof P> {
    const t: Partial<T> = { ...target };

    for (let key in props) {
        if (key in t) {
            delete t[key as unknown as keyof T];
        }
    }

    return t as Omit<T, keyof P>;
}

console.log(subtract(obj1, obj2)); // { a: 123 }
```

Both the `restrict` and `subtract` make use of type assertions to tell the compiler we know the actual types of the objects and keys when we are removing keys. Without these assertions, `t` is still a `Partial<T>`, even after we delete the keys from the object.

## Takeaway

It’s almost always more clear and more type-safe to merge objects using inline spread notation than trying to use a clever utility. There are cases though, like `restrict` and `subtract` where we can leverage the type system to write safer code. There is always a balance to find when trying to write utilities between making something easier for engineers, and adding additional compile time safety.
