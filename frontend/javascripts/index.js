// initializer code 
const BASE_URL = 'http://localhost:3000'
const CHORES_URL = `${BASE_URL}/chores`

const parseJSON = response => response.json()
const addBtn = document.querySelector('#new-chore-btn')
const choreForm = document.querySelector('.container')
const choreCollection = document.querySelector("#chore-collection")

function fetchChores() {
    return fetch(CHORES_URL)
        .then(parseJSON)
}


document.addEventListener("DOMContentLoaded", () => {
    fetchChores().then(chores => {
        chores.forEach(chore => {
            console.log(chore)
        })
    })
})

