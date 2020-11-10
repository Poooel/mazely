import { setupListeners, submitForm } from './listeners'
import { setupModalListeners, setupAccordionListeners } from './modal'
import { populateGenerators, populateSolvers, populateSeed } from './populateFields'

setupListeners()
setupModalListeners()
setupAccordionListeners()

Promise.all([populateGenerators(), populateSolvers(), populateSeed()]).then(() => {
    submitForm()
})