let grid = [];

const DIM = 2;
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

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      option: [0, 1, 2, 3, 4]
    }
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
        let index = cell.option[0];
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
    return a.option.length - b.option.length;
  });

  let len = gridCopy[0].option.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].option.length > len) {
      stopIndex = i;
      break;
    }
  }
}
