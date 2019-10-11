// global variables

const parseJSON = response => response.json()
const addBtn = document.getElementById('new-chore-btn')
const choreForm = document.querySelector('.container')
const choreCollection = document.querySelector("#chore-collection")
const familyChoresBelongTo = document.getElementById('family-chore-list')

const housePopUp = document.getElementById('house-pop-up')
const addHouseHoldBtn = document.getElementById('add-new-family')



let addChore = false 
let addHouseHold = false