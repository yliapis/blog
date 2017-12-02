---
title: Non Negative Matrix Factorization

teaser: /assets/media/Non-Negative-Matrix-Factorization/NMF.png
---

# TODO:

* Add citations
* check math
* improve/edit writting

# Introduction

The purpose of this post is to give a simple explanation of a powerful feature extraction technique, non-negative matrix factorization.

Non-negative matrix factorization (or NMF) is a method for factorizing a matrix into two lower rank matrices with strictly non-negative elements.

Given matrix $$\mathbf{X}$$, find $$\mathbf{W}$$ and $$\mathbf{V}$$ such that

$$ \mathbf{X}_{m \times n} \approx \mathbf{W}_{m \times d}\mathbf{V}_{d \times n} $$

Generally, $$d \ll \min(m,n)$$ is chosen.

# Intuition

Why would we want to do this? Let's assume $$X$$ represents a data matrix of m samples with n features. *We want to capture the underlying structure of the data.* There are many different ways to look at this algorithm.

Let's take into account the amount of elements:

$$ n_1 = |\mathbf{X}| = m \times n $$

$$ n_2 = |\mathbf{W}| + |\mathbf{V}| = d \times (m+n) $$

In the majority of practical cases, $$ n_2 \ll n_1 $$. This equation implies a very fundamental aspect of NMF; we are compressing the data matrix $$ \mathbf{X} $$. While we try to find an accurate representation of $$ \mathbf{X} $$ as a product of $$ \mathbf{W} $$ and $$ \mathbf{V} $$, the two factorized matrices capture information about the underlying structure of the data.

Given $$ m $$ instances of $$ n $$ features, $$ \mathbf{W} $$ can be interpreted as a feature matrix, whereas $$ \mathbf{V} $$ can be interpreted as the coefficients matrix. Each row of $$ \mathbf{W} $$

Due to the non-negativity constraint, the features are strictly additive. This property results in  sparse feature representations[cite], as well as one of NMF's core strengths: It automatically clusters the data. Unlike PCA which simply rotates the covariance matrix, NMF builds a sparse-basis representation of the data.

One original application of this algorithm was to detect additive objects in images [1]. An excerpted image from the paper is shown below.

![Image](/assets/media/Non-Negative-Matrix-Factorization/Faces.png)

It is immediately apparent that the rightmost matrix of images is capturing facial features. Common patterns such as eyebrows, eye shadows, lips, and facial outlines are being detected and stored by the algorithm with no context other than a set of facial images. These facial features form the sparse additive basis with which faces can be reconstructed.

# Algorithm

Unfortunately, this is a non-convex optimization problem [2]. There are multiple different solutions given there is not one, but two matrices to optimize. Different constrains are often added to narrow the solution space. This is a very deep problem, so for the sake of argument, we will take a look at one of the techniques proposed by Lee & Seung [2]: let's minimize the $$ L_2 $$ norm of the residuals between the original and reconstructed dataset (essentially the mean square error).

$$ \operatorname*{arg\,min}_{\mathbf{W},\mathbf{V}} {\|}{\mathbf{X} - \mathbf{W} \mathbf{V}}{\|}_2 $$

We will use the multiplicative update rule proposed [2]. Below are the two update rules:

$$ \mathbf{W} \leftarrow \mathbf{W} \odot \frac{\mathbf{X} \mathbf{V}^T}{\mathbf{W} \mathbf{V} \mathbf{V}^T} $$

$$ \mathbf{V} \leftarrow \mathbf{V} \odot \frac{\mathbf{W}^T \mathbf{X}}{\mathbf{W} \mathbf{V} \mathbf{V}^T} $$

The proof is beyond the scope of this post; a more thorough explanation is available in the source paper [2]. The gist of this rule is that under certain assumptions, the $$ L_2 $$ norm of the residuals never increases under these updates. This approach is different from the traditional use of gradient decent, which uses an additive update scaled by a learning rate, rather than a multiplicative update. Note that there are many different ways to solve this problem, and most packages use highly optimized algorithms that will generally produce better results than the plain algorithm shown above. Nonetheless, we will stick with the basic update rules shown above for our experiments.

# Experiments

Since this is an unsupervised learning algorithm, let's try to reverse engineer an additive mixture of gaussians with fixed means, fixed variances, but *stochastic* amplitudes. Gaussian basis vectors were chosen to make visualization simpler; almost any arbitrary positive basis set could have been used. Each sample is a vector.

$$ \mathbf{x}_i = \displaystyle\sum_{k} \nu_{i,k} \mathbf{g}_k, \quad \nu_{i,k} \sim U(0,1)$$

$$ \mathbf{g}_{k}[l] = f( \mathbf{t}[l] | \mu_k, \sigma_k) $$

$$ \mathbf{g}_k $$ represents a gaussian, where $$ f $$ is the well known probability density function of a gaussian, and $$ \mathbf{t}[l] $$ represents the input to the pdf at index $$ l $$. Let's generate $$ k = 4 $$ basis vectors with 512 samples each. Below are the basis vectors chosen.

![Image](/assets/media/Non-Negative-Matrix-Factorization/Gaussians.png)

A few  samples generated are shown below.

![Image](/assets/media/Non-Negative-Matrix-Factorization/Gaussians2.png)



# Citation

Please cite this post using the BibTex entry below.

{}

# References

[[1](http://www.columbia.edu/~jwp2128/Teaching/E4903/papers/nmf_nature.pdf)] Lee, D. D. & Seung, H. S., "Learning the parts of objects by non-negative matrix factorization"

[[2](http://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf)] Lee, D. D. & Seung, H. S., "Algorithms for Non-negative Matrix Factorization"
