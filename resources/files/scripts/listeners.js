document.querySelector("#generateAndSolve").addEventListener('click', e => {
    generateNewMaze(document.querySelector("#generator").value)
})

document.querySelector("#enableWalls").addEventListener('change', function() {
    wallLayer.visible = this.checked
});

document.querySelector("#enableXray").addEventListener('change', function() {
    xrayLayer.visible = this.checked
});

document.querySelector("#showPath").addEventListener('change', function() {
    pathLayer.visible = this.checked
});

window.addEventListener('resize', e => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
        computeSize()
        document.querySelector("#generateAndSolve").click()
    }, 250);
})

window.addEventListener('load', e => {
    computeSize()
})
