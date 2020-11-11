import { setupListeners, submitForm } from './listeners'
import { setupModalListeners } from './modal'
import { populateGenerators, populateSolvers, populateSeed } from './populateFields'

setupListeners()
setupModalListeners()

Promise.all([populateGenerators(), populateSolvers(), populateSeed()]).then(() => {
    submitForm()
})