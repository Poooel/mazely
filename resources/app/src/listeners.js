import { canvasSettings } from  './canvasSettings'
import { getMazeAndSolution } from './network'
import { getSettingsFromData, getSettingsFromForm } from './settings'
import { draw, drawXray, setupOffsets } from './paper'
import { closeModal } from './modal'
import { computeSize } from './size'

export function setupListeners()  {
    document.querySelector("#enableWalls").addEventListener('change', function() {
        canvasSettings.wallLayer.visible = this.checked
    })
    
    document.querySelector("#enableXray").addEventListener('change', function() {
        canvasSettings.xrayLayer.visible = this.checked
    })
    
    document.querySelector("#showPath").addEventListener('change', function() {
        canvasSettings.pathLayer.visible = this.checked
    })
    
    document.querySelector("form#settings").addEventListener('submit', e => {
        console.log('e', e)
        e.preventDefault()
        
        console.log('e', e)
        const formData = new FormData(e.target)
        console.log('formData', formData)
        const size = computeSize()
        const settings = getSettingsFromData(formData)
        formData.append('width', size.numberOfCellsWidth)
        formData.append('height', size.numberOfCellsHeight)
    
        if (!settings.fromSeed) {
            formData.delete('seed')
        }
    
        getMazeAndSolution(formData).then(data => {
            const grid = new Grid(data.height, data.width)
            grid.uncompress(data.maze)
    
            document.querySelector("#seed").value = data.seed
    
            draw(grid, data.start, data.goal, data.xray, data.pathToGoal, size)
        })
    })
    
    window.addEventListener('resize', e => {
        const form = document.querySelector('form#settings')
        clearTimeout(window.resizedFinished)
        window.resizedFinished = setTimeout(form.requestSubmit, 250)
    })
    
    document.querySelector("#wallColor").addEventListener('input', e => {
        for (let i = 0; i < canvasSettings.globalWalls.length; i++) {
            canvasSettings.globalWalls[i].strokeColor = e.target.value
        }
    })
    
    document.querySelector("#cellBackgroundColor").addEventListener('input', e => {
        document.querySelector("#maze").style.background = e.target.value
    })
    
    document.querySelector("#wallThickness").addEventListener('input', e => { 
        for (let i = 0; i < canvasSettings.globalWalls.length; i++) {
            canvasSettings.globalWalls[i].strokeWidth = e.target.value
        }
    })
    
    document.querySelector("#xrayColor").addEventListener('input', e => {
        let offsets = setupOffsets(canvasSettings.globalSize.fillWidth, canvasSettings.globalSize.fillHeight)
        let settings = getSettingsFromForm()
    
        drawXray(canvasSettings.globalXray, canvasSettings.globalGrid, offsets[0], offsets[1], settings)
    })
    
    document.querySelector("#startColor").addEventListener('input', e => {
        canvasSettings.globalStart.fillColor = e.target.value
    })
    
    document.querySelector("#goalColor").addEventListener('input', e => {
        canvasSettings.globalGoal.fillColor = e.target.value
    })
    
    document.querySelector("#pathColor").addEventListener('input', e => {
        for (let i = 0; i < canvasSettings.globalPath.length; i++) {
            canvasSettings.globalPath[i].fillColor = e.target.value
        }
    })
    
    document.querySelector("#showStart").addEventListener('change', function() {
        canvasSettings.globalStart.visible = this.checked
    })
    
    document.querySelector("#showGoal").addEventListener('change', function() {
        canvasSettings.globalGoal.visible = this.checked
    })
    
    document.querySelector("#startAnimation").addEventListener('click', e => {
        canvasSettings.animated = true
        closeModal()
    })
    
    document.querySelector("#pauseAnimation").addEventListener('click', e => {
        canvasSettings.animated = false
    })
    
    document.querySelector("#rewindAnimation").addEventListener('click', e => {
        canvasSettings.animated = false
        canvasSettings.animationIndex = 0
        canvasSettings.animationExecuted = true
    
        for (let i = 0; i < canvasSettings.globalPath.length; i++) {
            canvasSettings.globalPath[i].visible = true
        }
    })
}

export function submitForm() {
    document.querySelector("form#settings").requestSubmit()
}
