function getModalComponents() {
    const modalBackground = document.querySelector('#modalBackground')
    const modal = document.querySelector('#modal')
    return [modal, modalBackground]
}

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

export function openModal() {
    changeModalVisibility(true)
    changeModalOpacity(true)
}


function turnInvisibleListener(e) {
    e.target.classList.replace(...['visible', 'invisible'])
    e.target.removeEventListener('transitionend', turnInvisibleListener)
}

export function closeModal() {
    changeModalOpacity(false)

    getModalComponents().forEach(component => {
        component.addEventListener('transitionend', turnInvisibleListener)
    })
}

export function setupModalListeners () {
    document.querySelector('#openOptions').addEventListener('click', () =>
        openModal()
    )
    
    document.querySelector('#closeOptions').addEventListener('click', () =>
        closeModal()
    )
    
    document.querySelector('#modalBackground').addEventListener('click', () => {
        closeModal()
        document.querySelectorAll('div[data-accordion]').forEach(item => {
            item.classList.add('hidden', 'h-0')
        })
    })
}
