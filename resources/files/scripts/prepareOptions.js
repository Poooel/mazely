// Compute default maze size

var numberOfCellsWidth = Math.floor((window.innerWidth) / cellSize)
var numberOfCellsHeight = Math.floor((window.innerHeight) / cellSize)

var fillWidth = window.innerWidth - (numberOfCellsWidth * cellSize)
var fillHeight = window.innerHeight - (numberOfCellsHeight * cellSize)

const form = document.querySelector('form');

// Listeners

form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    generateNewMaze(formData)
})

document.querySelector("#xray").addEventListener('change', function() {
    firstLayer.visible = this.checked
});

window.addEventListener('resize', e => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
        numberOfCellsWidth = Math.floor((window.innerWidth) / cellSize)
        numberOfCellsHeight = Math.floor((window.innerHeight) / cellSize)

        fillWidth = window.innerWidth - (numberOfCellsWidth * cellSize)
        fillHeight = window.innerHeight - (numberOfCellsHeight * cellSize)

        form.requestSubmit()
    }, 250);
})

function getModalComponents() {
    const modalBackground = document.querySelector('#modalBackground')
    const modal = document.querySelector('#modal')
    return [modal, modalBackground]
}

/**
 * Replace takes 2 parameters: old class and new class.
 * We can spread an array into function arguments using `...`. We can take
 * advantage of this mechanism to reverse the parameters and replace the
 * classes depending on `shouldBeVisible` with only 1 function call.
 */
function changeModalProperty(shouldBeVisible, properties) {
    const [modal, modalBackground] = getModalComponents()
    const property = shouldBeVisible ? properties : properties.reverse()

    modalBackground.classList.replace(...property)
    modal.classList.replace(...property)
}

function changeModalVisibility(shouldBeVisible) {
    changeModalProperty(shouldBeVisible, ['invisible', 'visible'])
}

function changeModalOpacity(shouldBeVisible) {
    changeModalProperty(shouldBeVisible, ['opacity-0', 'opacity-100'])
}

function openModal() {
    changeModalVisibility(true)
    changeModalOpacity(true)
}


function turnInvisibleListener(e) {
    e.target.classList.replace(...['visible', 'invisible'])
    e.target.removeEventListener('transitionend', turnInvisibleListener)
}

function closeModal() {
    changeModalOpacity(false)

    getModalComponents().forEach(component => {
        component.addEventListener('transitionend', turnInvisibleListener)
    })
}

document.querySelector('#openOptions').addEventListener('click', () => 
    openModal()
)

document.querySelector('#closeOptions').addEventListener('click', () => 
    closeModal()
)

document.querySelector('#modalBackground').addEventListener('click', () => 
    closeModal()
)

// Fetch generators and add options to dropdown

getGenerators().then(generators => {
    const field = document.querySelector('#generator')

    generators.forEach(generator => {
        let generatorToDisplay = generator.replaceAll('_', ' ')
        generatorToDisplay = generatorToDisplay.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});

        const option = document.createElement('option')
        option.setAttribute('value', generator)
        option.textContent = generatorToDisplay
        field.append(option)
    })

    field.removeAttribute('disabled')
    form.requestSubmit()
})
