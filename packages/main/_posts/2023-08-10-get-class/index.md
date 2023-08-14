---
title: "Forbidden Typescript: Get Class Name"
tags: [typescript]
---

We don’t get a lot of information using `typeof` in JavaScript or TypeScript. At most, it tells us whether a value is `undefined`, `number`, `string`, or `object`. If you want to get the class name using a function, you can use the following extended version of `classOf` that is originally from “JavaScript: The Definitive Guide”:

```tsx
function classOf(obj: unknown) {
    if (obj === null) return "Null";
    if (typeof obj === "undefined") return "Undefined";

    if (typeof obj === 'object') {
        // Warning: this won't work if your Typescript is minified and class names are mangled.
        return (obj as object).constructor.name;
    }

    if (typeof obj === 'function') {
        // Warning: this won't work if your Typescript is minified and function names are mangled.
        const possibleName = (obj as CallableFunction).name;
        if (possibleName) {
            return possibleName;
        }
    }

    return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(classOf(null)); // "Null"
console.log(classOf(undefined)); // "Undefined"
console.log(classOf(1)); // "Number"
console.log(classOf("foobar")); // "String"
console.log(classOf({})); // "Object"
console.log(classOf([])); // "Array"
console.log(classOf(new Date()))

class Test {}
console.log(classOf(new Test())); // "Test"

function test() {}
console.log(classOf(test)); // "test"

console.log(classOf(function () {})) // "Function"
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBANgQwM4YPLABRwBGAVgFyLgDWYcA7mAJSIDeAUIh4jMIgSYgF4hiMCBQomAJwCmUEJKQAiAHJiUigNztO3XlACeAB2lweRYoOGLwAE2nAYYaTcVTZ8pQFUwdh05da2hy6eAbGpojmlgKIAOTm0tCxTGycaYgA9BmIAOpoCo4A5uRQABYwGIi0CLFQVXCSlFw8+nDyiAAqRtIYEJIwhnUViAC2jtwwzohoPsjoWCJoIz3TMqMzhSjOAHRB6TJyCrxRmJEkiVAM2xAIGFCSINAN22BL0lppAL6seyFhJmZ+EIYrFQJBYDUUns0llcvkwEUSuVKtUwLV6o1mohWu0usZev1BlxKmMEQ4pjMbIgwdB4EhXstKvlpOswJsdtDODcwHdEIY4FgYIQtso3oJjvxTgBhNDiNDC6QAMXAtIQVwZ705wR4eH5goVouWUPSJsQBw8fIFGCFIreH1N3y+PzS5qO2HO0G2hkkcCgvu62z9AGV7kVrrKUHxiFcMCgYBBpHgABwAGkQAFoAIwMLTfVjcjBwLbbFBwQp4VCYHD4UTiBg5zLZFRqRT525F6QlssV+bVvC2eyOZz1jSNxCKby+IcuNs8jtd8uVrC4PDZhuw5sjQjSSStgvz0uL3srxTAOBEfKuddNkP9Nl79vFw89qsr5ifEdjxTu4gXB9zp9uyXPsAG0AF1Pw3ABBSRJDQfR-0LQCj1fGtpFoRAABE0CgRN6wYH5gM6Ho6nfWckM7Z9gJXJwMI6Ei8Hw0cN3ou5W1YGkISQXC7kYlhvn3ZCX2XfAeMua9xzE9jBMooDj3wTi6V4FIPyYDdlXBOlFCAA)

This `classOf` function works for any value, including numbers, strings, booleans, classes, and functions. It will return the best name for that given value that is passed. If the object has a constructor name, that value will be returned. If that value is a function, the name of that function will be returned.

## Takeaways

Unfortunately, during some transpilation steps or code compression, these names get mangled or removed completely, so it’s best not to rely on the class’s actual name directly. Instead `instanceof` should be used, or a static name attribute that cannot be modified.
