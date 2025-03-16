---
title: "APIs, Complexity, and Surfaces"
tags: ["programming", "apis"]
---

Maintaining growing software is challenging. Poorly architected APIs and
incorrect abstractions can significantly impact the ability for engineering
teams to deliver new features in a timely manner. If we consider an
API's complixty as being a significant contributor to its overhead,
maintainability, and ease of use, then it becomes a question of how
do we best measure this complexity so that we can make informed decisions
about how to refactor and improve our APIs.

<!--truncate-->

We will consider an API as an abstract set of functions, each with a
defined set of input parameters and outputs. An API can represent a library,
an interface, or a set of functions in a design system.

## An API as a Surface

A good API minimizes the complexity that a consumer needs to understand
in order to use it. If we think o fan  API as an abstract two dimensional
surface, then the complexity of the internals of the API - all the code
that is required to implement the API - is the area of that surface.
The API that is exposed as functions, input parameters, and outputs is
the perimeter of that surface. This follows from the conscept that an
API should act as a "black box" - the consumer should not need to know
how the API is implemented in order to use it.

From this metaphor, we can also think of the "best" API as one that
minimizes the perimeter of the surface while maximizing the necessary
area of the surface.

## The Complexity of a Surface

The percieved complexity of an API can be influenced by the number of functions,
the numbner of parameters, and the number of return values.

We will not be considering the internal state of the services that consumers
may need to manage. Instead, we will focus on "idempotent" functions - those
that do not have side effects and do not require any state to be managed.

Abstractly, we can denote the API Surface $S$ as a set of functions $f_i$,
where the complexity of each function $f_i$ is given by $c(f_i)$, and the
overall complexity of the surface is given by:

$$
C(S) = \sum_{i=1}^{n} c(f_i)
$$

where $n$ is the number of functions in the surface.

As we increase the number of functions in the surface, the complexity of the
surface is also expected to increase.

## The Complexity of a Function

The complexity of a function $f_i$ can be influenced by the number of input
parameters, their values, and the number of return values.

Take for example a function $f(x: boolean): boolean$ that takes a single
boolean input and returns a boolean value. The complexity of this function
is relatively low - there are only two possible input values and two possible
output values.

If we jump to a function $f(x: boolean, y: boolean, z: boolean): boolean$
then the complexity of this function is higher - there are now $2^3 = 8$
possible input values and two possible output values.

As we increase the number of input parameters, we increase the number
of combinations of input values that the function can accept. This
increases the complexity of the function:

$$
c(f_i) = \prod_{p} |p| + |r|
$$

where $p$ is the set of input parameters, $r$ is the set of return values,
and $|p|$ is size of the set of input parameters and $|r|$ is the size of
the set of return values. By "size" we  mean the number of "meaningful"
values that a parameter type has. For example, a boolean has two meaningful,
but an integer may have an infinite range of non-meaningful values. In some
languages, like C, it is common for an integer to have meaningful values
of -1 and 0, and non-meaningful values of all other integers. In the case where
the integer is simply a number, we would consider the size of the parameter
to be 1, while the size of a C-like integer to be the number of "special" cases
the integer has.

Aaron Luu, in his article [Don't use boolean](https://www.luu.io/posts/dont-use-booleans)
alludes to this exponential potential for complexity when using boolean
values.

## Tests as Consumers

Interestingly, the test for an API already act as a consumer and can demonstrate
the complexity of an API as it stives to cover all possible branches and use-cases.
For our function with 3 boolean inputs, we would need to write 8 tests to cover
all possible input combinations. A suite of tests that check tons of combinations
of inputs and outputs is a good indicator that the API is complex.

## Techniques for Reducing Complexity

This is by no means an exhaustive list, but here are some techniques that
can help reduce complexity.

First is to identify if the parameters are truly independent. For example, let's take
the example:

```
f(x: boolean, y: Data | undefined): boolean
```

If the value of $y$ is only meaningful when $x$ is true, then we can consider
$y$ to be a dependent parameter. If we write out a matrix of possible inputs:

- x: true, y: Data
- x: false, y: Data
- x: true, y: undefined
- x: false, y: undefined

We can see that the value of $y$ is only meaningful when $x$ is true.

When we have dependent parameters, we can consider using the type-system to
help us manage the complexity. For example, we could just simplify the
function to allow only valid inputs:

```
f(x: Data | false): boolean
```

Depending on the values of Data, this simplifies the complexity of the function by
half.

Another technique is to consider reducing boolean inputs to a single enum-like
input type. For example, simplifying 3 boolean parameters into a single
enum-like parameter:

```
f(x: 'all'  | 'none' | 'some'): boolean
```

This reduces the number of possible input combinations from 8 to 3.

## Conclusion

This is one simple way to measure the complexity of an API, which shows
that the bigger the surface area, the more complex the API. The majority
of this complexity comes from thee combinations of input parameters and
return values. By reducing the number of input parameters and return values,
we can reduce the complexity of the API.

This is by no means the only way to measure the complexity of an API, but
it is a useful way to think about the complexity of an API in terms of
the number of possible input and output combinations.