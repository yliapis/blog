
/* NOTE: I did not use d3 or another visual analytics
 * libraryas a learning experience building everything
 * from the ground up, and because I am not a fan of 
 * its API (especially for animations)
 *
 * And yes, this code needs refactoring (I have been using
 * javascript for just a week now)
 */ 

// set up two
var elem = document.getElementById("stage");
var params = { width: 600, height: 400, type: Two.Types.svg };
var two = new Two(params).appendTo(elem);

// graph params
var graph_params = {
  margin: { left: 25, right: 25, top: 25, bottom: 25 },
  border: { width: 2, radius: 4, offset: 22.5, color: "lightgray" },
  background: "white",
  axis: { color: "black", width: 0.5, tick_length: 5,
          nxticks: 11, nyticks: 11, gridline_width:0.05,
          xtick_offset: 4 },
  trace: { color: "steelblue", width: 2.5},
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
      if (vm > this.vt)
        return this.vreset;
      else
        return (vm + this.dt * (
          -(vm - this.ve) + I * this.Rm) / this.taum);
    }
  }

  this.step = function () {
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
      (params.margin.left + params.margin.right) / 2,
    params.height + params.border.offset -
      (params.margin.top + params.margin.bottom) / 2,
    params.border.radius);
  border.linewidth = params.border.width;
  border.stroke = params.border.color;
  // border.fill = params.background;
  return border;
}


function makeXAxis(params, min, max) {
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
                other_len / (params.axis.nxticks - 1));
  var axis = two.makePath(0, offset, axis_len, offset);
  axis.stroke = params.axis.color;
  axis.noFill();
  xaxis.add(axis);
  // create ticks
  const step = axis_len / (params.axis.nxticks - 1);
  var ticks = [];
  for (var i = 0; i < params.axis.nxticks; i++) {
    let x = i*step;
    let tick = two.makePath(x, offset, x, offset + params.axis.tick_length);
    tick.stroke = params.axis.color;
    tick.linewidth = params.axis.width;
    ticks.push(tick);
  }
  xaxis.add(ticks);
  // gridlines
  const gridline_len = params.height - (params.margin.top + params.margin.bottom);
  gridlines = [];
  for (var i = 0; i < params.axis.nxticks; i++) {
    let x =  i * step;
    let gridline = two.makePath(x, -gridline_len, x, 0);
    gridline.stroke = params.axis.color;
    gridline.linewidth = params.axis.gridline_width;
    gridline.noFill();
    gridlines.push(gridline);
  }
  xaxis.add(gridlines);
  // numbers
  numbers = [];
  for (var i = 0; i < params.axis.nxticks; i++) {
    let x = i*step;
    let val = String(min + i * (max - min) / (params.axis.nyticks - 1));
    let number = new Two.Text(val, x, offset + params.axis.tick_length + 1);
    number.size = 8;
    number.alignment = "center";
    numbers.push(number);
  }
  xaxis.add(numbers);
  return xaxis;
}


function makeYAxis(params, min, max) {
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
  const step = axis_len / (params.axis.nyticks - 1);
  var ticks = [];
  for (var i = 0; i <= params.axis.nyticks; i++) {
    let y = axis_len - i*step;
    let tick = two.makePath(0, y, -params.axis.tick_length, y);
    tick.stroke = params.axis.color;
    tick.linewidth = params.axis.width;
    ticks.push(tick);
  }
  yaxis.add(ticks);
  // gridlines
  const gridline_len = params.width - (params.margin.left + params.margin.right);
  gridlines = [];
  for (var i = 0; i < params.axis.nyticks; i++) {
    let y = axis_len - i * step;
    let gridline = two.makePath(0, y, gridline_len, y);
    gridline.stroke = params.axis.color;
    gridline.linewidth = params.axis.gridline_width;
    gridline.noFill();
    gridlines.push(gridline);
  }
  yaxis.add(gridlines);
  // numbers
  numbers = [];
  for (var i = 0; i < params.axis.nyticks; i++) {
    let y = axis_len - i*step;
    let val = String(min + i * (max - min) / (params.axis.nyticks - 1));
    let number = new Two.Text(val, -params.axis.tick_length - 1, y);
    number.size = 8;
    number.alignment = "right";
    numbers.push(number);
  }
  yaxis.add(numbers);
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
    return stage.attrs.scale.width * ((x - data.attrs.xmin) /
            (data.attrs.xmax - data.attrs.xmin));
  }
  
  function mapy(y) {
    return stage.attrs.scale.height * ((y - data.attrs.ymin) /
            (data.attrs.ymax - data.attrs.ymin));
  }

  let x = data.time.map(mapx);
  let y = data.data.map(mapy);

  var anchors = []
  for (var i = 0; i < y.length; i++)
    anchors.push(new Two.Anchor(x[i], y[i]));

  let path = two.makePath(anchors);
  path.stroke = params.trace.color;
  path.linewidth = params.trace.width;
  path.closed = false;
  path.fill = "transparent";
  stage.add(path);
  stage.trace = path;
}


// graph construction
function NeuronGraph(params) {

  let self = this;

  // make data
  this.neuron_data = new NeuronData();

  // create border
  this.border = makeBorder(params);

  // generate axis
  this.axis = {
    xaxis: makeXAxis(params,
                     self.neuron_data.attrs.xmin * 1e3,
                     self.neuron_data.attrs.xmax * 1e3),
    yaxis: makeYAxis(params,
                     self.neuron_data.attrs.ymin * 1e3,
                     self.neuron_data.attrs.ymax * 1e3)
  };

  this.stage = makeStage(params);

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


// make graph
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
