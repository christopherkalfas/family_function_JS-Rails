// initializer code 
const BASE_URL = 'http://localhost:3000'
const CHORES_URL = `${BASE_URL}/chores`
const HOUSE_HOLD_URL = `${BASE_URL}/house_holds`

const parseJSON = response => response.json()
const addBtn = document.getElementById('new-chore-btn')
const choreForm = document.querySelector('.container')
const choreCollection = document.querySelector("#chore-collection")
const familyChoresBelongTo = document.getElementById('family-chore-list')





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
        'house_hold_id': choreData.querySelector('select').value
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
             renderChores(choreObj)
             clearForm()
        })
    
}

function clearForm() {
    document.querySelector(".input-text").value = ""
}



function renderChores(chore) {
    let h2 = document.createElement('h2')
    h2.innerHTML = `<strong>${chore.name}</strong>`

    
    let h3 = document.createElement('h3')
    h3.innerHTML = '<em>Status: </em>'
    let p = document.createElement('p')
    p.setAttribute('class', 'chore-status')
    p.innerHTML = `${chore.status}`


    
    let completeBtn = document.createElement('button')
    completeBtn.setAttribute('class', 'complete-btn')
    completeBtn.innerText = 'Complete!'
    completeBtn.addEventListener('click', event => completeChoreHandler(event, chore))
    
    let resetBtn = document.createElement('button')
    resetBtn.setAttribute('class', 'reset-chore-button')
    resetBtn.innerText = 'Reset'
    
    resetBtn.addEventListener('click', event => resetHandler(event, chore))
    
    if (p.innerHTML === 'Incomplete'){
        p.style.color = 'red'
        resetBtn.style.display = 'none'
    } else {
        p.style.color = 'green'
        completeBtn.style.display = 'none'
    }


    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'delete-chore-btn')
    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', event => deleteChoreHandler(event, chore))

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, h3, p, completeBtn, resetBtn, deleteBtn)
    choreCollection.append(divCard)
}



function deleteChoreHandler(event, chore) {
   event.preventDefault()
    fetch(`${CHORES_URL}/${chore.id}`,{
        method: 'DELETE'
    })
    .then(() => { 
        (event.target.parentNode).remove()
    })
    //debugger

}

function resetHandler(event, chore) {
    let resetStatus = event.target.previousElementSibling.previousElementSibling
    resetStatus.innerHTML = ' Incomplete'
    resetStatus.style.color = 'red'

    let toggleCompleteBtn = event.target.previousElementSibling
    toggleCompleteBtn.style.display = 'block'

    let toggleResetBtn = event.target.style.display = 'none'
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
   
    let cardIns = event.target.parentNode
    cardIns.querySelector('.reset-chore-button').style.display = 'block'
    event.preventDefault()

    let toggleResetBtn = event.target.style.display = 'none'
    

    let statusUpdate = event.target.previousElementSibling
    statusUpdate.innerHTML = `Completed!`
    statusUpdate.style.color = 'green'

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
        addBtn.textContent = 'Close'
        choreForm.style.display = 'block'
        choreForm.addEventListener('submit', e => {
            e.preventDefault()
            postChore(e.target)
        })
        
        
    } else {
        addBtn.textContent = "Add a New Chore!"
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
    addBtn.textContent = 'Add a New Chore'
    
})

