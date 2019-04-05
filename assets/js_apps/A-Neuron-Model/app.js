
// NOTE: I did not use d3 as a learning experience,
// and because I am not a fan of its API (especially
// for animations)

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
          nxticks: 11, nyticks: 11 }
}
_.extend(graph_params, params);


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


// graph construction
function NeuronGraph(params) {

  // create border
  this.border = makeBorder(params);

  // generate axis
  this.axis = {
    xaxis: makeXAxis(params),
    yaxis: makeYAxis(params)
  }

  return this;

}


var graph = new NeuronGraph(graph_params);
two.update();

console.log("run 2");
