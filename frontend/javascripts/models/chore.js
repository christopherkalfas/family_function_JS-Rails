class Chore {
    static all = []

    constructor(name, status='Incomplete', id) {
        this.name = name
        this.status = status
        this.id = id
        Chore.all.push(this)
    }

    static postChore(choreData) {

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
        return fetch(Api.CHORES_URL, configObj)
            .then(response => response.json())
            .then((choreObj) => {
                let houseHold = HouseHold.all.find(chosenFamily => choreObj.house_hold_id == chosenFamily.id)
                let newObj = new Chore(choreObj.name, choreObj.status, choreObj.id)
                houseHold.chores.push(newObj)
                clearChoreDivs()
                houseHold.renderChores()
                clearForm() 
            })
        

    }
    

    

        render() {
            let h2 = document.createElement('h2')
            h2.innerHTML = `<strong>${this.name}</strong>`

            
            let h3 = document.createElement('h3')
            h3.innerHTML = '<em>Status: </em>'
            let p = document.createElement('p')
            p.setAttribute('class', 'chore-status')
            p.innerHTML = `${this.status}`


            
            let completeBtn = document.createElement('button')
            completeBtn.setAttribute('class', 'complete-btn')
            completeBtn.innerText = 'Complete!'
            completeBtn.addEventListener('click', event => this.completeChoreHandler(event, this))
            
            let resetBtn = document.createElement('button')
            resetBtn.setAttribute('class', 'reset-chore-button')
            resetBtn.innerText = 'Reset'
            
            resetBtn.addEventListener('click', event => this.resetHandler(event, this))
            
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
            deleteBtn.addEventListener('click', event => this.deleteChoreHandler(event, this))

            let divCard = document.createElement('div')
            divCard.setAttribute('class', 'card')
            divCard.setAttribute('id', `${this.id}`)
            divCard.append(h2, h3, p, completeBtn, resetBtn, deleteBtn)
            choreCollection.append(divCard)
        }
    

        static renderChores(chores) {

            chores.forEach(choreObj => {
                let newObj = new Chore(choreObj.name, choreObj.status, choreObj.id)
                newObj.render()
            })
        }

        ///when rendering chores 'sort' the chore A-Z


        deleteChoreHandler() {
            event.preventDefault()
            fetch(`${Api.CHORES_URL}/${this.id}`,{
                method: 'DELETE'
            })
            .then(() => { 
                document.getElementById(`${this.id}`).remove()
                Chore.all = Chore.all.filter(chore => chore.id !== this.id)
            })
        }

        completeChoreHandler() {
            let cardIns = event.target.parentNode
            cardIns.querySelector('.reset-chore-button').style.display = 'block'
            event.preventDefault()
        
            let toggleResetBtn = event.target.style.display = 'none'
            
        
            let statusUpdate = event.target.previousElementSibling
            statusUpdate.innerHTML = `Completed!`
            statusUpdate.style.color = 'green'
        
            fetch(`${Api.CHORES_URL}/${this.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'status': statusUpdate.textContent
                })
            })
            .then(parseJSON)
            .then(newStatus => {
                statusUpdate
            })
        }

        resetHandler() {
            let resetStatus = event.target.previousElementSibling.previousElementSibling
            resetStatus.innerHTML = ' Incomplete'
            resetStatus.style.color = 'red'
        
            let toggleCompleteBtn = event.target.previousElementSibling
            toggleCompleteBtn.style.display = 'block'
        
            let toggleResetBtn = event.target.style.display = 'none'
            event.preventDefault()
        
            fetch(`${Api.CHORES_URL}/${this.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'status': resetStatus.textContent
                })
            })
            .then(parseJSON)
            .then(newStatus => {
                resetStatus
            })
            
        }


        

        

}