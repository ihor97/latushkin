class CartItem{
    constructor(pizza,size){
        this.pizza=pizza
        this.size=size
        this.addons=[]
    }
    getprice(){
        console.log(this.size.price);
        return +this.size.price+this.addons.reduce((p,c)=>p+c.price,0)
    }
    addAddon(addon){
        this.addons.push(addon)
    }
}