
// set up two
var elem = document.getElementById("stage");
var params = { width: 500, height: 500 };
var two = new Two(params).appendTo(elem);
var margin = 0;

let ON = "black";
let OFF = "white";

// define grid parameters
var ngrid = { width: 50, height: 50 };

// ratio of dead/alive cells at startup
var P = 0.5;

// create array for conway's game of life
function matrix(m, n) {
  var grid = new Array(m);
  for (var i = 0; i < m; i++) {
    grid[i] = new Array(n);
  }
  return grid;
}

// Game object constructor
function GameofLife(ngrid, frame_step) {

  var step = ngrid.width/params.width;
  var frame_step = frame_step | 2;
  var ngrid = ngrid;
  
  function initializeGrid(grid) {
    for (var m = 0; m < ngrid.height; m++) {
      for (var n = 0; n < ngrid.width; n++) {
        grid[m][n] = (Math.random() > P);
      }
    }
    return grid;
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

  function updateCell(alive, neighbors) {
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
        next[m][n] = updateCell(grid[m][n],
                                numNeighbors(grid, m, n));
      }
    }
    return next;
  }

  function constructElementGrid(grid) {
    var element_grid = Array(ngrid.height);
    for (var m = 0; m < ngrid.height; m++) {
      element_grid[m] = Array(ngrid.width)
      for (var n = 0; n < ngrid.width; n++) {
        var corner = { x: m * step + margin, y: n * step + margin};
        rect = two.makeRectangle(corner.x + step/2, corner.y + step/2,
                                 step, step);
        rect.fill = OFF;
        rect.linewidth = 0;
        element_grid[m][n] = rect
      }
    }
    return element_grid;
  }

  this.grid = initializeGrid(matrix(ngrid.height, ngrid.width));
  this.element_grid = constructElementGrid(this.grid);

  function transfer() {
    for (var m = 0; m < ngrid.height; m++) {
      for (var n = 0; n < ngrid.width; n++) {
        rect = this.element_grid[m][n];
        if (this.grid[m][n]) rect.fill = ON;
        else rect.fill = OFF;
      }
    } 
  }

  two.bind("update", function(frameCount) {
    if (!(frameCount % frame_step)) {
      this.grid = stepGame(this.grid);
      transfer();
    }
  });

  console.log("run 7");
  
  this.play = function() { two.play(); }
  this.pause = function() { two.pause(); }
  this.regenerate = function() { this.grid = initializeGrid(this.grid); }
  this.clear = function() { two.clear(); }
  this.destroy = function() { this.clear(); null; };
  
  return this;

}

// play game
var game = new GameofLife(ngrid);
game.play();
