class TemplateProcessor {
    constructor() {

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
  <input type="radio" name='pizza-${id}' data-action='Change-Price' value="${size.price}">
  <span>${size.title}</span>
</label>
        `
    }


}
