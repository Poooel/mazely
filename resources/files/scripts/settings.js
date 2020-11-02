function getSettings() {
    let settings = {}

    settings.enableWalls = document.querySelector("#enableWalls").checked
    settings.wallThickness = document.querySelector("#wallThickness").value
    settings.wallColor = document.querySelector("#wallColor").value

    settings.cellBackgroundColor = document.querySelector("#cellBackgroundColor").value
    settings.cellSize = document.querySelector("#cellSize").value

    settings.enableXray = document.querySelector("#enableXray").checked
    settings.xrayColor = document.querySelector("#xrayColor").value

    settings.placeStartAndGoal = document.querySelector("#placeStartAndGoal").value

    settings.startColor = document.querySelector("#startColor").value
    settings.showStart = document.querySelector("#showStart").checked

    settings.goalColor = document.querySelector("#goalColor").value
    settings.showGoal = document.querySelector("#showGoal").checked

    settings.showPath = document.querySelector("#showPath").checked
    settings.pathColor = document.querySelector("#pathColor").value
    settings.animationSpeed = document.querySelector("#animationSpeed").value

    return settings
}
