const store={
    getItem(name,price){
        return {
            name,
            price,
            weight:Math.floor(Math.random()*1000+1)/1000
        }
    }
}

const shop={
    name:'Shop1',
    items:[],
    // можна вставляти просто ф-ї
    addItem(item){this.items.push(item)},
    clear(){this.items=[]},
    getTotalPrice(){
        return this.items.reduce((sum,item)=>sum+item.price,0)
    }
}
const shop2={
    name:'Shop1',
    items:[],
    addItem(item){this.items.push(item)},
    clear(){this.items=[]},

    getTotalPrice(){
        return this.items.reduce((sum,item)=>
        {
            return sum+item.price}
        
        ,0)
    }
}
const items=[
    store.getItem('Item1',50),
    store.getItem('Item2',160),
    store.getItem('Item3',350),
    store.getItem('Item4',670),
    store.getItem('Item5',700),
    store.getItem('Item6',900)
]
console.log(items);

shop.addItem(items[0])
shop.addItem(items[1])
shop.addItem(items[2])
shop2.addItem(items[3])
shop2.addItem(items[4])
shop2.addItem(items[5])

console.log(shop.getTotalPrice());
console.log(shop2.getTotalPrice());