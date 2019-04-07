---
category: posts

---

### Well, not a neuron yet... WIP


Cool graph, though


<html>
  <base href="/assets/js_apps/A-Neuron-Model/"/>
  <head></head>
  <body>
    <div id="stage" padding="0 px"></div>
    <div id="controls">
      <button type="button" id="play" 
        style="height:25px;
               width:50px;
               top:10px;
               left:100px;">
      </button>
      <input type="range" min="1" max="100" value="12" id="I"
        style="height=20px;
               width:500px;"/>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.3.0/math.min.js"></script>
    <script src="/assets/js_libs/lodash.js"></script>
    <script src="/assets/js_libs/two.js"></script>
    <script src="app.js"></script>
  </body>
</html>
