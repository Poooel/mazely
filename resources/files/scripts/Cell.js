class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
        this.links = []
    }

    link(cell, bidirectional = true) {
        this.links.push(cell)
        if (bidirectional) cell.link(this, false)
    }

    linked(cell) {
        return this.links.indexOf(cell) != -1
    }
}