var Pizzeria = {

    async init() {
        let addonData = await this.Data.load("./data/addons.json")
        this.onAddonsLoaded(addonData)
        let data = await this.Data.load('./data/data.json')
        this.onDataLoaded(data)
        this.initCart()
    },
    onAddonsLoaded(data) {
        this.Data.addons = data.map(obj => {
            return new Addon(obj.title, obj.price)
        })
        this.buildAddonsList()
    },
    buildAddonsList() {
        var processor = new TemplateProcessor()
        this.Dom.addonsContainer.innerHTML = this.Data.addons.reduce((p, c) => p + processor.getAddonHtml(c), ``)
        this.Dom.addonsWindow.addEventListener("click", Pizzeria.EventHandlers.addonsClick)
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
    initCart(){
        this.Dom.showCartBtn.addEventListener('click',this.EventHandlers.onCartBtnClick)
        this.Dom.hideCartBtn.addEventListener('click',this.EventHandlers.onCartBackClick)
    }
    ,
    Dom: {
        pizzaContainer: document.getElementById('container'),
        addonsContainer: document.getElementById('addons-container'),
        addonsWindow: document.getElementById('addons'),
        showCartBtn:document.getElementById('show-cart'),
        cartWindow:document.getElementById('cart-container'),
        cartItemContainer:document.getElementById('cart-items'),
        hideCartBtn:document.getElementById('back')
        ,
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
        redrawCart() {
            document.getElementById('cart-amount').innerText = Pizzeria.Data.Cart.getAmount()
            document.getElementById('cart-price').innerText = Pizzeria.Data.Cart.getSumPrice().toFixed(2)
        },
        showAddonsInterface() {

            document.getElementById("addons").style.display = "block"
        },
        hideAddonsInterface() {
            document.getElementById("addons").style.display = "none"

        },
        finishAddonsSelections() {
            let addons = Array.from(this.addonsContainer.querySelectorAll(':checked'))
                .map(input =>
                    Pizzeria.Data.getAddonById(+input.getAttribute("data-id"))
                )
                console.log(addons);
                Pizzeria.Data.Cart.finishAddonsSelections(addons)
                this.hideAddonsInterface()
        },
        showCart(){
            this.pizzaContainer.style.display='none'
            this.cartWindow.style.display='block'
            let processor=new TemplateProcessor()
            Pizzeria.Dom.cartItemContainer.innerHTML=
            Pizzeria.Data.Cart.items.reduce((p,c)=>
                p+processor.getCartItemHtml(c),``
            )
        },
        hideCart(){
            this.pizzaContainer.style.display='block'
            this.cartWindow.style.display='none'
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
            let cartItem = new CartItem(pizza, size)
            Pizzeria.Data.Cart.pendingitem = cartItem
            Pizzeria.Dom.showAddonsInterface()
            // Pizzeria.Data.Cart.add(cartItem)
        },
        addonsClick(e) {
            switch (e.target.getAttribute("data-action")) {
                case "FinishAddons":
                    Pizzeria.Dom.finishAddonsSelections()
                    break;

                default:
                    if (e.target == this) {
                        Pizzeria.Dom.hideAddonsInterface()
                    }
            }
        }
        ,
        onCartBtnClick(e){
            Pizzeria.Dom.showCart()
        },
        onCartBackClick(e){
            Pizzeria.Dom.hideCart()
        },
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
            pendingitem: null,
            add(cartItem) {
                this.items.push(cartItem)
                Pizzeria.Dom.redrawCart()
            },
            getSumPrice() {
                return this.items.reduce((p, c) => p + (+c.getprice()), 0)
            },
            getAmount() {
                return this.items.length
            },
            finishAddonsSelections(addons){
                addons.forEach( addon =>this.pendingitem.addAddon(addon))
                this.add(this.pendingitem)
                this.pendingitem=null
            }
        }


        ,
        getPizzaById(id) {
            return this.pizzas.filter(pizza => pizza.id === +id)[0]
        },
        getAddonById(id) {
            return this.addons.filter(pizza => pizza.id === +id)[0]
        }
        ,
        pizzas: [],
        addons: []

    },

}

Pizzeria.init()

