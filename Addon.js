class Addon{
    constructor(title,price){
        this.title=title
        this.price=price
        this.id=Addon.id++
    }
}

Addon.id=0