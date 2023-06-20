
class Brewery {
    constructor(id, name, website) {
        this.id = id
        this.name = name
        this.website = website
    }

    renderIn(elem) {
        elem.insertAdjacentHTML('beforeend',
            `
       <div class="brewery">
        <h3>${this.name} [${this.id}]</h3>
       <a href="${this.website}">${this.website} </a>

        </div>
       `
        )
    }
}

class App {
    constructor(elem) {
        this.elem = elem
        this.init()



    }

    async init() {
        const data = await this.loadData()
        const breweries = data.map(item => {
            return new Brewery(item.id, item.website_url, item.name)
        })
        breweries.forEach(item => {
            item.renderIn(this.elem)
        });


    }

    async loadData() {
        return (await axios.get('https://api.openbrewerydb.org/breweries')).data
    }
}


new App(document.getElementById('app'))