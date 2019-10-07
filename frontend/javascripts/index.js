// initializer code 
const BASE_URL = 'http://localhost:3000'
const CHORES_URL = `${BASE_URL}/chores`

const parseJSON = response => response.json()
const addBtn = document.querySelector('#new-chore-btn')
const choreForm = document.querySelector('.container')
const choreCollection = document.querySelector("#chore-collection")

let addChore = false 

function fetchChores() {
    return fetch(CHORES_URL)
        .then(parseJSON)
}

function renderChores(chore) {
    let h2 = document.createElement('h2')
    h2.innerHTML = `${chore.name}`

    let p = document.createElement('p')
    p.setAttribute('class', 'chore-status')
    p.innerHTML = `Status: ${chore.status}`

    let completeBtn = document.createElement('button')
    completeBtn.setAttribute('class', 'complete-btn')
    completeBtn.innerText = 'Completed!'
    // add event listener to completeBtn

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, p, completeBtn)
    choreCollection.append(divCard)
}

addBtn.addEventListener('click', () => {
    //hide and seek feature with add new chore form
    addChore = !addChore
    if (addChore) {
        choreForm.style.display = 'block'
        // add event listener for postChore
    } else {
        choreForm.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", () => {
    fetchChores().then(chores => {
        chores.forEach(chore => {
            renderChores(chore)
            
        })
    })
})

