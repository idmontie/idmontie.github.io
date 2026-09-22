---
title: Invariants and Type Systems
tags: ["typescript", "react"]
---

My philosophy when designing APIs and libraries is to make it as easy to use as possible, but as difficult to use INCORRECTLY as possible. When I used to make plugins with jQuery, there would often be guards on functions to ensure that the data passed in met the function's expectations:

```
function addToCart(itemId, count) {
  assert(typeof count === 'number', 'Count must be a number');
  assert(count > 0, 'Count must be greater than 0');
  assert(count < 10000, 'Count must be less than 10000');
  assert(typeof itemId === 'string', 'ItemId must be a string');
  // ...
}
```

The `addToCart` function has guards to check several **preconditions** that must be met before the function can run. This preserves the **invariants** expected by the rest of the system.

With TypeScript, we can use the type system to encode these preconditions as types:

```
type PositiveNumber = Tagged<number, 'PositiveNumber'>;
type MaximumCartNumber = Tagged<number, 'MaximumCartNumber'>;
type ItemId = Tagged<string, 'ItemId'>;
```

And we can validate via:

```
function positiveNumber(value: number): PositiveNumber {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('value must be a positive number');
  }

  return value as PositiveNumber;
}

function maximumCartNumber(value: number): MaximumCartNumber {
  if (!Number.isInteger(value) || value >= 10000) {
    throw new Error('value must be less than 10000');
  }

  return value as MaximumCartNumber;
}
```

Now `addToCart` doesn't need to repeat those guards, the validation happens when the domain types are created, and we can allow
the type system to enforce the invariants at compile time.

```
function addToCart(itemId: ItemId, count: PositiveNumber & MaximumCartNumber) {
  // ...
}
```

> Make it impossible to create invalid states via the type system.

Once a value has been validated into a `PositiveNumber`, passing a negative number to `addToCart` is no longer representable without explicitly circumventing the type system.

## React Components

Let’s extend the philosophy to React components. Before TypeScript, React components commonly enforced these constraints in two places: with propTypes and with runtime guards inside the component:

```
class CartCount extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired;
  }

  render() {
    const { count } = this.props;

    if (typeof count !== 'number' || count < 0) {
      return null;
    }

    // ...
  }
}
```

This works for simple components, but as additional logic is added to the component, it becomes less clear where these guards belong
and whether every code path preserves the invariant.

With TypeScript, we can use the type system as the guard:

```tsx
export function CartCount({ count }: { count: PositiveNumber }) {
    return <div>{count}</div>;
}
```

The rule here can be best described as:

> Prefer domain types over primitives.

Need to ensure that the string passed to a function is a URL? Create a `Tagged` type to represent a `URLString`, and add utilities to create the type or assert the type.

Want to enforce that a string passed to a component is translated? Don’t use the raw `string` type, use a `LocalizedString` `Tagged` type that your translation functions return instead. I’ve written about tagged types before, particularly for [localization]((https://idmontie.github.io/blog/post/2023-08-19-localization), because they are an effective way to encode domain constraints.

## Polymorphic Components

Design-system components often require different sets of props depending on how the component is used. For a concrete example, let’s use a Card component. By default, a card is just a visual container for information:

```
interface BaseCardProps {
  children: JSX.Element;
}
```

But there are times we want it to be clickable:

```
interface ClickableCardProps extends BaseCardProps {
  readonly label: LocalizedString;
  readonly onClick: () => void;
  readonly href?: never;
}
```

Or we may want it to behave like a link:

```
interface LinkCardProps extends BaseCardProps {
  readonly label: LocalizedString;
  readonly href: URLString;
  // Optional onClick, whereas the ClickableCard must ALWAYS have an onClick
  readonly onClick?: () => void;
  readonly target?: '_self' | '_blank';
}
```

We can represent these props and still enforce the correct prop usage:

```
type CardProps = ClickableCardProps | LinkCardProps;
```

A Card can never be an ambiguous combination of both a clickable and a link card at the same time.

> Don’t allow ambiguous combinations of component props.

We encode this information with the type system via a union of mutually exclusive prop shapes that TypeScript can narrow within the component.

Here is a more advanced example that demonstrates how tagged types can be used to enforce invariants.
We define a `PositiveNumber` and `EvenNumber` tagged types, and then use them to enforce that a number is both positive and even.

```jsx
function invariant(condition: boolean, message: string): asserts condition {
  const isProduction = false; // process.env.NODE_ENV === 'production';

  if (!condition) {
    console.error(message);
    console.trace();

    // When not in production, we throw an error.
    if (!isProduction) {
      throw new Error(message);
    }
    return;
  }
}

declare const positiveBrand: unique symbol;
declare const evenBrand: unique symbol;
type PositiveNumber = number & { [positiveBrand]: 'PositiveNumber' };
type EvenNumber = number & { [evenBrand]: 'EvenNumber' };

function assertPositiveNumber(value: number): asserts value is PositiveNumber {
  invariant(value > 0, `Value ${value} must be positive`);
}

function assertEvenNumber(value: number): asserts value is EvenNumber {
    invariant(value % 2 === 0, `Value ${value} must be even`);
}

function assertPositiveEvenNumber(value: number): asserts value is (PositiveNumber & EvenNumber) {
    assertPositiveNumber(value);
    assertEvenNumber(value);
}

function multiplyPositiveEvenNumbers(value: PositiveNumber & EvenNumber): PositiveNumber & EvenNumber {
    // TypeScript cannot infer that multiplication preserves these tagged invariants.
    // But we know that when we multiply a positive even number by 2, the result is still a positive even number.
    return value * 2 as (PositiveNumber & EvenNumber);
}

const valueTwo = 2;
assertPositiveEvenNumber(valueTwo);
const result = multiplyPositiveEvenNumbers(valueTwo);
console.log(result); // 4

// Throws an error: Value -2 must be positive
const valueNegativeTwo = -2;
assertPositiveEvenNumber(valueNegativeTwo);
multiplyPositiveEvenNumbers(valueNegativeTwo);

// Throws an error: Value 5 must be even
const valueFive = 5;
assertPositiveEvenNumber(valueFive);
multiplyPositiveEvenNumbers(valueFive);

```
