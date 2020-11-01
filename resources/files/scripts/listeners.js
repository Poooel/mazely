document.querySelector("#enableWalls").addEventListener('change', function() {
    wallLayer.visible = this.checked
});

document.querySelector("#enableXray").addEventListener('change', function() {
    xrayLayer.visible = this.checked
});

document.querySelector("#showPath").addEventListener('change', function() {
    pathLayer.visible = this.checked
});

document.querySelector("#generateAndSolve").addEventListener('click', e => {
    generateAndSolveMaze()
})

window.addEventListener('resize', e => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
        generateAndSolveMaze()
    }, 250);
})

document.querySelector("#wallColor").addEventListener('input', e => {
    let color = e.target.value

    for (let i = 0; i < globalWalls.length; i++) {
        globalWalls[i].strokeColor = color
    }
})

document.querySelector("#cellBackgroundColor").addEventListener('input', e => {
    let color = e.target.value

    document.querySelector("#maze").style.background = color
})

document.querySelector("#wallThickness").addEventListener('input', e => {
    let thickness = e.target.value

    for (let i = 0; i < globalWalls.length; i++) {
        globalWalls[i].strokeWidth = thickness
    }
})

document.querySelector("#generator").addEventListener('input', e => {
    generateAndSolveMaze()
})

document.querySelector("#cellSize").addEventListener('input', e => {
    generateAndSolveMaze()
})

document.querySelector("#xrayColor").addEventListener('input', e => {
    let offsets = setupOffsets(globalSize.fillWidth, globalSize.fillHeight)
    let settings = getSettings()

    drawXray(globalXray, globalGrid, offsets[0], offsets[1], settings)
})

document.querySelector("#startColor").addEventListener('input', e => {
    let color = e.target.value
    globalStart.fillColor = color
})

document.querySelector("#goalColor").addEventListener('input', e => {
    let color = e.target.value
    globalGoal.fillColor = color
})

document.querySelector("#pathColor").addEventListener('input', e => {
    let color = e.target.value

    for (let i = 0; i < globalPath.length; i++) {
        globalPath[i].fillColor = color
    }
})

document.querySelector("#showStart").addEventListener('change', function() {
    globalStart.visible = this.checked
})

document.querySelector("#showGoal").addEventListener('change', function() {
    globalGoal.visible = this.checked
})

document.querySelector("#placeStartAndGoal").addEventListener('input', e => {
    generateAndSolveMaze(true)
})

document.querySelector("#startAnimation").addEventListener('click', e => {
    animated = true
    closeModal()
})

document.querySelector("#pauseAnimation").addEventListener('click', e => {
    animated = false
})
