class Cell {
    constructor(tileOptions) {
        this.collapsed = false;
        this.tileOptions = tileOptions;
    }

    setTileOptions(tileOptions) {
        this.tileOptions = tileOptions;
    }
}