class HouseHold {
    static all = []

    constructor(name, members, id){
        this.name = name
        this.members = members
        this.id = id
        this.chores = []
        
        HouseHold.all.push(this)
    }

    addChore(chore){
        let c = new Chore(chore.name, chore.status, chore.id)
        this.chores.push(c)
    }

    

    renderChores() {
        this.chores.forEach(choreObj => {
            //debugger
            choreObj.render()
        })
    }

    static postHouseHold(houseHoldObj) {
        
        let formData = {
            "name": houseHoldObj.name.value,
            "members": houseHoldObj.members.value

        }
     
        let configObj = {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        return fetch(Api.HOUSE_HOLD_URL, configObj)
            .then(response => response.json())
            .then(houseHoldObj => {
                let newHouseObj = new HouseHold(houseHoldObj.name, houseHoldObj.members, houseHoldObj.id)
                return newHouseObj
            })
            .then(clearNewHouseForm)
            .then(clearFamilyDD)
            .then(clearNewChore)
            .then(HouseHold.renderDropDownOptions)
            .then(HouseHold.renderHouseHolds)

    }
    
    
    static renderDropDownOptions(){
        HouseHold.all.forEach(houseHold => {
            let option = document.createElement('option')
            option.setAttribute('value', houseHold.id)
            let house_name = document.createTextNode(houseHold.name)
            option.appendChild(house_name)
            selectHouseHold.appendChild(option)
        })
        

    }

    static renderHouseHolds(){
        HouseHold.all.forEach(houseHold => {
            let option = document.createElement("option")
            option.value = houseHold.id
            option.textContent = houseHold.name
            select.appendChild(option)
        })
    }


}

