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

    unlink(cell, bidirectional = true) {
        const index = this.links.indexOf(cell)
        if (index > -1) {
            this.links.splice(index, 1)
        }
        if (bidirectional) cell.unlink(this, false)
    }

    linked(cell) {
        return this.links.indexOf(cell) != -1
    }
}

class Grid {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.cells = [];

        this.prepareGrid();
        this.configureCells();
    }

    prepareGrid() {
        for (let i = 0; i < this.height; i++) {
            let row = [];
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell(j, i));
            }
            this.cells.push(row);
        }
    }

    configureCells() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.cells[i][j];

                if (typeof this.cells[i - 1] != 'undefined') {
                    cell.north = this.cells[i - 1][j];
                }

                if (typeof this.cells[i + 1] != 'undefined') {
                    cell.south = this.cells[i + 1][j];
                }

                if (typeof this.cells[i][j - 1] != 'undefined') {
                    cell.west = this.cells[i][j - 1];
                }

                if (typeof this.cells[i][j + 1] != 'undefined') {
                    cell.east = this.cells[i][j + 1];
                }
            }
        }
    }

    uncompress(compressedMaze) {
        let splitCompressedMaze = compressedMaze.split(",");
        let binaryRepresentation = "";

        for (let i = 0; i < splitCompressedMaze.length; i++) {
            const element = splitCompressedMaze[i];
            const bigInt = BigInt(element);
            const binaryBigInt = bigInt.toString(2);
            const paddedBinaryBigInt = binaryBigInt.padStart(64, '0')

            binaryRepresentation += paddedBinaryBigInt
        }

        let k = 0;

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.cells[i][j];

                if (binaryRepresentation.charAt(k++) != '0') {
                    if (cell.north != null) {
                        cell.link(cell.north)
                    }
                }

                if (binaryRepresentation.charAt(k++) != '0') {
                    if (cell.east != null) {
                        cell.link(cell.east)
                    }
                }
            }
        }
    }
}

const cellSize = 25
let grid;
let compressedMaze;

function setupCanvas(p5) {
    const canvasWidth = cellSize * grid.width
    const canvasHeight = cellSize * grid.height

    p5.createCanvas(canvasWidth, canvasHeight);

    p5.strokeWeight(5);
}

function drawMaze(p5) {
    grid.uncompress(compressedMaze)

    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            const cell = grid.cells[i][j];

            const x1 = cell.x * cellSize
            const y1 = cell.y * cellSize
            const x2 = (cell.x + 1) * cellSize
            const y2 = (cell.y + 1) * cellSize

            if (cell.north == null) {
                p5.line(x1, y1, x2, y1)
            }

            if (cell.west == null) {
                p5.line(x1, y1, x1, y2)
            }

            if (!cell.linked(cell.east)) {
                p5.line(x2, y1, x2, y2)
            }

            if (!cell.linked(cell.south)) {
                p5.line(x1, y2, x2, y2)
            }

            
        }
    }
    p5.noLoop()
}

const xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        if (xmlHttp.status == 200) {
            let data = JSON.parse(xmlHttp.responseText)

            grid = new Grid(data.height, data.width)
            compressedMaze = data.maze

            let p5_ = new p5();
            setupCanvas(p5_);
            drawMaze(p5_);
        }
    }
}

const requestedWidth = 50
const requestedHeight = 50
const generator = "binary_tree"

xmlHttp.open("GET", `http://localhost:8080/generate/${generator}?width=${requestedWidth}&height=${requestedHeight}`, true)
xmlHttp.send();
