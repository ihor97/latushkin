// статичні методи,поля - відносяться до класу в цілому а не до інстанса

function Car(model) {
    this.model=model
    Car.amount++
}
Car.amount=0
Car.printAmount=function () {
    console.log(this.amount);
}