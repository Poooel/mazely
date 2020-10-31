function generateAndSolveMaze() {
    let size = computeSize()

    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                let grid = new Grid(data.height, data.width)
                grid.uncompress(data.maze)

                draw(grid, data.start, data.goal, data.xray, data.pathToGoal, size);
            }
        }
    }

    const generator = document.querySelector("#generator").value
    const solver = document.querySelector("#solver").value
    const startAndGoalToUse = document.querySelector("#placeStartAndGoal").value

    const body = {
        width: size.numberOfCellsWidth,
        height: size.numberOfCellsHeight,
        generatorToUse: generator,
        startAndGoalToUse: startAndGoalToUse,
        solverToUse: solver
    }

    xmlHttp.open("POST", '/generate/solve', true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}
