var grid
var start
var goal
var xray

function generateNewMaze(formData) {
    const width = numberOfCellsWidth
    const height = numberOfCellsHeight
    const generator = formData.get('generator')
    
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                grid = new Grid(data.height, data.width)
                grid.uncompress(data.maze)
                start = data.start
                goal = data.goal
                xray = data.xray

                drawMaze(grid, start, goal, xray);
            }
        }
    }

    xmlHttp.open("GET", `/generate/${generator}?width=${width}&height=${height}`, true)
    xmlHttp.send();
}

const getGenerators = () => fetch('/available/generator').then(resp => resp.json())