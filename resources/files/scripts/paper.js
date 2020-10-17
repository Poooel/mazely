const cellSize = 25
const offsetX = 10;
const offsetY = 10;

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

// Uses PaperScope from the window object
function drawMaze(grid, compressedMaze, start, goal) {
    grid.uncompress(compressedMaze)
    project.clear()

    drawCell(start, 'red')
    drawCell(goal, 'blue')

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
                    strokeColor: 'black',
                    strokeWidth: 10,
                    strokeCap: 'round'
                })
            }

            if (!cell.west) {
                new Path.Line({
                    from: [x1, y1],
                    to: [x1, y2],
                    strokeColor: 'black',
                    strokeWidth: 10,
                    strokeCap: 'round'
                })
            }

            if (!cell.linked(cell.east)) {
                new Path.Line({
                    from: [x2, y1],
                    to: [x2, y2],
                    strokeColor: 'black',
                    strokeWidth: 10,
                    strokeCap: 'round'
                })
            }

            if (!cell.linked(cell.south)) {
                new Path.Line({
                    from: [x1, y2],
                    to: [x2, y2],
                    strokeColor: 'black',
                    strokeWidth: 10,
                    strokeCap: 'round'
                })
            }
        }
    }
}
