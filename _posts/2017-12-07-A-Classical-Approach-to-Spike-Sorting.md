---
title: A Classical Approach to Spike Sorting

header:
  image: /assets/media/A-Classical-Approach-to-Spike-Sorting/vtraces0.gif
---

# Introduction

In the field of Neuroscience, one often wants to capture individual neuron activity. This is often done via a microelectrode inserted into the brain and recording the time series of voltage readings. This is often referred to as a *single unit recording*. Often a times, these readings are extracellular recordings taken in a neighborhood of neurons. The task of taking this time series and extracting the individual action potential signatures is called spike sorting [1].

![Image](/assets/media/A-Classical-Approach-to-Spike-Sorting/spike_sorting_diagram2.png)

# Approach

Initially, we have a raw time series of extracellular voltage recordings. This is often smoothed out using a bandpass filter. One common preprocessing step is to threshold the neurons and window each detected action potential inferred by the spike threshold crossing points. Finally, the windowed data is projected into a feature space and clustered in order to find the underlying neural signatures of each underlying neuron.

A lot of the signal filtering, thresholding, and windowing is generally done using *a priori* knowledge of the experiment, method of data acquisition, underlying physiology, and general neuroscience knowledge. Sometimes, this may mean a scientist will analyze the neural signal traces visually and manually tune a threshold to detect spikes.

For the sake of brevity, we will focus on the final stage of spike sorting; given the windowed action potentials detected, we want to determine the underlying neurons. One original approach [CITE] is to use PCA in conjunction with K-Means.





# Citation

Please cite this post using the BibTex entry below.

```
@misc{
author = {Liapis, Yannis},
title = {A Classical Approach to Spike Sorting},
journal = {},
type = {Blog},
number = {December 7},
year = {2017},
howpublished = {\url{http://yliapis.github.io}}
```

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

# References

[[1](http://icslwebs.ee.ucla.edu/dejan/researchwiki/index.php/Neural_Spike_Sorting)] Wiki Page, "Neural Spike Sorting"

[[2](http://www.scholarpedia.org/article/Spike_sorting)] Quiroga, R. Q., "Spike Sorting"

[[3]()]
