// const point={
//     x:3,
//     y:4
// }
// // гетер сетер
// Object.defineProperty(point,'distance',{
//     get:function(){
//         return (this.x**2+this.y**2)**(.5)
//     },
//     set:function (val) {
//         this.x=10
//         this.y=0
//     }

// })

// console.log(point.distance=10);
// console.log(point);

// const person={
//     name:'ivan',
//     year:1997
// }

// Object.defineProperty(person,'age',{
//     get(){
//         return (new Date()).getFullYear()-this.year
//     },
//     set(val){
//         this.year=(new Date()).getFullYear()-val
//     }
// })

// console.log(person.age=47);
// console.log(person);

// розумні гетери сетери
let user = {
    get name() {
        // ми тіпа створюємо зразу поле _name
      return this._name;
    },
  
    set name(value) {
      if (value.length < 4) {
        alert("Ім’я занадто коротке, потрібно щонайменше 4 символи");
        return;
      }
      this._name = value;
    }
  };
  
  user.name = "Петііііро";
  console.log(user.name); // Петро
  
//   user.name = "";
