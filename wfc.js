let grid = [];
let tileImages = []

const DIM = 5;
const tiles = [];

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

    for (let tile of tiles) {
        tile.generateAdjacencies(tiles);
    }

    for (let i = 0; i < DIM * DIM; i++) {
        grid[i] = new Cell(new Array(tiles.length).fill(0).map((x, i) => i))
    }
}

function wfc() {
    // Get only the cells that are not collapsed
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);

    if (gridCopy.length == 0) {
        return;
    }

    // Sort by entropy (length of tile options)
    gridCopy.sort((a, b) => {
        return a.tileOptions.length - b.tileOptions.length;
    });

    // Get only the cells with minimum entropy
    let len = gridCopy[0].tileOptions.length;
    let stopIndex = 0;

    for (let i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].tileOptions.length > len) {
            stopIndex = i;
            break;
        }
    }

    if (stopIndex > 0) gridCopy.splice(stopIndex);

    // Choose a cell with minimum entropy and collapse it
    const cell = random(gridCopy);
    cell.collapsed = true;
    cell.tileOptions = [random(cell.tileOptions)];
       
    reCalculateEntropy();
}

function getValidTiles(options, validOptions) {
    let newOptions = [];
    for (let i = 0; i < options.length; i++) {
        if (validOptions.includes(options[i])) {
            newOptions.push(options[i]);
        }
    }
    return newOptions;
}

function reCalculateEntropy() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let index = i + j * DIM;
            if (grid[index].collapsed) continue;

            let options = new Array(tiles.length).fill(0).map((x, i) => i);
            // Up
            if (j > 0) {
                let upPosition = grid[i + (j - 1) * DIM];
                let validOptions = [];
                for (let option of upPosition.tileOptions) {
                    let valid = tiles[option].down;
                    validOptions = validOptions.concat(valid);
                }
                options = getValidTiles(options, validOptions);            
            }
            // Right
            if (i < DIM - 1) {
                let rightPosition = grid[i + 1 + j * DIM];
                let validOptions = [];
                for (let option of rightPosition.tileOptions) {
                    let valid = tiles[option].left;
                    validOptions = validOptions.concat(valid);
                }
                options = getValidTiles(options, validOptions);            
            }
            // Down
            if (j < DIM - 1) {
                let downPosition = grid[i + (j + 1) * DIM];
                let validOptions = [];
                for (let option of downPosition.tileOptions) {
                    let valid = tiles[option].up;
                    validOptions = validOptions.concat(valid);
                }
                options = getValidTiles(options, validOptions);  
            }
            // Left
            if (i > 0) {
                let leftPosition = grid[i - 1 + j * DIM];
                let validOptions = [];
                for (let option of leftPosition.tileOptions) {
                    let valid = tiles[option].right;
                    validOptions = validOptions.concat(valid);
                }
                options = getValidTiles(options, validOptions);  
            }
            grid[index].tileOptions = options;
        }
    }
}

function draw() {
    background(0);
    const w = width / DIM;
    const h = height / DIM;
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
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
    wfc();
}