class Pizza{
    constructor(name,des,img){
        this.name=name
        this.des=des
        this.img=img
        this.sizes=[]
        this.id=Pizza.id++
    }
    addSize(size){
        this.sizes.push(size)
    }
// робимо обєкти size перебираємими
    [Symbol.iterator](){
        return this.sizes[Symbol.iterator]()
    }




}

Pizza.id=0