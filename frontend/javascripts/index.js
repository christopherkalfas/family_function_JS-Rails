// initializer code 
const BASE_URL = 'http://localhost:3000'
const CHORES_URL = `${BASE_URL}/chores`
const HOUSE_HOLD_URL = `${BASE_URL}/house_holds`

const parseJSON = response => response.json()
const addBtn = document.querySelector('#new-chore-btn')
const choreForm = document.querySelector('.container')
const choreCollection = document.querySelector("#chore-collection")
const familyChoresBelongTo = document.getElementById('family-chore-list')
const select = document.getElementById('select')
const tryIt = document.getElementById('try-it')

let addChore = false 

function fetchChores() {
    return fetch(CHORES_URL)
        .then(parseJSON)
}

function fetchHouseHolds(){
    return fetch(HOUSE_HOLD_URL)
        .then(parseJSON)
        .then( houseHolds => renderDropDownOptions(houseHolds))
}

function postChore(choreData) {

    let formData = {
        "name": choreData.name.value,
        "status": choreData.status = "Incomplete",
        'house_hold_id': choreData.dataset.id
    }

    let configObj = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    return fetch(CHORES_URL, configObj)
        .then(response => response.json())
        .then((choreObj) => {
            let newChore = renderChores(choreObj)
            choreCollection.append(newChore)
        })
}



function renderChores(chore) {
    let h2 = document.createElement('h2')
    h2.innerHTML = `${chore.name}`


    let p = document.createElement('p')
    p.setAttribute('class', 'chore-status')
    p.innerHTML = `<em>Status:</em> ${chore.status}`
    p.style.color = 'red'

    let completeBtn = document.createElement('button')
    completeBtn.setAttribute('class', 'complete-btn')
    completeBtn.innerText = 'Complete!'
    completeBtn.addEventListener('click', event => completeChoreHandler(event, chore))

    let resetBtn = document.createElement('button')
    resetBtn.setAttribute('class', 'reset-chore-button')
    resetBtn.innerText = 'Reset'
    resetBtn.addEventListener('click', event => resetHandler(event, chore))

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, p, completeBtn, resetBtn)
    choreCollection.append(divCard)
}

function resetHandler(event, chore) {
    let resetStatus = event.target.previousElementSibling.previousElementSibling.innerHTML = 'Incomplete'
    event.preventDefault()

    fetch(`${CHORES_URL}/${chore.id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'status': resetStatus
        })
    })
    .then(parseJSON)
    .then(newStatus => {
        resetStatus
    })
    
}

function completeChoreHandler(event, chore) {
    
    let statusUpdate = event.target.previousElementSibling.innerHTML = `Completed!`
    event.preventDefault()

    fetch(`${CHORES_URL}/${chore.id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'status': statusUpdate
        })
    })
    .then(parseJSON)
    .then(newStatus => {
        statusUpdate
    })
}

addBtn.addEventListener('click', () => {

    //hide and seek feature with add new chore form
    addChore = !addChore
    if (addChore) {
        choreForm.style.display = 'block'
        choreForm.addEventListener('submit', e => {
            e.preventDefault()
            postChore(e.target)
        })
        
        tryIt.style.display = "none"
    } else {
        choreForm.style.display = 'none'
    }
})

function renderDropDownOptions(houseHolds){
    
    houseHolds.forEach(houseHold => {
        let option = document.createElement('option')
        option.setAttribute('value', houseHold.id)
        let house_name = document.createTextNode(houseHold.name)
        option.appendChild(house_name)
        select.insertBefore(option, select.lastChild)
    })

}


addBtn.addEventListener('click', fetchHouseHolds)
    

document.addEventListener("DOMContentLoaded", () => {
    fetchChores().then(chores => {
        chores.forEach(chore => {
            renderChores(chore)
            
        })
    })
    
})

