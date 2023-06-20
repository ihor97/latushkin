// прототипне наслідування
function Car(model) {
    this.model=this.model
}

Car.prototype.drive=function () {
    console.log('drrrr');
}
function AmbulanceCar(model,capacity) {
    // юзаємо конструктор базового класу
    Car.apply(this,[model]) //Car.call(this,model)
    this.capacity=capacity
}
// наслідування по прототипу 
// Object.create робить копію прототипу Car.prototype так що якщо ми будемо щось ложити в AmbulanceCar.prototype воно не попаде в Car.prototype
// тобто клонуємо
AmbulanceCar.prototype=Object.create(Car.prototype)
AmbulanceCar.prototype.alert=function () {
    console.log('wiu wiu wiu');
}