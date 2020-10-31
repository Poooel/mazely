function computeSize() {
    let size = {}
    let settings = getSettings()

    size.numberOfCellsWidth = Math.floor((window.innerWidth) / settings.cellSize)
    size.numberOfCellsHeight = Math.floor((window.innerHeight) / settings.cellSize)

    size.fillWidth = window.innerWidth - (size.numberOfCellsWidth * settings.cellSize)
    size.fillHeight = window.innerHeight - (size.numberOfCellsHeight * settings.cellSize)

    return size
}
