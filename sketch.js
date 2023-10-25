const grid = [];

const DIM = 2;
const tiles = [];

function preload() {
  tiles[0] = loadImage("tiles/blank.png");
  tiles[1] = loadImage("tiles/up.png");
  tiles[2] = loadImage("tiles/right.png");
  tiles[3] = loadImage("tiles/down.png");
  tiles[4] = loadImage("tiles/left.png");
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [0, 1, 2, 3, 4]
    }
  }

  grid[3].collapsed = true;
  grid[2].collapsed = true;

}


function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[3];
        image(tiles[index], i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255)
        rect(i * w, j * h, w, h);
      }
    }
  }
}
