class TemplateProcessor {
    constructor() {

    }
    getAddonHtml(addon){
      return `
      <label >
  <input type="checkbox" data-id='${addon.id}'  value="${addon.price}" >
  <span>${addon.title}  ${addon.price}p</span>
</label>
      `
    }

    getPizzaHtml(pizza) {
        var res = `
        <div class="pizza" data-id="${pizza.id}">
        <figure>
          <img src="${pizza.img}" alt="">
          <figcaption>
            <h3>${pizza.name}</h3>
            <p>${pizza.des}</p>
            <div class="sizes">`
        for (const size of pizza) {
            res += this.getPizzaSizeHtml(size,pizza.id)
        }


        res += `</div>
        <div>
  <h4>
    Ціна: <span class="price">0.0 </span>р.
  </h4>
</div>
<button type="button" data-action="AddToCart">В корзину</button>
          </figcaption>
        </figure>
      </div>`

        return res

    }

    getPizzaSizeHtml(size,id) {
        return `
        <label >
  <input type="radio" name='pizza-${id}'  data-action='Change-Price' value="${size.price}">
  <span>${size.title}</span>
</label>
        `
    }

    getCartItemHtml(cartItem){
      let res=`
      
      <div class="cart-item">
    <figure>
      <img src="${cartItem.pizza.img}" alt="">
      <figcaption>
        <h3>${cartItem.pizza.name}</h3>
        <p>${cartItem.pizza.des}</p>
        <h4>${cartItem.size.title}</h4>
        <h4>Addons</h4>
        <div class="cart-addons">
        
        ${cartItem.addons.reduce((p,a)=>p+this.getCartAddonHtml(a),``)}
        </div>
<h4>Вартість: ${cartItem.getprice()}</h4>
        
      </figcaption>
    </figure>
</div>

      `
     return res
    }

    getCartAddonHtml(addon){
      return `<div class="addon">
      ${addon.title}-${addon.price}
    </div>`
       

    }
}
