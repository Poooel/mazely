const settings = document.querySelector('form#settings')

export function getSettingsFromForm(formElement = settings) {
    return getSettingsFromData(new FormData(formElement))
}

export function getSettingsFromData(formData) {
    const data = {}
    for(const [k, v] of formData) {
        data[k] = v
    }
    return data
}
