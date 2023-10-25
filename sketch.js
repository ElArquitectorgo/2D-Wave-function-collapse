let grid = [];

const DIM = 2;
const tiles = [];

function preload() {
  tiles[0] = {
    image: loadImage("tiles/blank.png"),
    edges: [0, 0, 0, 0]
  }
  tiles[1] = {
    image: loadImage("tiles/up.png"),
    edges: [1, 1, 0, 1]
  }
  tiles[2] = {
    image: loadImage("tiles/right.png"),
    edges: [1, 1, 1, 0]
  }
  tiles[3] = {
    image: loadImage("tiles/down.png"),
    edges: [0, 1, 1, 1]
  }
  tiles[4] = {
    image: loadImage("tiles/left.png"),
    edges: [1, 0, 1, 1]
  }
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      option: [0, 1, 2, 3, 4]
    }
  }
}

function checkValid(arr, valid) {
  //console.log(arr, valid);
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

  grid = nextGrid;
}
