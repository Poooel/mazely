import { getSettingsFromForm } from './settings'

export function computeSize() {
    const {cellSize} = getSettingsFromForm()
    const {innerWidth, innerHeight} = window
    const numberOfCellsWidth = Math.floor(innerWidth / cellSize)
    const numberOfCellsHeight = Math.floor(innerHeight / cellSize)

    return {
        numberOfCellsWidth,
        numberOfCellsHeight,
        fillWidth: innerWidth - (numberOfCellsWidth * cellSize),
        fillHeight: innerHeight - (numberOfCellsHeight * cellSize)
    }
}
