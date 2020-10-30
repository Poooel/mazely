var numberOfCellsWidth
var numberOfCellsHeight

var fillWidth
var fillHeight

function computeSize() {
    numberOfCellsWidth = Math.floor((window.innerWidth) / cellSize)
    numberOfCellsHeight = Math.floor((window.innerHeight) / cellSize)

    fillWidth = window.innerWidth - (numberOfCellsWidth * cellSize)
    fillHeight = window.innerHeight - (numberOfCellsHeight * cellSize)
}
