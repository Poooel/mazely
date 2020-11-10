class CanvasSettings {
    constructor() {
        this.xrayLayer = null
        this.wallLayer = null
        this.pathLayer = null
        this.startAndGoalLayer = null

        this.globalWalls = []
        this.globalGrid = null
        this.globalXray = null
        this.globalSize = null

        this.globalStart = null
        this.globalGoal  = null

        this.globalPath = null

        this.animated = false
        this.animationIndex = 0
        this.animationExecuted = true
    }
}

export let canvasSettings = new CanvasSettings()
