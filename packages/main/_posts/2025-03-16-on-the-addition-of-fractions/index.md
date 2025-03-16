---
title: "On the Addition of Fractions, by Petri Mengoli"
tags: ["mathematics", "translation"]
---

I was researching the origin of the Basel problem to write a short blog post about
how Euler approached the problem (only to get beaten by [anime characters talking
about it](https://www.youtube.com/watch?v=jmtiWGnj5os)).<!--truncate--> I however wanted to
dive deeper into the context of why Euler wanted to even approach this problem,
so I investigated the work of Petri Mengoli.

The publication of his work “On the Addition of Fractions” is available via the
[Internet Archive in its original Latin](https://archive.org/details/bub_gb_PrKgVx1LcUUC/mode/1up).
Petri Mengoli’s work focuses on the harmonic series in the preface and shows
that it diverges. The harmonic series is written in modern notation as:

$$
\sum_{n=1}^{\infty} \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \ldots
$$

His proof relies on finding groupings of fractions that sum greater to one
(which his paper refers to as “unity”). First, look at the first 3 terms after
“unity”: $1/2 + 1/3 + 1/4$. When added, we see that when we set common denominators:

$$
6/12 + 4/12 + 3/12 = 13 / 12 > 1
$$

And in fact, for any three terms:

$$
\frac{1}{n - 1} + \frac{1}{n} + \frac{1}{n+1} > \frac{3}{n}
$$

Next Mengoli shows that there is another group of fractions that adds up to
greater than one, and another set of fractions after that set that also adds up
to one. He demonstrates that for any given number, there is a finite set of
fractions that can be added to get a value greater than that. Therefore the
series must diverge.

His approach here is inspired by Archimedes’ "Quadrature of the Parabola",
and focuses on using the “method of exhaustion”, rather than manipulating
infinite series or dealing with limits.

From this work, comes the original quote of what became known as the Basel
problem:

> Ab huius fractionum dispositionis contemplatione feliciter
expeditus, ad aliam progrediebar dispositionem, in qua
singulæ unitates numeris quadratis denominantur.
Hæc speculatio fructus quidem laboris rependit, nondum tamen
effecta est solvendo, sed ingenii ditioris postulat adminiculum,
ut præcisam dispositionis, quam mihimetipst proposui, summam
valeat reportare.
>

Roughly translating to:

> Having successfully concluded my contemplation of this arrangement
of fractions, I proceeded to another arrangement, in which
each unit is denominated by square numbers.
This speculation indeed rewards labor with fruit, but it has not
yet been completed in solving and demands the assistance of
greater ingenuity so that the precise sum of the arrangement
I proposed to myself may be recovered.
>

This is the work that perhaps sparked the inspiration for Eulers proof that the
sum of the reciprocal of the squares adds up to $\pi^2 /6$ . Euler required much
more advanced mathematics and insight in order to come up with this equality, and
he revisited the sum in multiple letters with slightly different arguments to
validate his work.

For a full write up on this, see my self-published work here: [PDF Download](/docs/on-the-addition-of-fractions.pdf).
