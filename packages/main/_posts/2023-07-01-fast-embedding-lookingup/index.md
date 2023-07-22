---
title: Fast Similar Embedding Lookup
---

While working on the Clarity Hub NLP API, we had a common use-case where we would create embeddings from text, and use those embedding to determine cosine similarity with other embeddings. Doing this required loading all of the embeddings in-memory and then computing cosine similarity with the entire dataset. As the dataset grew, this operation would get incredibly slow.

We worked on a fast way to do these lookups using ranges that can be performed in any database. This approach was never implemented, but we worked on multiple proof-of-concepts to test out our ideas. The goal was to take an input text, compute an embedding, load the entire embedding datasets loaded into an AWS lambda, find the most similar set of vectors, and return the top N similar vectors in one use-case. To tackle that, we came up with the following idea.

Given a vector A, compute is similar to a unit vector U of the same dimension as A. So:

```cpp
dim(U) = dim(A)
```

And

```cpp
S_u = cos(θ) = A · U / ||A|| x ||U||
```

Where S_u is the similarity with the unit vector. The unit vector just needs to be the same across all samples.

For each embedding, store the calculated S_u.

If we want to find similar vectors for a new vector B, then we compute is similarity to the unit vector.

Then, we can query the database for vectors within an interval of `[S_u - ε, S_u + ε]` . This will give us a subset of the dataset that have similar similarities with the unit vector.

We can re-query increasing or decreasing ε until the top N results are found.

To further improve accuracy, we can also re-compute the similarity score using cosine similarity with the subset of vectors, which is still much faster then computing the similarity against the entire dataset.

This approach begins to break down as the cosine similarity to the unit vector chosen gets very large (`> 0.4`).  We end up with the possibility of matching against vectors that are of opposite directions – the least similar vectors to the original input vector.

One solution to workaround this could be to pre-compute the similarity of a vector against unit vectors for each dimension of the input vector. But this could be 512 or more cosine similarity calculations for modern embeddings just to precompute the data. Once all unit vector similarities are calculated and stored, the range query against the database would be made against the column for which the input vector’s similarity is closest to 0.

There are a lot of real solutions to this problem, but this was a fun exercise to think about and work on.

## Further reading

Vector similarity search is becoming increasingly popular and integrated into databases. Here are some resources to learn more: [Vector Similarity Search](https://zilliz.com/blog/vector-similarity-search).
