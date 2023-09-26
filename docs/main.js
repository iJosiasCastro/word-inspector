const Reverso = require('reverso-api')
const reverso = new Reverso()

document.addEventListener('DOMContentLoaded', () => {
    reverso.getConjugation('play', 'english', (err, response) => {
        if (err) throw new Error(err.message)
    
        console.log(response)
    })
})
