// import { project, Path } from 'paper'
import { canvasSettings } from  './canvasSettings'
import { getSettingsFromForm } from './settings'

export function findMaxDistance(xray) {
    let max = 0;

    for (let i = 0; i < xray.length; i++) {
        if (xray[i][2] > max) {
            max = xray[i][2]
        }
    }

    return max
}

export function drawXray(xray, grid, offsetX, offsetY, settings) {
    setupXrayLayer(settings)

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

export function getBoundingRectangle(cell, grid, offsetX, offsetY, settings) {
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

export function drawCell(cell, color, grid, offsetX, offsetY, settings) {
    const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

    new Path.Rectangle({
        from: boundingRectangle[0],
        to: boundingRectangle[1],
        fillColor: color
    })
}

export function drawCircle(cell, color, grid, offsetX, offsetY, settings) {
    const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

    const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
    const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

    return new Path.Circle({
        center: [x3, y3],
        radius: settings.cellSize / 4,
        fillColor: color
    })
}

export function drawLine(from, to, settings) {
    globalWalls.push(
        new Path.Line({
            from: from,
            to: to,
            strokeColor: settings.wallColor,
            strokeWidth: settings.wallThickness,
            strokeCap: "round"
        })
    )
}

export function setupXrayLayer(settings) {
    if (xrayLayer) {
        xrayLayer.remove()
    }

    canvasSettings.xrayLayer = new Layer();

    xrayLayer.blendMode = 'overlay'

    if (!settings.enableXray) {
        xrayLayer.visible = false
    }

    xrayLayer.activate()
}

export function setupWallLayer(settings) {
    if (wallLayer) {
        wallLayer.remove()
    }

    canvasSettings.wallLayer = new Layer();

    if (!settings.enableWalls) {
        wallLayer.visible = false
    }

    wallLayer.activate()
}

export function setupPathLayer(settings) {
    if (pathLayer) {
        pathLayer.remove()
    }

    canvasSettings.pathLayer = new Layer();

    if (!settings.showPath) {
        pathLayer.visible = false
    }

    pathLayer.activate()
}

export function setupStartAndGoalLayer() {
    if (startAndGoalLayer) {
        startAndGoalLayer.remove()
    }

    canvasSettings.startAndGoalLayer = new Layer();

    startAndGoalLayer.visible = true

    startAndGoalLayer.activate()
}

export function setupOffsets(fillWidth, fillHeight) {
    return [Math.floor(fillWidth / 2), Math.floor(fillHeight / 2)]
}

export function drawWalls(grid, offsetX, offsetY, settings) {
    setupWallLayer(settings)

    canvasSettings.globalWalls = []

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

export function drawPath(path, start, goal, grid, offsetX, offsetY, settings) {
    setupPathLayer(settings)
    canvasSettings.globalPath = []

    for (let i = 0; i < path.length; i++) {
        const cell = path[i]

        const boundingRectangle = getBoundingRectangle(cell, grid, offsetX, offsetY, settings)

        const x3 = (boundingRectangle[0][0] + boundingRectangle[1][0]) / 2
        const y3 = (boundingRectangle[0][1] + boundingRectangle[1][1]) / 2

        globalPath.push(
            new Path.Circle({
                center: [x3, y3],
                radius: settings.cellSize / 4,
                fillColor: settings.pathColor
            })
        )
    }

    setupStartAndGoalLayer()

    canvasSettings.globalStart = drawCircle(start, settings.startColor, grid, offsetX, offsetY, settings)
    canvasSettings.globalGoal = drawCircle(goal, settings.goalColor, grid, offsetX, offsetY, settings)

    globalStart.visible = settings.showStart
    globalGoal.visible = settings.showGoal
}

export function draw(grid, start, goal, xray, path, size) {
    project.clear()

    canvasSettings.globalGrid = grid
    canvasSettings.globalXray = xray
    canvasSettings.globalSize = size

    const settings = getSettingsFromForm()
    const offsets = setupOffsets(size.fillWidth, size.fillHeight)

    drawXray(xray, grid, offsets[0], offsets[1], settings)
    drawWalls(grid, offsets[0], offsets[1], settings)
    drawPath(path, start, goal, grid, offsets[0], offsets[1], settings)
}

view.onFrame = () => {
    const { animated, animationExecuted, animationIndex } =  canvasSettings
    if (animated && animationExecuted && (animationIndex < (globalPath.length - 1))) {
        canvasSettings.animationExecuted = false

        const cell = globalPath[animationIndex].clone(true)
        globalPath[animationIndex].visible = false
        const nextCell = globalPath[animationIndex + 1]
        const settings = getSettingsFromForm()

        cell.tweenTo({
            position: nextCell.position
        }, {
            duration: settings.animationSpeed,
            easing: 'easeOutCubic'
        }).then(function() {
            canvasSettings.animationIndex++
            canvasSettings.animationExecuted = true

            cell.tweenTo({
                opacity: 0
            }, 500)
        })
    } else if (animated && animationExecuted) {
        const cell = globalPath[animationIndex]

        cell.tweenTo({
            opacity: 0
        }, 500)

        canvasSettings.animated = false
    }
}
