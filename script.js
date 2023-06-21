var Pizzeria = {

    async init() {
        let data = await this.Data.load('./data/data.json')
        this.onDataLoaded(data)
    },
    // перетворює з json в масив обєктів класу Pizza
    onDataLoaded(data) {
        this.Data.pizzas = data.map(function (obj) {
            var pizza = new Pizza(obj.name, obj.description, obj.img)
            obj.sizes.forEach(size => {
                pizza.addSize(new PizzaSize(size.title, size.price))
            });
            return pizza
        })
        this.buildPizzasList()
    },
    buildPizzasList() {
        // для того щоб не засирати простір імен шаблогізацією створили окремий клас
        var processor = new TemplateProcessor()
        let str = ''
        this.Data.pizzas.forEach(pizza => {
            str += processor.getPizzaHtml(pizza)
        })
        this.Dom.pizzaContainer.innerHTML = str;
        // виставляємо ціну
        this.Data.pizzas.forEach(pizza => {
            Pizzeria.Dom.setPizzaSizePrice(pizza.sizes[0].price, pizza.id)

        })
        // вішаємо події 
        this.Dom.pizzaContainer.addEventListener('change', this.EventHandlers.changeHandler)
        this.Dom.pizzaContainer.addEventListener('click', this.EventHandlers.clickListener)

    },
    Dom: {
        pizzaContainer: document.getElementById('container'),
        setPizzaSizePrice(price, id) {
            // елемент з класом і з атрибутом
            document.querySelector(`.pizza[data-id='${id}'] span.price`).innerText = price
            // робимо вибраними радіо
            document.querySelector(`.pizza[data-id='${id}'] [value='${price}']`).checked = true

        },
        getSelectedSizeFor(pizzaId) {
            let inp = document.querySelector(`.pizza[data-id='${pizzaId}'] input[type='radio']:checked`)
            
            let size = inp.nextElementSibling.innerText
            let price = inp.value
            return new PizzaSize(size, price)
        },
        redrawCart(){
            document.getElementById('cart-amount').innerText=Pizzeria.Data.Cart.getAmount()
            document.getElementById('cart-price').innerText=Pizzeria.Data.Cart.getSumPrice().toFixed(2)
        }
    },
    EventHandlers: {
        onSizeChanged(target) {
            var price = target.value;
            var parent = target.parentNode.parentNode.parentNode.parentNode.parentNode
            var pizzaId = parent.getAttribute('data-id')
            Pizzeria.Dom.setPizzaSizePrice(price, pizzaId)


        },
        onAddToCart(target) {
            let id = target.parentNode.parentNode.parentNode.getAttribute('data-id')
            let [pizza, size] = [
                Pizzeria.Data.getPizzaById(id),
                Pizzeria.Dom.getSelectedSizeFor(id)
            ]

            Pizzeria.Data.Cart.add(pizza, size)
        }
        ,

        clickListener(e) {
            switch (e.target.getAttribute('data-action')) {
                case 'AddToCart':
                    Pizzeria.EventHandlers.onAddToCart(e.target)
                    break;

                default:
                    break;
            }
        },

        changeHandler(e) {
            switch (e.target.getAttribute('data-action')) {

                case "Change-Price":
                    // рішаємо проблемк з контекстом
                    Pizzeria.EventHandlers.onSizeChanged(e.target)
                    break;


                default:
                    return;
            }
        }


    }

    ,
    Data: {
        // метод який вертає проміси (грузить json)
        load(path) {
            return new Promise((res, rej) => {
                let xhr = new XMLHttpRequest
                xhr.open('get', path, true)
                xhr.onload = function () {
                    try {
                        var d = JSON.parse(this.responseText)
                        res(d)
                    } catch (error) {
                        rej('error while parsing')
                    }
                }
                xhr.onerror = function () {
                    rej('error while loading')
                }
                xhr.send(null)
            })
        },
        Cart: {
            items: [],
            add(pizza, size) {
                this.items.push(new CartItem(pizza, size))
                Pizzeria.Dom.redrawCart()
            },
            getSumPrice(){
                return this.items.reduce((p,c)=>p+(+c.getprice()),0)
            },
            getAmount(){
                return this.items.length
            }
        }
       

        ,
        getPizzaById(id) {
            return this.pizzas.filter(pizza => pizza.id === +id)[0]
        }
        ,
        pizzas: []

    },

}

Pizzeria.init()

