---
category: posts

---

# Computational Model of a Neuron

<html>
  <link rel="stylesheet" type="text/css" href="/assets/css/io.css">
  <base href="/assets/apps/A-Neuron-Model/"/>
  <head></head>
  <body>
    <div id="stage" padding="0 px"></div>
    <div id="controls">
      <button type="image" id="play" style="
        padding:0;
        border:none;
        background:none;">
      <img id="play_symbol" src="/assets/media/images/play.svg" height="16" width="16"/>
      </button>
      <input type="range" min="0" max="35000" value="12000" id="I"
        style="height=16px;width:500px;"/>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.3.0/math.min.js"></script>
    <script src="/assets/js_libs/lodash.js"></script>
    <script src="/assets/js_libs/two.js"></script>
    <script src="app.js"></script>
  </body>
</html>

<br>


The simulation above is a model of a Leaky Integrate-and-Fire Neuron. This is one of many different models developed to study the electrical properties of biological neurons.


<br>
<br>

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

# References

[[1]](https://neuronaldynamics.epfl.ch/online/Ch1.S3.html) https://neuronaldynamics.epfl.ch/online/Ch1.S3.html

[[2]](https://en.wikipedia.org/wiki/Biological_neuron_model) https://en.wikipedia.org/wiki/Biological_neuron_model

[[3]](https://ocw.mit.edu/resources/res-9-003-brains-minds-and-machines-summer-course-summer-2015/tutorials/tutorial-2.-matlab-programming/MITRES_9_003SUM15_fire.pdf) https://ocw.mit.edu/resources/res-9-003-brains-minds-and-machines-summer-course-summer-2015/tutorials/tutorial-2.-matlab-programming/MITRES_9_003SUM15_fire.pdf

[[4]](http://scholarpedia.org/article/Spike-response_model) http://scholarpedia.org/article/Spike-response_model

<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"         title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"        title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
