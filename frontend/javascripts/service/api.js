class Api {
    static baseUrl = 'http://localhost:3000'
    static CHORES_URL = `${Api.baseUrl}/chores`
    static HOUSE_HOLD_URL = `${Api.baseUrl}/house_holds`

    static fetchChores() {
        return fetch(Api.baseUrl + '/chores')
            .then(parseJSON)
    }
    
    static fetchHouseHolds(){
        return fetch(Api.baseUrl + '/house_holds')
            .then(parseJSON)
            .then( houseHolds => HouseHold.renderDropDownOptions(houseHolds))
    }

    
}
