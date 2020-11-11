import { getGenerators, getRandomSeed, getSolvers } from './network'

function prettyPrintAlgorithm(name) {
    let prettyPrintedName = name.replaceAll('_', ' ')
    prettyPrintedName = prettyPrintedName.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());

    if (prettyPrintedName.endsWith('s')) {
        prettyPrintedName = prettyPrintedName.replace(/.$/, "'s")
    }

    return prettyPrintedName
}

function addValueToSelect(field, value) {
    const option = document.createElement('option')
    option.setAttribute('value', value)
    option.textContent = prettyPrintAlgorithm(value)
    field.append(option)
}

export function populateGenerators() {
    return getGenerators().then(generators => {
        const field = document.querySelector('#generatorToUse')
        generators.forEach(generator => {
            addValueToSelect(field, generator)
        })
        field.removeAttribute('disabled')
    })
}

export function populateSolvers() {
    return getSolvers().then(solvers => {
        const field = document.querySelector('#solverToUse')
        solvers.forEach(solver => {
            addValueToSelect(field, solver)
        })
        field.removeAttribute('disabled')
    })
}

export function populateSeed() {
    return getRandomSeed().then(seed => {
        const field = document.querySelector('#seed')
        field.value = seed
    })
}
