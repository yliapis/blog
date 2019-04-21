---
permalink: /libraries/

# title: Libraries

type: pages

layout: single
sidebar:

header:
  image: /assets/media/heartbeat.jpg

author_profile: true
---

## A curated list of useful programming libraries

### Python
* [The python standard library](https://docs.python.org/3/library/index.html)
* [Flake8](http://flake8.pycqa.org/en/latest/): Python linter.
* [Jupyter](https://jupyter.org/): Incredible tool for rapid prototyping and data visualization. Primarily for python, but works with other languages too.
* [Iodide](https://alpha.iodide.io/): Data science for the web. Write python, javascript, markdown, and CSS to all run in a web browser.
* Computational and Data Science
  - [Gym](https://gym.openai.com/): Very useful tool for developing reinforcement learning models on a (growing) set of defined tasks, ranging from controlling a robotic arm to playing atari videogames. In a nutshell, the purpose of this library is to have standard benchmarks for developing reinforcement learing models that are simple to set up and use. Most (if not all) of the tasks have a real time visualization showing how the agent is interacting with the environment.
  - [Keras](https://keras.io/): Great deep learning library. Is built on top of many well known neural network libraries. Very high level, has a beautiful API. Note that additional libraries exist providing more esoteric functionality to keras, such as [keras-contrib](https://github.com/keras-team/keras-contrib) for additional layers and [keras-rl](https://github.com/keras-rl/keras-rl) for deep reinforcement learning.
  - [Numpy](https://www.numpy.org/): This one is vital; A n-dimensional array (tensor) manipulation library. Super fast since the backend is primarily written in C. Reminiscent of MATLAB.
  - [OpenCV](https://docs.opencv.org/3.0-beta/index.html): Image processing library written in C++. Has a python wrapper.
  - [Pandas](https://pandas.pydata.org/): Data table manipulation library.
  - [PyTorch](https://pytorch.org/): A very powerful deep learning library.
  - [PyWavelets](https://pywavelets.readthedocs.io/en/latest/) Extensive Wavelet library for python.
  - [Scikit-Image](https://scikit-image.org/): Solid image processing library.
  - [Scikit-Learn](https://scikit-learn.org/stable/): The go-to library for most machine learning techniques.
  - [Scipy](https://docs.scipy.org/doc/scipy/reference/): Many common scientific functions and algorithms, such as special functions, integration, optimization, statistics, signal processing, etc.
  - [StatsModels](https://www.statsmodels.org/stable/index.html): Statistics library with many esoteric models and techniques. Still in the earlier stages of development.
  - [TensorFlow](https://www.tensorflow.org/) Scalable neural network library.
  - [xarray](http://xarray.pydata.org/en/stable/index.html): N-D labeled arrays and datasets in Python. Somewhat of a multidimensional analog to Pandas.
* Visualization
  - [ggplot](http://ggplot.yhathq.com/): Very clean data visualization library. Based on R's ggplot2.
  - [Matplotlib](https://matplotlib.org/): The primary plotting library used in python. Very similar API to MATLAB plotting.
  - [NetworkX](https://networkx.github.io/): Graph manipulation and visualization library.
  - [Plotly](https://plot.ly/python/): Beautiful interactive visualization generation. Some features are not free.
  - [Seaborn](https://seaborn.pydata.org/): Another good statistical data visualization library.
* Big Data
  - [dask](https://dask.org/): Powerful scalable computing library (MIMD); lets you build computational graphs and run code in parallel, along with a lot more.
  - [h5py](https://www.h5py.org/): HDF5 for python. Allows you to store large amounts of data on disk and manipulate it within python.

### JavaScript
* [nodejs](https://nodejs.org/en/about/): Powerful javascript runtime.
* [eslint](https://eslint.org/): Extensively customizable linter for javascript.
* [Prettier](https://prettier.io/docs/en/): Automatic code formater for javascript. Corrects formatting related issues that linters detect.
* [electron](https://electronjs.org/): Powerful framework for creating desktop applications using the traditional web stack (HTML + CSS + JS + extras). Many great applications are built on top of electron.
* Data Visualization
  - [D3](https://d3js.org/): Very powerful interactive data visualization library.
  - [Plotly.js](https://plot.ly/javascript/): High level interactive data visualization library. Use this over D3 unless you are trying to do something very specific.
* Drawing and Animation
  - [two.js](https://two.js.org/): Easy to use 2D drawing and animation library

<br>
<br>

Last updated: April 2019
