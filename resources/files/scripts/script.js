var cellSize = 25
var offsetX = 10;
var offsetY = 10;
var grid;
var compressedMaze;

function drawMaze() {
    grid.uncompress(compressedMaze)

    for (var i = 0; i < grid.height; i++) {
        for (var j = 0; j < grid.width; j++) {
            var cell = grid.cells[i][j];

            var x1 = (cell.x * cellSize) + offsetX
            var y1 = (cell.y * cellSize) + offsetY
            var x2 = ((cell.x + 1) * cellSize) + offsetX
            var y2 = ((cell.y + 1) * cellSize) + offsetY

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

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        if (xmlHttp.status == 200) {
            var data = JSON.parse(xmlHttp.responseText)

            grid = new Grid(data.height, data.width)
            compressedMaze = data.maze

            drawMaze();
        }
    }
}

var requestedWidth = 50
var requestedHeight = 50
var generator = "binary_tree"

xmlHttp.open("GET", "/generate/" + generator + "?width=" + requestedWidth + "&height=" + requestedHeight, true)
xmlHttp.send();
