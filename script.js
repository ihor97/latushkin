// для створення класів є три патерна в js - фабрика конструктор і прототип
// фабрика
// function Human(name,age) {
//     return {
//         name,
//         age,
//         getBirthYear(){
//             return (new Date()).getFullYear()-this.age
//         }
//     }
// }

// конструктор 
// function Human(name,age) {
//         this.name=name
//         this.age=age
//         // погано тим що всеодно ф-я буде в обєкті але вде можемо заюзати instanceof
// дозволяє зробити наслідування але створює дубоікати методів
//         this.getBirthYear=function(){
//             return (new Date()).getFullYear()-this.age
//         }
// }

// прототип
// function Human(name, age) {
//     this.name = name
//     this.age = age

// }
// Human.prototype.getBirthYear = function () {
//     return (new Date()).getFullYear() - this.age
// }
