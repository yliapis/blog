
// set up two
// var elem = document.getElementsByName("stage")[0];
var elem = document.getElementById("stage");
var params = { width: 500, height: 500 };
var two = new Two(params).appendTo(elem);

let ON = "black";
let OFF = "white";

// define grid parameters
var ngrid = { width: 50, height: 50 };
var margin = 0;
var step = 10;
var size = step - 2*margin;

var p = .5;

// create array for conway's game of life
function matrix(m, n) {
  var grid = new Array(m);
  for (var i = 0; i < m; i++) {
    grid[i] = new Array(n);
  }
  return grid;
}

grid = matrix(ngrid.height, ngrid.width);

function initializeGrid(grid) {
  for (var m = 0; m < ngrid.height; m++) {
    for (var n = 0; n < ngrid.width; n++) {
      grid[m][n] = (Math.random() > p);
    }
  }
}

function numNeighbors(grid, m, n) {
  var sum = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      var mm = m + i;
      var nn = n + j;
      if ((0 <= mm) && (mm < grid.length) &&
          (0 <= nn) && (nn < grid[0].length) &&
          !((m == mm) && (n == nn)) && (grid[mm][nn]))
        sum++;
    }
  }
  return sum;
}

function updateConway(alive, neighbors) {
  if (alive) {
    if ((2 <= neighbors) && (neighbors <= 3))
      return true;
    else
      return false;
  }
  else {
    if (neighbors == 3)
      return true;
    else
      return false;
  }
}

function stepGame(grid) {
  var next = matrix(ngrid.height, ngrid.width);
  for (var m = 0; m < ngrid.height; m++) {
    for (var n = 0; n < ngrid.width; n++) {
      next[m][n] = updateConway(grid[m][n], numNeighbors(grid, m, n));
    }
  }
  return next;
}

// create square elements
var squares = new Array(ngrid.height);
for (var m = 0; m < ngrid.height; m++) {
    squares[m] = Array(ngrid.width)
    for (var n = 0; n < ngrid.width; n++) {
      var corner = { x: m * step + margin, y: n * step + margin};
      rect = two.makeRectangle(corner.x, corner.y, size, size);
      rect.fill = OFF;
      rect.linewidth = 0;
      squares[m][n] = rect
    }
  }

function render(grid) {
  for (var m = 0; m < ngrid.height; m++) {
    for (var n = 0; n < ngrid.width; n++) {
      rect = squares[m][n];
      if (grid[m][n]) rect.fill = ON;
      else rect.fill = OFF;
    }
  } 
}

initializeGrid(grid);
render(grid);

two.bind("update", function(frameCount) {
  if (!(frameCount % 1)) {
    grid = stepGame(grid);
    render(grid);
    // console.log(frameCount);
  }
}).play();

// two.update();

console.log("done");
