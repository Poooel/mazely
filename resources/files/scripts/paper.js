const cellSize = 25;
const offsetX = 7;
const offsetY = 7;
const strokeColor = "black";
const strokeWidth = 10;
const strokeCap = "round";

var firstLayer;
var secondLayer;

function findMaxDistance(xray) {
    let max = 0;

    for (let i = 0; i < xray.length; i++) {
        if (xray[i][2] > max) {
            max = xray[i][2]
        }
    }

    return max
}

function drawXray(xray) {
    const maximum = findMaxDistance(xray)

    firstLayer.activate()

    for (let i = 0; i < xray.length; i++) {
        const distance = xray[i][2]
        const intensity = (maximum - distance) / maximum

        const dark = Math.floor(255 * intensity)
        const bright = 128 + Math.floor(127 * intensity)

        drawCell({ x: xray[i][0], y: xray[i][1] }, new Color(`rgb(${dark}, ${dark}, ${bright})`))
    }
}

function drawCell(cell, color) {
    const x1 = (cell.x * cellSize) + offsetX
    const y1 = (cell.y * cellSize) + offsetY
    const x2 = ((cell.x + 1) * cellSize) + offsetX
    const y2 = ((cell.y + 1) * cellSize) + offsetY

    new Path.Rectangle({
        from: [x1, y1],
        to: [x2, y2],
        fillColor: color
    })
}

function drawCircle(cell, color) {
    const x1 = (cell.x * cellSize) + offsetX
    const y1 = (cell.y * cellSize) + offsetY
    const x2 = ((cell.x + 1) * cellSize) + offsetX
    const y2 = ((cell.y + 1) * cellSize) + offsetY

    const x3 = (x1 + x2) / 2
    const y3 = (y1 + y2) / 2

    new Path.Circle({
        center: [x3, y3],
        radius: cellSize / 4,
        fillColor: color
    })
}

// Uses PaperScope from the window object
function drawMaze(grid, start, goal, xray) {
    project.clear()

    firstLayer = new Layer();
    secondLayer = new Layer();

    drawXray(xray)

    if (!document.querySelector("#xray").checked) {
        firstLayer.visible = false
    }

    secondLayer.activate()

    drawCircle(start, 'red')
    drawCircle(goal, 'green')

    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            const cell = grid.cells[i][j];

            const x1 = (cell.x * cellSize) + offsetX
            const y1 = (cell.y * cellSize) + offsetY
            const x2 = ((cell.x + 1) * cellSize) + offsetX
            const y2 = ((cell.y + 1) * cellSize) + offsetY

            if (!cell.north) {
                new Path.Line({
                    from: [x1, y1],
                    to: [x2, y1],
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeCap: strokeCap
                })
            }

            if (!cell.west) {
                new Path.Line({
                    from: [x1, y1],
                    to: [x1, y2],
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeCap: strokeCap
                })
            }

            if (!cell.linked(cell.east)) {
                new Path.Line({
                    from: [x2, y1],
                    to: [x2, y2],
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeCap: strokeCap
                })
            }

            if (!cell.linked(cell.south)) {
                new Path.Line({
                    from: [x1, y2],
                    to: [x2, y2],
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeCap: strokeCap
                })
            }
        }
    }
}
