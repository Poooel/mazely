// Compute default maze size

const numberOfCellsWidth = Math.floor((window.innerWidth - offsetX) / cellSize)
const numberOfCellsHeight = Math.floor((window.innerHeight - offsetY) / cellSize)

document.querySelector('#width').value = numberOfCellsWidth
document.querySelector('#height').value = numberOfCellsHeight

const form = document.querySelector('form');

// Listeners

form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    generateNewMaze(formData)
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

function changeModalVisiblity(shouldBeVisible) {
    changeModalProperty(shouldBeVisible, ['invisible', 'visible'])
}

function changeModalOpacity(shouldBeVisible) {
    changeModalProperty(shouldBeVisible, ['opacity-0', 'opacity-100'])
}

function openModal() {
    changeModalVisiblity(true)
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
        const option = document.createElement('option')
        option.setAttribute('value', generator)
        option.textContent = generator
        field.append(option)
    })

    field.removeAttribute('disabled')
    form.requestSubmit()
})
