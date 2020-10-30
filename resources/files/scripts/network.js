var grid
var start
var goal
var xray
var compressedMaze

function generateNewMaze(selectedAlgorithm) {
    const width = numberOfCellsWidth
    const height = numberOfCellsHeight
    const generator = selectedAlgorithm
    
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                grid = new Grid(data.height, data.width)
                compressedMaze = data.maze
                grid.uncompress(compressedMaze)
                start = data.start
                goal = data.goal
                xray = data.xray

                drawMaze(grid, start, goal, xray);
            }
        }
    }

    const body = {
        generatorToUse: generator,
        width: width,
        height: height
    }

    xmlHttp.open("POST", '/generate', true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}

function solveMaze(selectedAlgorithm) {
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                drawPath(data.pathToGoal)
            }
        }
    }

    const body = {
        solverToUse: selectedAlgorithm,
        width: numberOfCellsWidth,
        height: numberOfCellsHeight,
        start: start,
        goal: goal,
        compressedMaze: compressedMaze
    }

    xmlHttp.open("POST", '/solve', true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}

const getGenerators = () => fetch('/available/generator').then(resp => resp.json())
const getSolvers = () => fetch('/available/solver').then(resp => resp.json())
