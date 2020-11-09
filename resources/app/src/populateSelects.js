function prettyPrintAlgorithm(name) {
    let prettyPrintedName = name.replaceAll('_', ' ')
    prettyPrintedName = prettyPrintedName.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});

    if (prettyPrintedName.endsWith('s')) {
        prettyPrintedName = prettyPrintedName.replace(/.$/, "'s")
    }

    return prettyPrintedName
}

function populateSelect(field, value) {
    const option = document.createElement('option')
    option.setAttribute('value', value)
    option.textContent = prettyPrintAlgorithm(value)
    field.append(option)
}

fetch('/api/available/generator').then(resp => resp.json()).then(generators => {
    const field = document.querySelector('#generator')

    generators.forEach(generator => {
        populateSelect(field, generator)
    })

    field.removeAttribute('disabled')
}).then(e => {
    fetch('/api/available/solver').then(resp => resp.json()).then(solvers => {
        const field = document.querySelector('#solver')

        solvers.forEach(solver => {
            populateSelect(field, solver)
        })

        field.removeAttribute('disabled')
    }).then(e => {
        generateAndSolveMaze()
    })
})
