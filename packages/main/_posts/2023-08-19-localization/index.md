---
title: Enforcing Localization through Types
tags: ["typescript", "react"]
---

When building web applications, enforcing that strings be localized to the user’s preferred language can sometimes be achieved via lint rules. But what if we could enforce proper localization using types in Typescript?

## Defining a Localized Type

Typescript doesn’t natively provide an [Opaque type](https://en.wikipedia.org/wiki/Opaque_data_type) that we can use to define a string that has already been localized. If the data looks like a string, Typescript will consider it a string. We can however use utility types that simulate opaque types, like the Opaque definition in [type-fest](https://github.com/sindresorhus/type-fest):

```tsx
import { Opaque } from 'type-fest';

type LocalizedString = Opaque<'LocalizedString', string>;
```

[Playground example](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgeTAQwI4FcCmcC+cAZlBCHAOQwCeYOAtETgM4wUDcAUJzXXADIQAxmgA2wAF44AJgGUYUYADsA5nAC8KdNhwAeCoJHipchcpUUANHFaLVAPnZA)

Here is a short example where we create a localized string and try to use a raw string and our localized string in a function:

```tsx
import { Opaque } from 'type-fest';

type LocalizedString = Opaque<'LocalizedString', string>;

function createLocalizedString(s: string): LocalizedString {
    return s as LocalizedString;
}

function example(s: LocalizedString) {
    return s;
}

console.log(example('test')); // Will throw a type error
console.log(example(createLocalizedString('test'))); // Works correctly
```

[Playground example](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgeTAQwI4FcCmcC+cAZlBCHAOQwCeYOAtETgM4wUDcAUJzXXADIQAxmgA2wAF44AJgGUYUYADsA5nAC8KdNhwAeCoJHipchcpUUANHFaLVAPi6ciWJUJjAISuEKg40MDiGYpIy8nYqABTMAFw2ZqoAlHHBxmEJagiccDlwfjBYUN7McGglqaGmEVz43C5uHl5wOAAeaOCiONEpwiEm4eaJiNm5+YXFNdxCXswQnQB0ohBRre1gnZFULGyJiVzTSrMLSyttHV2+-oEV-RmbgawUu3tAA)

Now we have a type that we can use in our function and components to denote that we expect an already localized string to be used.

## Enforcing in Components

The simplest way we can enforce that strings have already been localized is by using the type in our component’s props interface:

```tsx

interface ButtonProps {
  label: LocalizedString;
}

function Button(props: ButtonProps) {
  return <button>{props.label}</button>;
}
```

Now if we try to use that component without a localized string, we get an error:

```tsx
import React from 'react';
import { Opaque } from 'type-fest';

type LocalizedString = Opaque<'LocalizedString', string>;

function createLocalizedString(s: string): LocalizedString {
    return s as LocalizedString;
}

interface ButtonProps {
  label: LocalizedString;
}

function Button(props: ButtonProps) {
  return <button>{props.label}</button>;
}

function Example() {
    return (
        <>
            <Button label="Test" />
            <Button label={createLocalizedString("Test")} />
        </>
    );
}
```

[Playground example](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOAbzgHkwUBHAVyTgF85tcCYATzBIAtJiQBnGGXLkhIuABkIaFABtgALyQATAMowowAHYBzOAF5GzdkgA8+FWs06DR02fwAaONOPmAHwU5JhsJhjAECZwaEQoMEjOGtp6hgFmABSSAFx+HuYAlHnJrmkFFrTkcDVwRDBsUDGScCgtpanuGRRccqaJUJjonABCbDAw0QAKOGAtVTXqKABGSOolqilu6Z49cmERMFExYxPRmWCzuXCnkyYzEHOFdNV1SA1NcPbL43eBtJdHpIAHRLVbqLj2AD0PzOJmC5F6oXCkWicAAogAPFDgdRITLPBa1eqNGKZV61Wr2QIUyl0+y3NFgtaWABEABUpDBWXAoTS6QKvoyYsz1JZaHFUIkOtsKpkOVzWYUeHzaZTofzaoUekA)

## Localizing Strings

So far, we’ve been using a utility `createLocalizedString` to create and use the LocalizedString type. This utility is only really practical in unit tests. For real applications, we’ll want to use a translation function from [react-i18next](https://github.com/i18next/react-i18next) or [next-i18next](https://github.com/i18next/next-i18next) to do the heavy lifting. Then we just wrap the translation functions that are provided in order to use our type:

```tsx
import React, { useCallback } from 'react';
import { Opaque } from 'type-fest';
import { useTranslation } from 'react-i18next';

type LocalizedString = Opaque<'LocalizedString', string>;

function createLocalizedString(s: string): LocalizedString {
    return s as LocalizedString;
}

interface ButtonProps {
  label: LocalizedString;
}

function Button(props: ButtonProps) {
  return <button>{props.label}</button>;
}

function useLocalizedTranslation() {
    const { t : originalTranslate } = useTranslation();

    const t = useCallback((key: string, defaultString: string) => {
        return originalTranslate(key, defaultString) as LocalizedString;
    }, [originalTranslate]);

    return { t };
}

function Example() {
    const { t } = useLocalizedTranslation();
    return (
        <>
            <Button label={t("test", "Test")} />
        </>
    );
}
```

[Playground example](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgMIoA25ARugNZwC+cAZlBCHAORSoacDcAKFCRYuOAHkwKAI74kjFmw6cYATzBIAtMySEYA4eGjw8RJABUoKAHaFyKGMAg3Frdlx7oYW4AEYADhskAA8DIUF1TTgAGQg0CmAALyQAEwBlGChgGwBzOABeSWk5JAAeTjiE8mS0zOy8zmx9BtyAPgjmfBsMZ1c0LxgkKsSUjKyc3IAKQgAuOBbJgEp5kZqx+sncQThduB4YfChXQjgUU7Xa8dahBkFhGyGoZnQFACF8GBgXAAU2MFOOB2cAcVCQ5FW8VGdQmeVu9y6PScLjgHy+LimYH+c1Rn2+Nj+EABS22uwOR1cZSoeJcbRwWKJhAAdKDwQwygB6anomwdQR3QSI3oo8yXMZWWz2Rx9KYkoF7OBoFz6cTwebQYC5HIUCV2BxDRRFcy6qXImyyiIKpV2eDwI3EMiUGhoWhTKa0JBqeaLPLYVJIF74cgwTZ5b2w3IkgptUkKvbk45wDVamw66x6xxId2ev0BlBBkMRknnWJQ9Ywm7A3YMbAAbWT2vIJv1SAAuktLfGkIdE3h4Ax4YLusLXABREIocDkLNyquK5WmOD9woEYhitLN6UYjtzhOuKZzhVlNqHuO7Mpo-EglBg8gFHAwKYAIiG+if2CfFj0MCfSyYHJPM9zwAucdwYIA)

Here we use `useTranslation` from `react-i18next` and wrap the `t` translation function that is returned to override the type it gives us.

Now when engineers go to use the Button component, they will know they need a LocalizedString, and the most straightforward way to get it will be to use the i18next utilities that we also provide.
