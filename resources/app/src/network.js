export function getRandomSeed() {
    return fetch('/api/random/long').then(resp => resp.text())
}

export function getMazeAndSolution(mazeConfig) {
    return fetch('/api/generate/solve',
    {
        body: JSON.stringify(mazeConfig),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
}

export function getGenerators() {
    return fetch('/api/available/generator').then(resp => resp.json())
}

export function getSolvers() {
    return fetch('/api/available/solver').then(resp => resp.json())
}
