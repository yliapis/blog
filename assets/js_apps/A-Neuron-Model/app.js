
/* NOTE: I did not use d3 or another visual analytics
 * libraryas a learning experience
 * building everything from the ground up,
 * and because I am not a fan of its API (especially
 * for animations)
 */

// set up two
var elem = document.getElementById("stage");
var params = { width: 600, height: 400, type: Two.Types.svg };
var two = new Two(params).appendTo(elem);

// graph params
var graph_params = {
  margin: { left: 25, right: 25, top: 25, bottom: 25 },
  border: { width: 2, radius: 4, offset: 20, color: "lightgray" },
  background: "white",
  axis: { color: "black", width: 0.5, tick_length: 5,
          nxticks: 11, nyticks: 11 },
  frame_step: 1
}
_.extend(graph_params, params);

// neurom data constructor
function NeuronData () {
  
  this.data = new Array(256);

  this.type = "izhikevich";
  
  this.dt = 1e-3;
  this.tau = 10e-3;
  this.num_excitory = 64;
  this.num_inhibitory = 64;
  this.p_fire_e = 0.2;
  this.p_fire_i = 0.2;
  
  this.I = 30e-3;

  this.I = function () {
    let e = 0, i = 0;
    for (var n = 0; n < this.num_excitory; n++)
      e += (Math.rand() < p_fire_e);
    for (var n = 0; n < this.num_inhibitory; n++)
      i += (Math.rand() < p_fire_i);
    return {
      excitory: e,
      inhibitory: i,
      total: e - i
    };
  };
  
  this.R = 10;

  this.next = function() {

  }

  this.step = function () {
    // Izhikevich

    if (this.type === "izhikevich") {
      this.data.shift();
      this.data.push(
        this.data.last() + this.dt * (
        this.E - this.data.last() +
        this.R * this.I().total) / this.tau
      );
    }

    // leaky integrate and fire model
    // <not implemented>
  };

  return this;
};
var neuron_data = new NeuronData();

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
  xaxis.translation.set(
    params.margin.left,
    params.height - params.margin.bottom);
  var axis = two.makePath(0, 0, axis_len, 0);
  xaxis.add(axis);
  // create ticks
  const step = axis_len / params.axis.nxticks;
  var ticks = []
  for (var i = 0; i <= params.axis.nxticks; i++) {
    let x = i*step;
    let tick = two.makePath(x, 0, x, params.axis.tick_length);
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
  // stage.scale(
  //   params.width - (params.margin.left + params.margin.right),
  //   params.height - (params.margin.top + params.margin.bottom));
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
    return x * (params.width -
                (params.margin.left + params.margin.right));
  }
  
  function mapy(y) {
    return (1 - y) * (params.height -
                (params.margin.top + params.margin.bottom));
  }

  let x = new Array(data.length);
  for (var i = 0; i < x.length; i++)
    x[i] = mapx(i / x.length);

  let y = data.map(mapy);

  var anchors = []
  for (var i = 0; i < y.length; i++)
    anchors.push(new Two.Anchor(x[i], y[i]));

  let path = two.makePath(anchors);
  path.stroke = "green";
  path.linewidth = 1;
  path.closed = false;
  stage.add(path);
  stage.trace = path
}

function shift(stage, params) {

}

// graph construction
function NeuronGraph(params) {

  // create border
  this.border = makeBorder(params);

  // generate axis
  this.axis = {
    xaxis: makeXAxis(params),
    yaxis: makeYAxis(params)
  }

  this.stage = makeStage(params);

  let data = genData(1024);

  plotData(stage, data, params);

  let dx = 256/(params.width - (params.margin.left + params.margin.right));
  let tx = dx;

  two.bind("update", function(frameCount) {
    if (!(frameCount % params.frame_step)) {
      // shift(stage, params);
      stage.trace.remove();
      data.pop()
      plotData(stage, data, params);
      // stage.children[0].translation.set(tx, 0);
      tx += dx;
    }
  });

  this.play = function() { two.play(); }

  return this;

}


var graph = new NeuronGraph(graph_params);
// two.update();
graph.play();

console.log("run 4");
