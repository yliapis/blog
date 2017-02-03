---
---

### Eigenfaces

Recently, I stumbled across the concept of [eigenfaces](https://en.wikipedia.org/wiki/Eigenface).

Simply put, eigenfaces are the corresponding eigenvectors one can derive from performing [Principal Component Analysis](https://en.wikipedia.org/wiki/Principal_component_analysis) on a set of cropped facial images. 

$$ Image = basis1 * E1 + E2 $$

### From Human to Cat Faces

Naturally, I asked myself: if we are performing this algorithm on human faces... why not cats? In the name of science, of course. The dataset used constists of 10,000 cat pictures, and is publically available from the authors of a cat feature recognition [1] algorithm.

Initially, the cat faces need to be preprocessed.


[1]	Weiwei Zhang, Jian Sun, and Xiaoou Tang, "Cat Head Detection - How to
  	Effectively Exploit Shape and Texture Features", Proc. of European
  	Conf. Computer Vision, vol. 4, pp.802-816, 2008.