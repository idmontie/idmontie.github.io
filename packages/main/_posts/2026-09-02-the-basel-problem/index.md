---
title: "The Basel Problem"
tags: ["mathematics"]
---

When we last looked at the [On the Addition of Fractions](/blog/post/2025-03-16-on-the-addition-of-fractions), I covered a proof
that the harmonic series<!--truncate-->:

$$
\sum_{n=1}^{\infty} \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \ldots
$$

divereses. The obvious next question is do similar sums converge or diverge? In 1650, Petri Mengoli proposed the
following problem in his "Novae quadraturae arithmeticae" series:

> Find the sum of the series:
>
> $$
> \frac{1}{1^2} + \frac{1}{2^2} + \frac{1}{3^2} + \cdots
> $$

We can calculate some of the partial sums to see how quickly it grows:

$$
\begin{align*}
\frac{1}{1^2} & = 1 \\
\frac{1}{1^2} + \frac{1}{2^2} & = 1.25 \\
\frac{1}{1^2} + \frac{1}{2^2} + \frac{1}{3^2} & = 1.361111111111111 \\
\frac{1}{1^2} + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} & = 1.423611111111111 \\
\end{align*}
$$

It is clear that the sum grows, but if we sum the first $n$ terms, we get:

| First $n$ terms | Sum               |
| --------------- | ----------------- |
| 10              | 1.549767731166541 |
| 100             | 1.634983900184893 |
| 1000            | 1.643934566681561 |
| 10000           | 1.644834071848065 |
| 100000          | 1.644923078134810 |
| 1000000         | 1.644932078134810 |

The sum seems to not grow indefinitely like the harmonic series, and seems to converge to some value. When summing
the terms individually, we find that it converges extremely slowly. By Euler's time in 1734, it was already known that
ths sum converged to a value, but there was no known closed-form expression for the sum. A closed-form expression
is one that can be written as a finite number of operations. The open question of whether there was a closed form for the sum, became known as the Basel problem in honor of Euler's home city since he was the one who discovered the solution to the problem.

Let's cover a few tricks that Euelr would have already known from his many other discoveries and mathematical research. First, we know that some infinite series have closed forms, in particular, we know that the geometric series has a closed form:

$$
S = \frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots = \sum_{n=0}^{\infty} x^n
$$

We can verify this using another technique known in Euler's time, called Taylor series expansion:

$$
f(x) = f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
$$

Let $a = 0$ and $f(x) = 1 / (1 - x)$, then we see:

$$
\begin{align*}
f'(x) = \frac{1}{(1-x)^2} \\
f''(x) = \frac{2}{(1-x)^3} \\
f'''(x) = \frac{6}{(1-x)^4} \\
\vdots
\end{align*}
$$

And evaluating these derivatives at $x = 0$, we get:

$$
\begin{align*}
f'(0) = 1 \\
f''(0) = 2 \\
f'''(0) = 6 \\
\vdots
\end{align*}
$$

So the Taylor series expansion of $1 / (1 - x)$ around $x = 0$ is:

$$
\boxed{\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots = \sum_{n=0}^{\infty} x^n}
$$

Euler's approach in his 1734 letter was similar to this techique, but insted of looking at $1 / (1 - x)$, he looked at the
$\sin$ function instead. The Taylor series expansion of $\sin(x)$ would have been known to Euler and is easily derived from
the Taylor series definition we provided above. The expansion is:

$$
\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots
$$

We will divide each side by $x$ to make a step later in this post easier to follow:

$$
\frac{\sin(x)}{x} = 1 - \frac{x^2}{3!} + \frac{x^4}{5!} - \frac{x^6}{7!} + \cdots
$$

So far, we have focused on Taylor series expansion, where we change how we represent a function in terms of a series of
powers of $x$. Another technique known at the time was thinking of polynomials as being defined by their roots. If we
have a n-degree polynomial:

$$
p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0
$$

Then we can write it in terms of its roots $r_1, r_2, \cdots, r_n$:

$$
p(x) = a_n (x - r_1) (x - r_2) \cdots (x - r_n)
$$

Where $r_1, r_2, \cdots, r_n$ are the roots of the polynomial.

This begs the question: can we use a similar technique with other functions? Euler seemed to think that since $\sin$ could
be written as an infinite polynomial, then we could use a similar technique to write $\sin$ in terms of its roots. This technique would not be formally proven until centuries later by Karl Weierstrass. Without Weierstrass's work, we will have to consider Euler's argument as less than rigorous.

Euler made the leap that if a polynomial function is equal to the product of its roots, then he could define $sin(x) / x$ as an infinite product:

$$
\frac{\sin(x)}{x} = (1 - \frac{x}{\pi})(1 + \frac{x}{\pi})(1 - \frac{x}{2\pi})(1 + \frac{x}{2\pi})(1 - \frac{x}{3\pi})(1 + \frac{x}{3\pi}) \cdots
$$

If we begin to expand this product, multiplying the first term across the rest, we get:

$$
\frac{\sin(x)}{x} = 1 - \frac{x^2}{\pi^2} - \frac{x^2}{4\pi^2} - \frac{x^2}{9\pi^2} + \cdots
$$

And we collect the terms with $x^2$ together, we get:

$$
\frac{\sin(x)}{x} = 1 - x^2(\frac{1}{\pi^2} + \frac{1}{4\pi^2} + \frac{1}{9\pi^2} + \cdots) - \cdots
$$

Now we can compare the coefficient of $x^2$ in this representation to the coefficient of $x^2$ in the Taylor series expansion of $\sin(x) / x$:

$$
\frac{1}{\pi^2} + \frac{1}{4\pi^2} + \frac{1}{9\pi^2} + \cdots = \frac{1}{3!}
$$

And multiplying both sides by $\pi^2$ we get:

$$
\boxed{1 + \frac{1}{4} + \frac{1}{9} + \cdots = \frac{\pi^2}{6}}
$$

Euler showed that the Basel problem has the closed form of $\pi^2 / 6$.

Euler would go on to make his proof more rigorous in letters in 1741, 1745, and 1755, but the core idea is the same. He continued to investigate similar sums with powers up to $n=10$ and found that the values were all rational multiples of
powers of $\pi$.

Later, a more formal equation for the values of positive even integers was discovered and is given by the formula:

$$
\zeta(2n) = \sum_{k=1}^{\infty} \frac{1}{k^{2n}} = \frac{(-1)^{n+1} B_{2n} (2\pi)^{2n}}{2(2n)!}
$$

Where $B_{2n}$ are the Bernoulli numbers.

The general form of the function that Euler studied is known as the zeta-function and is defined as:


$$
\zeta(s) = \sum_{k=1}^{\infty} \frac{1}{k^s} = \frac{1}{1^s} + \frac{1}{2^s} + \frac{1}{3^s} + \cdots
$$

This function is very well studied and has many interesting properties relating to prime numbers and the distribution of primes. Even with all of the research done on this function, there are still two still open questions related to the zeta function:

$$
\boxed{\text{Is Apéry's constant $\zeta(3)$ transcendental?}}
$$

and

$$
\boxed{\text{Are all odd values of the zeta function transcendental?}}
$$

Where a transcendental number is a number that is not algebraic, meaning it is not a solution to any polynomial equation with rational coefficients.

The Basel problem is a simple problem that can be solved using a few tricks that Euler already knew from his many other discoveries and mathematical research. It is a beautiful example of how mathematics can be used to solve problems and how different techniques can be used to solve the same problem.
