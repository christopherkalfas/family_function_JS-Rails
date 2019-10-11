
function clearForm() {
    document.querySelector(".input-text").value = ""
}

addHouseHoldBtn.addEventListener('click', (e) => {
    addHouseHold = !addHouseHold
    if (addHouseHold){
       addHouseHoldBtn.textContent = "Close"
       housePopUp.style.display = 'block'
       housePopUp.addEventListener('submit', () => {
           e.preventDefault()
           HouseHold.postHouseHold(e.target)
       })
    } else {
        addHouseHoldBtn.textContent = "Add a New House Hold"
        housePopUp.style.display = 'none'
    }
})



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



addBtn.addEventListener('click', Api.fetchHouseHolds)
    

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchChores().then(chores => {
        Chore.renderChores(chores)
    })
    addBtn.textContent = 'Add a New Chore'
    addHouseHoldBtn.textContent = "Add a New House Hold"
    
})

