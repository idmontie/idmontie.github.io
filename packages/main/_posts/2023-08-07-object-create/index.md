---
title: "Forbidden Typescript: Using Object.create to clone"
---

In “Javascript: The Definitive Guide” there is an example that uses `Object.inherit` to inherit the prototype change. JavaScript defines a method `Object.create` that creates a new object using the given argument as the prototype of that object. Translating the examples from The Definitive Guide to Typescript, it looks like:

```tsx
function inherit<T extends object>(obj: T): T {
    return Object.create(obj);
}

class MyObject {
    public a: number;

    constructor(a: number) {
        this.a = a;
    }
}
const myObject = new MyObject(123);
const myClone = inherit(myObject);
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMALApgJxlAPAFUXQA8p0wATAZ0TgCMArdaAPgAp6GAuRfASh6EA3gChE4xJnRQQmJAHlGzKADoIUgIZkOjPgG4RAXxEiIAGw1UaAWQCeiptESiJiAA4g6ZmBEQaeYCAAtnRYBmISEAhUUJgg0HCYbP6IgSFYfM4RruJQqDBUKhqIALx+Bq7GxlFgMYhB9kpOZWDoAO6Idg7KbACMAEwAzPqm0VD1tgDCZgjopchoWDhsDd3QI6O1cGboKjMA5iuNjlD6iAD0585+PAODiNXR27sHR9OzZ5fOj1s7e3CHBrvVoLGIaSDoODATrHZSfK6xEDoERAA)

However, we lied. Notice that in the above code, the `myClone` object was created without `a` being initialized.

```tsx
console.log(myObject); // { a: 123 }
console.log(myClone); // {}
console.log(myClone instanceof MyObject); // true
```

This creates what is known as a *type-hole*: the Typescript compiler will not report any bugs when we try to use `myClone.a`.  That’s because we used `Object.create` which returns the `any` type. In the above example, if we tried to use `myClone.a` in a case where we expected a `number`, but got `undefined`, we can end up with runtime bugs that should have been caught by the compiler.

We can make the typings a little more clear by doing the following:

```tsx
function inherit<T extends object>(obj: T): Partial<T> {
    return Object.create(obj);
}
```

Now Typescript will report that the value of `myClone.a` might be undefined.

Let’s improve this a bit more and create an object that inherits and freezes the data in the given object:

```tsx
function inheritAndFreeze<T extends object>(obj: T, values: Partial<T>): Readonly<Partial<T>> {
    const properties: PropertyDescriptorMap = {};

    Object.keys(obj).forEach((unsafeKey) => {
        const key = unsafeKey as keyof T;
        properties[key] = {
            value: values[key] ?? undefined,
            writable: false,
						configurable: false,
        };
    })

    return Object.create(obj, properties);
}

class MyObject {
    public a: number;

    constructor(a: number) {
        this.a = a;
    }
}

const myObject = new MyObject(123);
const myClone = inheritAndFreeze(myObject, { a: 123 });

console.log(myClone); // { a: 123 }
myClone.a = 999; // Would throw "Cannot assign to read only property 'a' of object '#<MyObject>' "
```

[Playground Link](https://www.typescriptlang.org/play?ssl=29&ssc=102&pln=1&pc=1#code/GYVwdgxgLglg9mABDMALApgJxlAgmAEwDFN10AvdAHgBVF0APKdQgZ0TgCMArdaAPgAUXbgC5ENADSIAbgEMANiHStxABTmZYi2vwCU4gEro5BBAoCeVDVpg6a-fogDeAKEQfEEBKyiIADphw-liwKupBIVoWACIqENj+UHCYALJy-ogAvC4AvgDcru6eAPI8fFAAdADW6Baswjx6lcApAKJyEKiCguCscsDoANJ1etlObp5TXj5+tRbZiH0Dw3WIcuzzcMAShdOegcGhMCoA2vMAuouT+9PySuji98qs53VXAPwfS4TowCjoAiSYq3TwAd2wUDknAUj0QwEUrHQwIAkGj0d4wP8AOYgTDQ2HiBEKJHA0EFEGIXJ6IpTUhQPFIMq8aCVBImZiNbjSQ5RMKsPSFXJFCAKDbsVIWZkVFyU-wgGEwCDrcRgEAAW04WEKlMxvkwIGgKUEclVGq1mDGN32UFQMFYlTkizke08wuFrj1fnVUvK0EWYHQYMQkul0EEAEYAEwAZkFntmiB9AGEFAh0IsUBhIfhiKQKOhBD6w1BpM4VYhozGqfGE2BWHBYZU09iixZU+nBYgAPTdkO+ll+ZzCvWN9DNuCtlNpwOOru9yux1wL6fpx2LACcW-yPb7AHU4CAFARELagsGAETJuRgMBwPzimDYpDJRCkUwcMCWAKRUILADkcj-hwOwiDK-4AMRUKGfpQPwwEXkAA)

If we didn’t mark the return value as `Readonly<Partial<T>>`, and instead just had `Partial<T>` we would once again have a type-hole and `myClone.a = 999;` would be allowed by Typescript, but would throw an exception at runtime because property a is read only as a runtime constraint.

## The Takeaway

Let’s step back and really look at what `inherit` was doing. All it gave us was a template object, and if you read on [MDN about Inheritance and prototype chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain):

> You may also see some legacy code using `[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)` to build the inheritance chain. However, because this reassigns the `prototype` property and removes the `[constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)` property, it can be more error-prone, while performance gains may not be apparent if the constructors haven't created any instances yet.
> 

The key here is to be wary of using utility functions built into the language that return the `any` type. Be careful what the Typescript constraints are and make sure you don’t have any type-holes when you are using these generic functions.