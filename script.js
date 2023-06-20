// Proxy обєкт обєкт який встає посередині між обєктом і тим що ми хочемо змінити
// const originalPoint={
//     x:4,
//     y:5
// }

// const point =new Proxy(originalPoint,
//     {
//         // тут пастки розташовані(handlers)
//     })


// const originalPoint = {
//     x: 4,
//     y: 5
// }

// const point = new Proxy(originalPoint,
//     {
//         // пастка get 
//         get(target, prop, receiver){
//             if(prop in target){
//                 return target[prop]
//             }
//             return 'Prop not found'
//         }
//     })

// const point = new Proxy(originalPoint,
//     {
//         // пастка set 
//         // target цільовий обєкт, receiver -це є проксі
//         set(target, prop, val,receiver){
//             if(typeof val !=='number'){
//                 return false
//             }
//             if(val<0){
//                 val=0
//             }
//             target[prop]=val
//             // тре вертати true якщо все ок
//             return true
//         }
//     })

//     point.x=3333
//     console.log(originalPoint);

// в одному проксі обєкті може бути по одній ловушці кожного типу

const person = {
    year: 1970,
    name: 'ivan'
}

let proxy = new Proxy(person, {
    set(target, prop, value, receiver) {
        if (!target.hasOwnProperty(prop)) {
            return false
        } else {
            if (prop == 'year') {
                if ((new Date()).getFullYear() - value > 120) {
                    return false
                }
                if ((new Date()).getFullYear() > value) {
                    target[prop] = value
                    return true

                }
                if ((new Date()).getFullYear() < value) {
                    console.log('future');
                    return false

                }

            }
            // якщо якась інша властивість тоді можна змінювати
            target[prop] = value
        }

    },
    get(target, prop) {
        if (prop === 'year') {
            return (new Date()).getFullYear() - target[prop]
        }
        // якщо якась інша властивість
        return target[prop]
    }

})

proxy.f = 'dssd'
proxy.name = 4
proxy.year = 3232
console.log(person);
