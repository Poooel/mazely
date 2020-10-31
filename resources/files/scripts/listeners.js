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
