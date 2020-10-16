function generateNewMaze(formData) {
    const generator = formData.get('generator')
    const width = formData.get('width')
    const height = formData.get('height')
    
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                const data = JSON.parse(xmlHttp.responseText)

                const grid = new Grid(data.height, data.width)
                const compressedMaze = data.maze

                drawMaze(grid, compressedMaze);
            }
        }
    }

    xmlHttp.open("GET", "/generate/" + generator + "?width=" + width + "&height=" + height, true)
    xmlHttp.send();
}