async function generateAndSolveMaze(bypassFromSeed) {
    let size = computeSize()

    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                let grid = new Grid(data.height, data.width)
                grid.uncompress(data.maze)

                document.querySelector("#seed").value = data.seed

                draw(grid, data.start, data.goal, data.xray, data.pathToGoal, size);
            }
        }
    }

    if (!bypassFromSeed) {
        if (!document.querySelector("#fromSeed").checked) {
            await fetch('/api/random/long').then(resp => resp.text()).then(long => {
                document.querySelector("#seed").value = long
            })
        }
    }

    const generator = document.querySelector("#generator").value
    const solver = document.querySelector("#solver").value
    const startAndGoalToUse = document.querySelector("#placeStartAndGoal").value
    const seed = document.querySelector("#seed").value

    const body = {
        width: size.numberOfCellsWidth,
        height: size.numberOfCellsHeight,
        generatorToUse: generator,
        startAndGoalToUse: startAndGoalToUse,
        solverToUse: solver,
        seed: seed
    }

    xmlHttp.open("POST", '/api/generate/solve', true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}
