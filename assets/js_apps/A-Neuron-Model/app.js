
/* NOTE: I did not use d3 or another visual analytics
 * libraryas a learning experience building everything
 * from the ground up, and because I am not a fan of 
 * its API (especially for animations)
 */

// set up two
var elem = document.getElementById("stage");
var params = { width: 600, height: 400, type: Two.Types.canvas };
var two = new Two(params).appendTo(elem);

// graph params
var graph_params = {
  margin: { left: 25, right: 25, top: 25, bottom: 25 },
  border: { width: 2, radius: 4, offset: 20, color: "lightgray" },
  background: "white",
  axis: { color: "black", width: 0.5, tick_length: 5,
          nxticks: 11, nyticks: 11, xtick_offset: 4 },
  frame_step: 1
}
_.extend(graph_params, params);

// neurom data constructor
function NeuronData () {

  self = this;

  this.model = "LIR"

  this.vt = 30e-3;
  this.ve = -75e-3
  this.vreset = -80e-3;

  this.taum = 10e-3;
  this.Rm = 10e6;
  this.I = 10e-9;

  this.T = 100e-3;
  this.n_points = 256;
  this.dt = this.T / (this.n_points - 1);

  this.data = new Array(this.n_points);
  for (var i = 0; i < this.n_points; i++)
    this.data[i] = this.vreset;
  
  this.time = new Array(this.n_points);
  for (var i = 0; i < this.n_points; i++)
    this.time[i] = this.dt * i - this.T;

  this.attrs = {
    xmin: -this.T, xmax: 0,
    ymin: -100e-3, ymax: 50e-3
  }

  this.next = function() {
    let vm = this.data[this.data.length - 1];
    // Leaky integrate and fire
    if (this.model === "LIR") {
      let I = (function () { return self.I })();
      debugger;
      if (vm > this.vt)
        return this.vreset;
      else
        return (vm + this.dt * (
          -(vm - this.ve) + I * this.Rm) / this.taum);
    }
  }

  this.step = function () {
    // Izhikevich
    let next = this.next();
    this.data.shift();
    this.data.push(next);
  }
}

// helper functions
function makeBorder(params) {
  var border = two.makeRoundedRectangle(
    params.width/2, params.height/2,
    params.width + params.border.offset -
      (params.margin.left + params.margin.right),
    params.height + params.border.offset -
      (params.margin.top + params.margin.bottom),
    params.border.radius);
  border.linewidth = params.border.width;
  border.stroke = params.border.color;
  border.fill = params.background;
  return border;
}


function makeXAxis(params) {
  // make line
  var xaxis = two.makeGroup();
  const axis_len = params.width - (params.margin.left + params.margin.right);
  const other_len = params.height - (params.margin.top + params.margin.bottom);
  xaxis.translation.set(
    params.margin.left,
    params.height - params.margin.bottom);
  // offset from 0 on y axis, in ticks
  // this is if we have negative values in data to represent
  let offset = -params.axis.xtick_offset * (
                other_len / (params.axis.nxticks));
  var axis = two.makePath(0, offset, axis_len, offset);
  axis.stroke = params.axis.color;
  xaxis.add(axis);
  // create ticks
  const step = axis_len / params.axis.nxticks;
  var ticks = []
  for (var i = 0; i <= params.axis.nxticks; i++) {
    let x = i*step;
    let tick = two.makePath(x, offset, x, offset + params.axis.tick_length);
    tick.stroke = params.axis.color;
    tick.linewidth = params.axis.width;
    ticks.push(tick);
  }
  xaxis.add(ticks);
  return xaxis;
}


function makeYAxis(params) {
  // make line
  var yaxis = two.makeGroup();
  const axis_len = params.height - (params.margin.top + params.margin.bottom);
  yaxis.translation.set(
    params.margin.left,
    params.margin.top);
  var axis = two.makePath(0, axis_len, 0, 0);
  axis.stroke = params.axis.color;
  axis.linewidth = params.axis.width;
  yaxis.add(axis);
  // create ticks
  const step = axis_len / params.axis.nyticks;
  var ticks = []
  for (var i = 0; i <= params.axis.nyticks; i++) {
    let y = axis_len - i*step;
    let tick = two.makePath(0, y, -params.axis.tick_length, y);
    tick.stroke = params.axis.color;
    tick.linewidth = params.axis.width;
    ticks.push(tick);
  }
  yaxis.add(ticks);
  return yaxis;
}

function makeStage(params) {
  stage = two.makeGroup();
  stage.translation.set(
    params.margin.left,
    params.margin.top);
  stage.attrs = {
    scale: {
      width: params.width - (params.margin.left + params.margin.right),
      height: params.height - (params.margin.top + params.margin.bottom)
    },
    origin : {
      x: params.margin.left,
      y: params.margin.top
    }
  };
  return stage;
}


function genData(num_points) {
  let N = num_points;
  arr = new Array(N)
  for (var i = 0; i < N; i++) {
    arr[i] = Math.random();
  }
  return arr;
}


function plotData(stage, data, params) {

  function mapx(x) {
    // return (Math.random() * stage.attrs.scale.width);
    return stage.attrs.scale.width * ((x - data.attrs.xmin) /
            (data.attrs.xmax - data.attrs.xmin));
  }
  
  function mapy(y) {
    // return (stage.attrs.scale.height - Math.random() * stage.attrs.scale.height);
    return stage.attrs.scale.height * ((y - data.attrs.ymin) /
            (data.attrs.ymax - data.attrs.ymin));
  }
  // debugger;
  let x = data.time.map(mapx);
  let y = data.data.map(mapy);

  var anchors = []
  for (var i = 0; i < y.length; i++)
    anchors.push(new Two.Anchor(x[i], y[i]));

  let path = two.makePath(anchors);
  path.stroke = "purple";
  path.linewidth = 1;
  path.closed = false;
  stage.add(path);
  stage.trace = path;
}

// graph construction
function NeuronGraph(params) {

  let self = this;

  // create border
  this.border = makeBorder(params);

  // generate axis
  this.axis = {
    xaxis: makeXAxis(params),
    yaxis: makeYAxis(params)
  };

  this.stage = makeStage(params);

  this.neuron_data = new NeuronData();

  plotData(this.stage, this.neuron_data, params);

  two.bind("update", function(frameCount) {
    if (!(frameCount % params.frame_step)) {
      self.stage.trace.remove();
      self.neuron_data.step();
      plotData(self.stage, self.neuron_data, params);
      // console.log("update");
    }
  });

  this.play = function() { two.play(); };
  this.pause = function() { two.pause(); };

  return this;

}

// components
var graph = new NeuronGraph(graph_params);
graph.play();

// input callbacks
// current
var current_slider = document.getElementById("I");
graph.neuron_data.I = (Number(current_slider.value) * 1e-9);

current_slider.oninput = function() {
  graph.neuron_data.I = (Number(current_slider.value) * 1e-9);
}

// play
var play_button = document.getElementById("play");
var play_img = document.getElementById("play_symbol");
const play_img_src = "/assets/media/images/play.svg";
const pause_img_src = "/assets/media/images/pause.svg";
play_img.src = pause_img_src;
var play = true;

play_button.onclick = function() {
  if (play) {
    graph.pause();
    play_img.src = play_img_src;
  } else {
    graph.play();
    play_img.src = pause_img_src;
  }
  play = !play;
}

function pause() {
  graph.pause();
}
