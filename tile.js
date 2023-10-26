class Tile {
    constructor(image, edges) {
        this.image = image
        this.edges = edges
        this.up = [];
        this.right = [];
        this.down = [];
        this.left = [];
    }
    analyze(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].edges[2] == this.edges[0]) this.up.push(i);
            if (tiles[i].edges[3] == this.edges[1]) this.right.push(i);
            if (tiles[i].edges[0] == this.edges[2]) this.down.push(i);
            if (tiles[i].edges[1] == this.edges[3]) this.left.push(i);
        }
    }
}