const cellSize = 50
let grid;
let compressedMaze;

function setupCanvas(p5) {
    const canvasWidth = cellSize * grid.width
    const canvasHeight = cellSize * grid.height

    p5.createCanvas(canvasWidth, canvasHeight);

    p5.strokeWeight(10);
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

            if (!cell.north) {
                p5.line(x1, y1, x2, y1)
            }

            if (!cell.west) {
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

xmlHttp.open("GET", `/generate/${generator}?width=${requestedWidth}&height=${requestedHeight}`, true)
xmlHttp.send();
