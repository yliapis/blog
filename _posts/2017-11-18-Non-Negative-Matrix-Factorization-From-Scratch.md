---
title: Non Negative Matrix Factorization

teaser: /assets/media/Non-Negative-Matrix-Factorization/NMF.png
---

# TODO:

* Add citations
* check math
* improve/edit writting

# Introduction

Non-negative matrix factorization (or NMF) is a method for factorizing a matrix into two lower rank matrices with strictly non-negative elements.

Given matrix $$X$$, find $$W$$ and $$V$$ such that

$$ X_{m \times n} \approx W_{m \times d}V_{d \times n} $$

Generally, $$d \ll \min(m,n)$$ is chosen.

# Intuition

Why would we want to do this? Let's assume $$X$$ represents a data matrix of m samples with n features. *We want to capture the underlying structure of the data.* There are many different ways to look at this algorithm.

Let's take into account the amount of elements:

$$ n_1 = |X| = m \times n $$

$$ n_2 = |W| + |V| = d \times (m+n) $$

In the majority of practical cases, $$ n_2 \ll n_1 $$. This equation implies a very fundamental aspect of NMF; we are compressing the data matrix $$ X $$. While we try to find an accurate representation of $$ X $$ as a product of $$ W $$ and $$ V $$, the two factorized matrices capture information about the underlying structure of the data.

Given $$ m $$ instances of $$ n $$ features, $$ W $$ can be interpreted as a feature matrix, whereas $$ V $$ can be interpreted as the coefficients matrix. Each row of $$ W $$

Due to the non-negativity constraint, the features are strictly additive. This property results in  sparse feature representations[cite], as well as one of NMF's core strengths: It automatically clusters the data. Unlike PCA which simply rotates the covariance matrix, NMF builds a sparse-basis representation of the data.

One original application of this algorithm was to detect additive objects in images [1]. An excerpted image from the paper is shown below.

![Image](/assets/media/Non-Negative-Matrix-Factorization/Faces.png)

It is immediately apparent that the rightmost matrix of images is capturing facial features. Common patterns such as eyebrows, eye shadows, lips, and facial outlines are being detected and stored by the algorithm with no context other than a set of facial images. These facial features form the sparse additive basis with which faces can be reconstructed.

# Algorithm

Unfortunately, this is a non-convex optimization problem. There are multiple different solutions given there is not one, but two matrices to optimize. Different constrains are often added to narrow the solution space.

We will explore one of the more common approaches: Minimizing the $$ L_2 $$ norm between the original and reconstructed dataset.

$$ \operatorname*{arg\,min}_{W,V} {\|}{X - W V}{\|}_2 $$




# Experiments



# References

[1] Lee, D. D. & Seung, H. S., "Learning the parts of objects by non-negative matrix factorization", Available: http://www.columbia.edu/~jwp2128/Teaching/E4903/papers/nmf_nature.pdf
[2] Lee, D. D. & Seung, H. S., "Algorithms for Non-negative Matrix Factorization", Available: http://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf
