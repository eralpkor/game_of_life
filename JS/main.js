const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const resolution = 20; // pixels
canvas.width = 800;
canvas.height = 600;

const col = canvas.width / resolution;
const row = canvas.height / resolution;
// let previousFrameTime = 0;

let start = false;
console.log(start)

function buildGrid() {
  return new Array(col).fill(null) // make it iterable
    // for each column create array of rows fill with 0's
    .map(() => new Array(row).fill(null)
      // add random living cells 1's
      .map(() => Math.floor(Math.random() * 2)))
}

// Get the grid
let grid = buildGrid();

function update() {
  if (start) {
    grid = nextGen(grid);
    renderMe(grid);
    
    console.log(grid)
    // requestAnimationFrame(update);
  } 
}

// generations
function nextGen(grid) {
// create copy of the grid so we can reference to original
  const nextGen = grid.map(arr => [...arr]); // exact copy of the grid

  for (let c = 0; c < grid.length; c++) { // columns
    for (let r = 0; r < grid[c].length; r++) { // rows
      const cell = grid[c][r]
      let neighborSum = 0;
      // loop through array and find current cell
      for (let i = -1; i < 2; i++) {
        // find all of the neighbors
        for (let j = -1; j < 2; j++) {
          // when both i and j are zero, don't count current cell
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = c + i;
          const y_cell = r + j;

          // check if outside of the boundary of the grid
          if (x_cell >= 0 && y_cell >= 0 && x_cell < col && y_cell < row) {
            // all of the neighbors value, if zero no living neighbor
            let currentNeighbors = grid[c + i][r + j]
            // add current neighbors value to number of neighbors
            neighborSum += currentNeighbors
          }
        }
      }
      // RULES: 
      // 1. Any live cell with fewer than two live neighbors dies
      if (cell && neighborSum < 2) {
        // kill the cell
        nextGen[c][r] = 0;
        // 3. Any live cell with more than three live neighbors dies
      } else if (cell && neighborSum > 3) {
        nextGen[c][r] = 0;
        // Any dead cell with exactly three live neighbors becomes a live cell
      } else if (!cell && neighborSum === 3) {
        nextGen[c][r] = 1;
      }
      // otherwise exact copy of nextGen will be used.
    }
  }
  
  return nextGen;
}


// create a plot
function renderMe(grid) {
  for (let c = 0; c < grid.length; c++) { // colums
    for (let r = 0; r < grid[c].length; r++) { // rows
      const cell = grid[c][r]

      ctx.beginPath();
      ctx.rect(c * resolution, r * resolution, resolution, resolution);
      ctx.fillStyle = cell ? 'MEDIUMVIOLETRED' : 'SNOW'
      ctx.fill(); // fill boxes 
      // ctx.stroke(); // stroke lines
    }
  }
}

// custom game cells starts here
canvas.addEventListener('click', handleClick);

// create a grid for the custom game clickable
function createGrid(grid) {
  for (let c = 0; c < grid.length; c++) { // colums
    for (let r = 0; r < grid[c].length; r++) { // rows
      // draw the canvas
      ctx.beginPath();
      // create rectangle random
      ctx.rect(c * resolution, r * resolution, resolution, resolution);
      ctx.fillStyle = 'SNOW'; // rectangle colors
      ctx.fill(); // fill boxes 
      ctx.stroke(); // stroke lines
    }
  }
}

function handleClick(e) {
  ctx.fillStyle = 'MEDIUMVIOLETRED';
  ctx.beginPath();

  ctx.stroke()
  ctx.fillRect(Math.floor(e.offsetX/resolution)*resolution, Math.floor(e.offsetY/resolution) * resolution, resolution, resolution);
}


const newPlot = new Array(col).fill(0) // make it iterable
    // for each column create array of rows fill with 0's
    .map(() => new Array(row).fill(0))
// get the position of the cursor
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log("x: " + x + " y: " + y)
  Math.round(y)
  console.log("x: " + Math.trunc(x) + " y: " + y)
  
  // just use the x and y of the clicked point to determine what tile has been clicked. 
  //Lets say you have 10 x 10 tiles with the height and width of 10 px.

//If the user clicks the coordnate 67,12 you can divide x and y by ten, and round it off to know which element in your 2d array that represents it.
  // Horizontal ->
  let x_cell = Math.round(Math.trunc(x) / resolution)
  // Vertical ^\
  let y_cell = Math.round(y / resolution)

  console.log(Math.round(x/resolution))
  console.log(Math.round(y/resolution))
  
      // add random living cells 1's
      // .map(() => Math.floor(Math.random() * 2)))
  newPlot[y_cell][x_cell] = 1;
  // newPlot[y_cell] = 1;
  console.log(newPlot)
  // console.log(newPlot[x_cell])
}

// const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
})
// custom game cells ends here

const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const randomButton = document.getElementById('random');
const timer = document.getElementById('timer');

// timer
function showGens() {
  return timer.innerHTML = T++
}

let timerInterval = null;

const startTimer = () => {
  stop();
  T = 0;
  timerInterval = setInterval(showGens, 10);
}

const stop = () => clearInterval(timerInterval);


// Button events
// Start animation with button
playButton.addEventListener('click', function() {
  console.log('Play')
  if (!start) {
    // timer
    startTimer()
    requestAnimationFrame(update);
    start = true;
  }

  console.log(start)
});

// Pause the animation
pauseButton.addEventListener('click', function() {
  start = false;
  stop()
  console.log(start)
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // cancelAnimationFrame(update)
});

// Stop the animation and reset plot
stopButton.addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid = buildGrid();
  stop()
  start = false;
  // buildNew = true;
  console.log(start)
});

randomButton.addEventListener('click', function() {
  createGrid(grid)
});
