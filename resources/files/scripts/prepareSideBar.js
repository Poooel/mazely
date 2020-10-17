$('form').on('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    generateNewMaze(formData)
})

getGenerators().then(generators => {
    const field = $('select[name="generator"]')
    generators.forEach(generator => {
        const option = document.createElement('option')
        option.setAttribute('value', generator)
        option.textContent = generator
        field.append(option)
    })
    field.attr('disabled', false)
})