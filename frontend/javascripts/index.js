function clearFamilyDD(){
    document.querySelector("#family-select").innerHTML = ""
}
function clearForm() {
    document.querySelector(".input-text").value = ""
}

function clearNewHouseForm() {
    document.querySelector('.house-hold-input-text').value = ""
    document.querySelector('.house-members-input-text').value  = ""
}

function clearChoreDivs(){
    choreCollection.innerHTML = ""
}

function clearNewChore() {
    document.querySelector("#select").innerHTML = ""  
}

addHouseHoldBtn.addEventListener('click', () => {
    addHouseHold = !addHouseHold
    if (addHouseHold){
        addHouseHoldBtn.textContent = "Close"
        housePopUp.style.display = 'block'
        housePopUp.addEventListener('submit', e => {
            e.preventDefault()
            HouseHold.postHouseHold(e.target)
       })
    } else {
        addHouseHoldBtn.textContent = "Add a New House Hold"
        housePopUp.style.display = 'none'
    }
})


selectHouseHoldBtn.addEventListener('click', () => {
    selectHouse = !selectHouse
    if(selectHouse) {
        selectHouseHoldBtn.textContent= 'Close'
        selectForm.style.display = 'block'
        selectForm.addEventListener('submit', e => {
            e.preventDefault()
            let familyId = e.target.querySelector('#family-select').value
            
            let chosenFamily = HouseHold.all.find(chosenFamily => familyId == chosenFamily.id)
            clearChoreDivs()
            
            chosenFamily.renderChores()
        })
    } else {
        selectHouseHoldBtn.textContent = "Select Your Family"
        selectForm.style.display = 'none'
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

    

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchHouseHolds().then(houseHolds => {
        houseHolds.forEach(houseHold => {
            let hh = new HouseHold(houseHold.name, houseHold.members, houseHold.id)
            houseHold.chores.forEach(chore => {
            hh.addChore(chore)
            })
        })
    HouseHold.renderHouseHolds()
    HouseHold.renderDropDownOptions()
    })
    addBtn.textContent = 'Add a New Chore'
    addHouseHoldBtn.textContent = "Add a New House Hold"
    selectHouseHoldBtn.textContent = 'Select Your House Hold'
    
})



