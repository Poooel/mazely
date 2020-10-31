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

function drawXray(xray, grid, offsetX, offsetY, settings) {
    xrayLayer.activate()

    const maximum = findMaxDistance(xray)

    for (let i = 0; i < xray.length; i++) {
        const x = xray[i][0]
        const y = xray[i][1]

        const distance = xray[i][2]
        const intensity = (maximum - distance) / maximum

        const dark = Math.floor(255 * intensity)
        const bright = 128 + Math.floor(127 * intensity)

        let color

        switch (settings.xrayColor) {
            case "black":
                color = new Color(`rgb(${dark}, ${dark}, ${dark})`)
                break;
            case "blue":
                color = new Color(`rgb(${dark}, ${dark}, ${bright})`)
                break;
            case "red":
                color = new Color(`rgb(${bright}, ${dark}, ${dark})`)
                break;
            case "green":
                color = new Color(`rgb(${dark}, ${bright}, ${dark})`)
                break;
            case "yellow":
                color = new Color(`rgb(${bright}, ${bright}, ${dark})`)
                break;
            case "turquoise":
                color = new Color(`rgb(${dark}, ${bright}, ${bright})`)
                break;
            case "magenta":
                color = new Color(`rgb(${bright}, ${dark}, ${bright})`)
                break;
            case "grey":
                color = new Color(`rgb(${bright}, ${bright}, ${bright})`)
                break;
        }

        drawCell({ x: x, y: y }, color, grid, offsetX, offsetY, settings)
    }
}

function getBoundingRectangle(cell, grid, offsetX, offsetY, settings) {
    const x1 = (cell.x * settings.cellSize) + offsetX
    const y1 = (cell.y * settings.cellSize) + offsetY
    const x2 = ((cell.x + 1) * settings.cellSize) + offsetX
    const y2 = ((cell.y + 1) * settings.cellSize) + offsetY

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

function drawCell(cell, color, grid, offsetX, offsetY, settings) {
    const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

    new Path.Rectangle({
        from: boundingRectangle[0],
        to: boundingRectangle[1],
        fillColor: color
    })
}

function drawCircle(cell, color, grid, offsetX, offsetY, settings) {
    const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

    const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
    const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

    new Path.Circle({
        center: [x3, y3],
        radius: settings.cellSize / 4,
        fillColor: color
    })
}

function drawLine(from, to, settings) {
    new Path.Line({
        from: from,
        to: to,
        strokeColor: settings.wallColor,
        strokeWidth: settings.wallThickness,
        strokeCap: "round"
    })
}

function setupLayers(settings) {
    xrayLayer = new Layer();
    wallLayer = new Layer();
    pathLayer = new Layer();

    if (!settings.enableXray) {
        xrayLayer.visible = false
    }

    if (!settings.enableWalls) {
        wallLayer.visible = false
    }

    if (!settings.showPath) {
        pathLayer.visible = false
    }
}

function setupOffsets(fillWidth, fillHeight) {
    return [Math.floor(fillWidth / 2), Math.floor(fillHeight / 2)]
}

function drawWalls(grid, offsetX, offsetY, settings) {
    wallLayer.activate()

    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            const cell = grid.cells[y][x];

            const x1 = (cell.x * settings.cellSize) + offsetX
            const y1 = (cell.y * settings.cellSize) + offsetY
            const x2 = ((cell.x + 1) * settings.cellSize) + offsetX
            const y2 = ((cell.y + 1) * settings.cellSize) + offsetY

            if (!cell.linked(cell.east)) {
                if (x != grid.width - 1) {
                    if (y == 0) {
                        drawLine([x2, 0], [x2, y2], settings)
                    } else if (y == grid.height - 1) {
                        drawLine([x2, y1], [x2, window.innerHeight], settings)
                    } else {
                        drawLine([x2, y1], [x2, y2], settings)
                    }
                }
            }

            if (!cell.linked(cell.south)) {
                if (y != grid.height - 1) {
                    if (x == 0) {
                        drawLine([0, y2], [x2, y2], settings)
                    } else if (x == grid.width - 1) {
                        drawLine([x1, y2], [window.innerWidth, y2], settings)
                    } else {
                        drawLine([x1, y2], [x2, y2], settings)
                    }
                }
            }
        }
    }
}

function drawPath(path, start, goal, grid, offsetX, offsetY, settings) {
    pathLayer.activate()

    for (let i = 0; i < path.length; i++) {
        const cell = path[i]

        const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

        const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
        const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

        new Path.Circle({
            center: [x3, y3],
            radius: settings.cellSize / 4,
            fillColor: settings.pathColor
        })
    }

    drawCircle(start, settings.startColor, grid, offsetX, offsetY, settings)
    drawCircle(goal, settings.goalColor, grid, offsetX, offsetY, settings)
}

function draw(grid, start, goal, xray, path, size) {
    project.clear()

    let settings = getSettings()
    let offsets = setupOffsets(size.fillWidth, size.fillHeight)

    setupLayers(settings)

    drawXray(xray, grid, offsets[0], offsets[1], settings)
    drawPath(path, start, goal, grid, offsets[0], offsets[1], settings)
    drawWalls(grid, offsets[0], offsets[1], settings)
}
