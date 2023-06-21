class CartItem{
    constructor(pizza,size){
        this.pizza=pizza
        this.size=size
    }
    getprice(){
        return this.size.price
    }
}