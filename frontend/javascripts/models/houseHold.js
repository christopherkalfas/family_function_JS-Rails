class HouseHold {
    static all = []

    constructor(name, members, id){
        this.name = name
        this.members = members
        this.id = id
        HouseHold.all.push(this)
    }

    chores() {
        Chore.all.filter(chore => chore.houseHold.name === this.name)
        
    }

    
    
    static renderDropDownOptions(houseHolds){
        houseHolds.forEach(houseHold => {
            let option = document.createElement('option')
            option.setAttribute('value', houseHold.id)
            let house_name = document.createTextNode(houseHold.name)
            option.appendChild(house_name)
            select.insertBefore(option, select.lastChild)
        })

    }

}