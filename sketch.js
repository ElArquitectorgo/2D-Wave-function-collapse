let grid = [];

const DIM = 9;
const tiles = [];
let tileImages = []

function preload() {
  tileImages = [
    loadImage("tiles/blank.png"),
    loadImage("tiles/up.png"),
    loadImage("tiles/right.png"),
    loadImage("tiles/down.png"),
    loadImage("tiles/left.png")
  ]
}

function setup() {
  createCanvas(400, 400);

  tiles[0] = new Tile(tileImages[0], [0, 0, 0, 0]);
  tiles[1] = new Tile(tileImages[1], [1, 1, 0, 1]);
  tiles[2] = new Tile(tileImages[2], [1, 1, 1, 0]);
  tiles[3] = new Tile(tileImages[3], [0, 1, 1, 1]);
  tiles[4] = new Tile(tileImages[4], [1, 0, 1, 1]);

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  startOver();
}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell([0, 1, 2, 3, 4]);
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}


function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.tileOptions[0];
        image(tiles[index].image, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255)
        rect(i * w, j * h, w, h);
      }
    }
  }

  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  if (gridCopy.length == 0) {
    return;
  }

  gridCopy.sort((a, b) => {
    return a.tileOptions.length - b.tileOptions.length;
  });

  let len = gridCopy[0].tileOptions.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].tileOptions.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);

  // Escoge una celda de mínima entropía y la colapsa
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.tileOptions);
  if (pick === undefined) {
    startOver();
    return;
  }
  cell.tileOptions = [pick];

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // Look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          let validOptions = [];
          for (let option of up.tileOptions) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.tileOptions) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];
          for (let option of down.tileOptions) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];
          for (let option of left.tileOptions) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        nextGrid[index] = new Cell(options);
      }
    }
  }
  grid = nextGrid;
}
