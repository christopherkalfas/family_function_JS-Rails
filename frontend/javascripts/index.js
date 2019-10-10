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




function clearForm() {
    document.querySelector(".input-text").value = ""
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
            Chore.postChore(e.target)
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
        Chore.renderChores(chores)
    })
    addBtn.textContent = 'Add a New Chore'
    
})

