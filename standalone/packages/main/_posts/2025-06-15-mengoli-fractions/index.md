---
title: "Petri Mengoli Fraction Inequality"
tags: ["mathematics", "translation"]
---

In my previous post, ["On the Addition of Fractions, by Petri Mengoli"](/blog/post/2025-03-16-on-the-addition-of-fractions), I
wrote that the following inequality holds, with no proof<!--truncate-->:

$$
\frac{1}{1-n} + \frac{1}{n} + \frac{1}{n + 1} > \frac{3}{n}
$$

If we don't assume a specific value for the numerator of the right hand side of the
inequality, we can derive the inequality by starting with

$$
\frac{1}{1-n} + \frac{1}{n} + \frac{1}{n + 1} > \frac{a}{n}.
$$

Multiply through by $n$:

$$
\frac{n}{1-n} + \frac{b}{n + 1} + 1 > a.
$$

Set a common denominator for the left hand side:

$$
\frac{n(n+1) + n(n-1)}{(n-1)(n+1)} > a - 1
$$

Expanding the expression

$$
\frac{n^2 + n + n^2 - n}{n^2 - 1} > a - 1
$$

And simplifying

$$
\frac{2n^2}{n^2 - 1} > a - 1
$$

We notice that when $|n| > 1$, the left hand side of the expression is always positive.

If we let $n\to\infty$, then we see that

$$
\lim_{n\to\infty} \frac{2n^2}{n^2 - 1} \overset{\mathrm{H}}{=} \lim_{n\to\infty} \frac{4n}{2n} = 2
$$

through the use of L'Hospital's rule. We find that as $n\to\infty$, the value of n is always positive and a value greater than 2.

If we slightly re-arrange, we find the following:

$$
\frac{2n^2}{n^2 - 1} + 1 > a
$$

And now knowing that the left hand side approaches 3 from above as $n\to\infty$, we know
that $a$ can be set to $3$ as the largest value that still satisfies the expression.

Hence, we find that the original inequality posited holds.
