---
title: Extending the Domain of the Zeta Function
tags: ["mathematics"]
series: "Introduction to the Riemann Hypothesis"
---

In the previous article, we discussed the geometric series as an example of an infinite series that
has a closed form solution. We approached this as the inifinite series acting as the Taylor series
of that closed form solution:

$$
S(x) = 1 + x + x^2 + x^3 + ... = \frac{1}{1-x}
$$

What we skipped over however is that this is only true for the domain $|x| < 1$. If we try to evaluate this series for $x = 1$ we get:

$$
S(1) = 1 + 1 + 1 + 1 + ... = \infty
$$

And any value larger than 1 or less than -1 will result in a divergent series. The infinite series is only
convergent for values between -1 and 1, but the closed form solution is value for all real numbers except for $x = 1$.

Can we apply this domain expansion to other inifinite series? Let's take a look at the zeta function.

## The Riemann Zeta Function

Is it possible that the domain of the zeta function

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \dots
$$

is larger than just all numbers greater than 1?

Euler discussed in "Remarques sur un beau rapport entre les series des puissances tant directes que reciproques" a related function ot the zeta function, where the terms of the zeta function alternate in sign. He defined the series as:

$$
1 - \frac{1}{2^s} + \frac{1}{3^s} - \frac{1}{4^s} + \dots
$$

which we write in modern notation as the Alternating Zeta Function (or the Dirichlet Eta Function):

$$
\eta(s) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n^s} = 1 - \frac{1}{2^s} + \frac{1}{3^s} - \frac{1}{4^s} + \dots
$$

We note that this series is convergent for all $\Re(s) > 0$ without proof.

We can express the eta function in terms of the zeta function:

$$
\begin{align*}
\eta(s) & = 1 =- \frac{1}{2^s} + \frac{1}{3^s} - \frac{1}{4^s} + \dots \\
& = 1 + \frac{1}{2^s} + 2\frac{1}{2^s} + \frac{1}{3^s} - 2\frac{1}{4^s} + \dots \\
& = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \dots - 2\left(\frac{1}{2^s} + \frac{1}{4^s} + \frac{1}{6^s} + \dots\right) \\
& = \sum_{n=1}^{\infty} \frac{1}{n^s} - 2\sum_{n=1}^{\infty} \frac{1}{2n^s} \\
& = \zeta(s) - 2^{1-s}\zeta(s) \\
& = \zeta(s)(1 - 2^{1-s})
\end{align*}
$$

Rearranging the terms to write the zeta function in terms of the eta function, we get:

$$
\boxed{\zeta(s) = \frac{1}{1 - 2^{1-s}} \eta(s) \text{ for }
\Re(s) > 0 \text{ and } 1 - 2^{1-s} \neq 0.}
$$

The above equation extends the zeta function to the half-plane $\Re(s) > 0$. We have to remember though that

$$
1 - 2^{1-s} = 0
$$

has infinitely many solutions in the complex plane and not just the real solution of $s = 1$. For example, we have the complex solutions of $s = 1 + 2\pi i k$ for any integer $k$.

## The Critical Strip

This definition of the zeta function in terms of the eta function extends the domain of the function into what is known as the critical strip $0 < \Re(s) < 1$ of the complex plane. Since the leading term $1/(1 - 2^{1-s})$ is never zero in this domain, the zeta function and the eta function have the same zeros in this region.

In later articles we will show that Riemann's zeta function can be extended to the entire complex plane, and we will go into how the critical strip plays a role in the Riemann hypothesis and its impact on the Prime Number Theorem.