class Chore {
    static all = []

    constructor(name, status='Incomplete') {
        this.name = name
        this.status = status
        Chore.all.push(this)
    }

}