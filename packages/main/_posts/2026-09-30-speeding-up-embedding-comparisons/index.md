---
title: Speeding Up Embedding Comparisons
tags: [performance, architecture, scaling, programming]
---

As I was reading through the Petar Maymounkov and David Mazières paper ["Kademlia: A Peer-to-peer Information System Based on the XOR Metric"](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf), I was interested in the application of this XOR metric on work I had previously done on [clustering embeddings](/blog/post/2023-07-01-fast-embedding-lookingup). When implementing the Infer API for Clarity Hub, we focused on using the distance between vectors as a way to cluster utterances together into a topic. We did this via [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between vectors, which we had to compare against all other vectors within the space.

<!--truncate-->

$$
d(p,q)=\sqrt{\sum_{i=1}^{n}(p_i-q_i)^2}
$$

Since we were comparing the magnitude of the distance, we removed the square root from the calculation:

$$
(d(p,q))^2=\sum_{i=1}^{n}(p_i-q_i)^2
$$

Sorting by $d^2$ gives the same ordering as sorting by $d$.

Computing a Euclidean distance between all the pairs of embeddings is rather computationally expensive, even if we remove the square root from the operation. Is there a way we could speed this up?

## The XOR Distance

In the Kademlia paper, the XOR distance is used to compare two bit strings, $p$ and $q$.

$$
X(p,q)=p\oplus q
$$

The result of this XOR is interpretted by Kademlia as an integer. Identical bit-strings have a value of $0$, while differences in increasingly significant bits produce increasingly larger values. For example, here is the result of two identical bit-strings:

| | Bit string |
|---|---|
| $p$ | `10110110` |
| $q$ | `10110110` |
| $p \oplus q$ | `00000000` |
| XOR distance | `0` |

Likewise, if $p$ and $q$ were compliments of each other, every bit in their XOR result would be $1$. For an 8-bit value, that gives an integer value of the maximum possible size of $255$:

| | Bit string |
|---|---|
| $p$ | `10110110` |
| $q$ | `01001001` |
| $p\oplus q$ | `11111111` |
| XOR distance | $255$ |


The XOR distance has some interesting properties that are similar to the Euclidean metric:

- The order of $p$ and $q$ does not matter - XOR distance is symmetric.
- The output of $p$ XOR $q$ is always the same - XOR distance is deterministic.
- It satisfies the triangly inequality.

These properties allow XOR distance to define a consistent notion of closeness that is used in Kademlia's identifier space. For our purposes, there is one property the XOR Distance gives that is useful in the Kademlia paper, but is counter to our purposes for vector similarity. Higher-order bits in the bit-string (those farther "left") can radically change the XOR distance. This behavior is useful in Kademlia because it organizes nodes according to common identifier prefixes, but is undesirable in our case where every dimension of the embedding vector should contribute equally.

Instead of looking at the result of the XOR as an integer, we can look at the number of 1 bits in the result – called the "population count" or $popcount$.

## The Hamming Distance

The Hamming distance between two bit-strings is the number of bits that differ, and we use the following definition:

$$
X(p,q)=p\oplus q
$$

and

$$
d_H(p,q)=\frac{\operatorname{popcount}(X(p,q))}{n}
$$

where `n` is the number of bits. `popcount` is the “population count” of how many 1s are in the bit string. By dividing by the number of bits, we normalize the Hamming Distance.

For example, if we have two bit-strings p and q that are the same, then the Hamming distance will be 0 between them:

| | Bit string |
|---|---|
| $p$ | `10110110` |
| $q$ | `10110110` |
| $p \oplus q$ | `00000000` |
| popcount | `0` |
| normalized Hamming distance | $0/8=0$ |

That normalized distance ranges from 0 to 1. And if we have bit strings that are compliments, then the normalized Hamming distance will be 1:


| | Bit string |
|---|---|
| $p$ | `10110110` |
| $q$ | `01001001` |
| $p \oplus q$ | `11111111` |
| popcount | `8` |
| normalized Hamming distance | \(8/8=1\) |


We only have one more hurdle to computing the Hamming distance between embeddings.

## Converting Embeddings to Bit Strings

Embeddings are vectors of floats, and can be fairly high dimensionality. We need a deterministic, yet fast way to convert an embedding from a vector of floats into bit-strings that we can XOR. Naively XOR’ing the floats would not be useful since similar float values can have a fairly large distance between their IEEE-754 representation as bits:

```jsx
0.73 → 00111111001110101110000101001000
0.72 → 00111111001110000101000111101100
```

What we can do instead is apply a technique called a SimHash. For an embedding $x$ of dimension $d$, we pre-compute a matrix $R$ with rows $k$ by $d$ columns that are filled with random values. Each row of this matrix is called a "random-hyperplane" and ultimately produces on bit of our binary representation.

Then we apply the following transformation:

$$
b_i =
\begin{cases}
1 & r_i \cdot x \ge 0 \\
0 & r_i \cdot x < 0
\end{cases}
$$

I won’t go into the specifics of why the SimHash works, but there is an important property of random-hyperplane hashing worth noting. If two vectors $p$ and $q$ have an angle $\theta$ between them, the probability that the transform gives them different bits is $\theta$ over $\pi$. Generally this transformation preserves cosine similarity between all the vectors.

This does not exactly preserve the euclidean distances we originally looked at. Instead it produces a probabilistic approximation. In the case of Universal Sentence Encoder embeddings, they are approximately normalized. And for unit-normalized vectors, the Euclidean distance is directly related to the cosine similartity.

This means that Euclidean distance, cosine similarity, and angular distance produce the same ordering for unit vectors. Our transformation from the Universal Sentence Encoder embedding into a bit-string representation will lose some of this ordering information, but generally will produce similar ranking for our next steps.

The Universal Sentence Encoder produces 512-dimensional embeddings. If we generate a random matrix of size 256 by 512, applying the transformation gives us a 256-bit binary represenation of each embedding. We apply the same transformation to all our embeddings.

For example, let’s work with an embedding of dimension 3:

$$
x=
\begin{bmatrix}
0.8\\
-0.2\\
0.5
\end{bmatrix}
$$

And we choose a random projection matrix whose four rows define four hyperplanes:

$$
R=
\begin{bmatrix}
1 & -1 & 1\\
-1 & 1 & 1\\
1 & 1 & -1\\
-1 & -1 & 1
\end{bmatrix}
$$

Multiplying the projection matrix by our embedding gives:

$$
Rx=
\begin{bmatrix}
1.5\\
-0.5\\
0.1\\
-0.1
\end{bmatrix}
$$

And using our simple transformation, we get the following table of bits from the projection:

| Projection | Value | Bit |
|---|---:|---:|
| $r_1\cdot x$ | 1.5 | 1 |
| $r_2\cdot x$ | -0.5 | 0 |
| $r_3\cdot x$ | 0.1 | 1 |
| $r_4\cdot x$ | -0.1 | 0 |

Giving the final bit-string of `1010`.

## What would we gain?

By turning the embedding from a vector of floats into a bit-string, we can substantially reduce the size. Universal Sentence Encoder produces a 512-dimensional embedding using 32-bit floating-point values. The original embedding therefor requires 512 x 32 = 16,384 bits. After the transformation, we require only 256-bits. That’s a substantial memory savings, especially given that we need to typically load a large chunk of these embeddings into memory to do clustering calculations.

As for computational performance, the transformation from floating point numbers into the bit-string is not free. We need to perform 512 x 256 operations – about 131000 operations – to transform a new utterance.

If there are N existing embeddings, inserting a new embedding requires roughly:

$$
\text{Euclidean: } O(512N)
$$

For the binary representation, let $C$ be the one-time cost of creating the projection. A 256-bit value can be represented as four 64-bit machine words, giving:

$$
\text{Binary: } C + O(4N)
$$

As N grows, the fixed projection cost becomes increasingly small relative to the cost of comparing all the embeddings. Each Euclidean comparison checks 512 floating-point dimensions, while the normalize Hamming distance only needs to check 4 64-bit words. This article is all a hypothetical in terms of the savings, so I would like to run a real experiment of this to see how much of a real-world speedup would be seen.

The final trade-off is that the 256-bit representation is also an approximation of the original embedding geometry. For clustering, a real-world experiment would need to be run in order to check for the accuracy of such a transformation, especially near the boundaries of clusters.

Lastly, the work noted here is not novel, and there must be research published that touches on these types of transformations and how much performance versus accuracy is produced.

Other references

- [XOR Distance in Kademlia](https://rfong.github.io/rflog/2022/04/09/xor-distance-kademlia/)
- [Bitwise and Otherwise: Understanding XOR Distance](https://dev.to/lovestaco/bitwise-and-otherwise-understanding-xor-distance-1kh8)
- [Semantic Similarity with TF Hub Universal Encoder](https://www.tensorflow.org/hub/tutorials/semantic_similarity_with_tf_hub_universal_encoder)