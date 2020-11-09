export const allo = () => {
  console.log("allooooo ??")
  fetch('/available/generator').then(resp => resp.json()).then(data => {
      console.log('data', data)
  })
}
