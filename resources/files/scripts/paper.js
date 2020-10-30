const cellSize = 25;

const strokeColor = "black";
const strokeWidth = 10;
const strokeCap = "round";

let offsetX = 0;
let offsetY = 0;

var xrayLayer;
var wallLayer;
var pathLayer;

function findMaxDistance(xray) {
    let max = 0;

    for (let i = 0; i < xray.length; i++) {
        if (xray[i][2] > max) {
            max = xray[i][2]
        }
    }

    return max
}

function drawXray(xray, grid) {
    const maximum = findMaxDistance(xray)

    xrayLayer.activate()

    for (let i = 0; i < xray.length; i++) {
        const x = xray[i][0]
        const y = xray[i][1]

        const distance = xray[i][2]
        const intensity = (maximum - distance) / maximum

        const dark = Math.floor(255 * intensity)
        const bright = 128 + Math.floor(127 * intensity)

        /*
         * ddd - black
         * ddb - blue
         * bdd - red
         * dbd - green
         * bbd - yellow
         * dbb - turquoise
         * bdb - magenta
         * bbb - grey
         */

        drawCell({ x: x, y: y }, new Color(`rgb(${dark}, ${bright}, ${bright})`), grid)
    }
}

function getBoundingRectangle(cell, grid) {
    const x1 = (cell.x * cellSize) + offsetX
    const y1 = (cell.y * cellSize) + offsetY
    const x2 = ((cell.x + 1) * cellSize) + offsetX
    const y2 = ((cell.y + 1) * cellSize) + offsetY

    if (cell.x == 0 && cell.y == 0) {
        return [[0, 0], [x2, y2]]
    } else if (cell.x == grid.width - 1 && cell.y == grid.height - 1) {
        return [[x1, y1], [window.innerWidth, window.innerHeight]]
    } else if (cell.x == grid.width - 1 && cell.y == 0) {
        return [[x1, 0], [window.innerWidth, y2]]
    } else if (cell.x == 0 && cell.y == grid.height - 1) {
        return [[0, y1], [x2, window.innerHeight]]
    } else if (cell.x == grid.width - 1) {
        return [[x1, y1], [window.innerWidth, y2]]
    } else if (cell.y == grid.height - 1) {
        return [[x1, y1], [x2, window.innerHeight]]
    } else if (cell.x == 0) {
        return [[0, y1], [x2, y2]]
    } else if (cell.y == 0) {
        return [[x1, 0], [x2, y2]]
    } else {
        return [[x1, y1], [x2, y2]]
    }
}

function drawCell(cell, color, grid) {
    const boundingRectangle = getBoundingRectangle(cell, grid)

    new Path.Rectangle({
        from: boundingRectangle[0],
        to: boundingRectangle[1],
        fillColor: color
    })
}

function drawCircle(cell, color, grid) {
    const boundingRectangle = getBoundingRectangle(cell, grid)

    const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
    const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

    new Path.Circle({
        center: [x3, y3],
        radius: cellSize / 4,
        fillColor: color
    })
}

function drawLine(from, to) {
    new Path.Line({
        from: from,
        to: to,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        strokeCap: strokeCap
    })
}

function setupLayers() {
    xrayLayer = new Layer();
    wallLayer = new Layer();
    pathLayer = new Layer();
}

function setupOffsets() {
    offsetX = Math.floor(fillWidth / 2);
    offsetY = Math.floor(fillHeight / 2);
}

function drawMaze(grid, start, goal, xray) {
    project.clear()

    setupLayers()
    setupOffsets()

    drawXray(xray, grid)

    if (!document.querySelector("#xray").checked) {
        xrayLayer.visible = false
    }

    wallLayer.activate()

    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            const cell = grid.cells[y][x];

            const x1 = (cell.x * cellSize) + offsetX
            const y1 = (cell.y * cellSize) + offsetY
            const x2 = ((cell.x + 1) * cellSize) + offsetX
            const y2 = ((cell.y + 1) * cellSize) + offsetY

            if (!cell.linked(cell.east)) {
                if (x != grid.width - 1) {
                    if (y == 0) {
                        drawLine([x2, 0], [x2, y2])
                    } else if (y == grid.height - 1) {
                        drawLine([x2, y1], [x2, window.innerHeight])
                    } else {
                        drawLine([x2, y1], [x2, y2])
                    }
                }
            }

            if (!cell.linked(cell.south)) {
                if (y != grid.height - 1) {
                    if (x == 0) {
                        drawLine([0, y2], [x2, y2])
                    } else if (x == grid.width - 1) {
                        drawLine([x1, y2], [window.innerWidth, y2])
                    } else {
                        drawLine([x1, y2], [x2, y2])
                    }
                }
            }
        }
    }
}

function drawPath(path) {
    pathLayer.activate()

    for (let i = 0; i < path.length; i++) {
        const cell = path[i]

        const boundingRectangle = getBoundingRectangle(cell, grid)

        const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
        const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

        new Path.Circle({
            center: [x3, y3],
            radius: cellSize / 4,
            fillColor: 'magenta'
        })
    }

    drawCircle(start, 'red', grid)
    drawCircle(goal, 'green', grid)
}
