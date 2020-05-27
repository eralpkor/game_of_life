const canvas = this.document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Generations {
  constructor(res, width, height, canvas, start) {
    this.resolution = res;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.start = false;
  }

  getGens = (resolution, width, height) => {
    this.resolution = resolution;
    canvas.width = width;
    canvas.height = height;
    console.log(this.resolution, canvas.height, canvas.width);
  };

  buildGrid = () => {
    this.getGens(5, 800, 600);
    // generate cells total
    const col = canvas.width / this.resolution;
    const row = canvas.height / this.resolution;

    return (
      new Array(col)
        .fill(null) // make it iterable
        // for each column create array of rows fill with 0's
        .map(() =>
          new Array(row)
            .fill(null)
            // add random living cells 1's
            .map(() => Math.floor(Math.random() * 2))
        )
    );
  };

  grid = this.buildGrid()

  nextGen = (grid) => {
    // create copy of the grid so we can reference to original
    const nextGen = grid.map((arr) => [...arr]); // exact copy of the grid

    for (let c = 0; c < grid.length; c++) {
      // colums
      for (let r = 0; r < grid[c].length; r++) {
        // rows
        const cell = grid[c][r];
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
              let currentNeighbors = grid[c + i][r + j];
              // add current neighbors value to number of neighbors
              neighborSum += currentNeighbors;
            }
          }
        }
        // rules:
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
  };

  renderMe = (grid) => {
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

  update() {
    if (this.start) {
      grid = nextGen(grid);
      renderMe(grid);
      requestAnimationFrame(update);
    } 
    else {
      // buildGrid();
    }
  }
}

const gen = new Generations();

// gen.getGens(5, 1100, 600)

gen.update();

// console.log(gen.buildGrid());
