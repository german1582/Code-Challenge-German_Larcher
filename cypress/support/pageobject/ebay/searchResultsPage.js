require('cypress-xpath')

class SearchResultsPage {

    elements = {

        chck_brand: () => cy.get('input').filter('[aria-label="PUMA"]'),
        chck_size: () => cy.get('input').filter('[aria-label="10"]'),
        lbl_number_of_findings: () => cy.xpath('//h1[contains(text(),"resultados para")]//span[@class="BOLD"]'),
        btn_best_result: () => cy.get('button').filter('[aria-label="Selector para ordenar. Mejor resultado seleccionados."]'),
        li_price_asc_sorting: () => cy.xpath('//a[@_sp=\'p2351460.m4116.l5869.c4\']')
    }

    check_on_brand() {
        this.elements.chck_brand().click({force: true})
    }

    check_on_size() {
        this.elements.chck_size().click({force: true})
    }

    print_number_of_findings() {

        this.elements.lbl_number_of_findings().then(($span) => {
            const numberOfFindings = $span.text()
            expect(numberOfFindings).not.to.eq("1111111")
            cy.log("THE NUMBER OF FINDIGNS IS: " + numberOfFindings)
        })
    }

    sort_ascending_by_price() {
        this.elements.btn_best_result().click({force: true})
        this.elements.li_price_asc_sorting().click({force: true})
    }

    get_name_and_price() {

        let products = []

        cy.get(`ul li.s-item.s-item__pl-on-bottom:nth-child(-n+8)`).then((list) => {
            let products = [...list].map(el => {
                const name = el.querySelector("h3.s-item__title")
                const price = el.querySelector("div.s-item__detail.s-item__detail--primary .s-item__price")

                return {name: name.innerText, price: price.innerText}
            })

            cy.log("*****PRODUCT NAME AND ITS PRICE OF THE FIRST FIVES*****")
            products.forEach(prod => {
                cy.log("Product name: " + prod.name)
                cy.log("Product price: " + prod.price)
                cy.log("**********************************")

                //cy.wrap(products).as("products")
            })
        })
        cy.log("*******************************************************************************")
    }

    sort_by_name_asc() {

        let products = []

        cy.get(`ul li.s-item.s-item__pl-on-bottom:nth-child(-n+8)`).then((list) => {
            let products = [...list].map(el => {
                const name = el.querySelector("h3.s-item__title")
                const price = el.querySelector("div.s-item__detail.s-item__detail--primary .s-item__price")

                return {name: name.innerText, price: price.innerText}
            })

            //orden asc by name
            products = products.sort((pa, pb) => {
                return (pa.name.toLowerCase() < pb.name.toLowerCase()) ? -1 : 1
            })

            cy.log("*****PRODUCT NAME AND ITS PRICE OF THE FIRST FIVES ORDERED ASCENDING BY NAME*****")
            products.forEach(prod => {
                cy.log("Product name: " + prod.name)
                cy.log("Product price: " + prod.price)
                cy.log("**********************************")

                //cy.wrap(products).as("products")
            })
        })
        cy.log("*******************************************************************************")
    }

    sort_by_price_desc() {

        let products = []

        cy.get(`ul li.s-item.s-item__pl-on-bottom:nth-child(-n+8)`).then((list) => {
            let products = [...list].map(el => {
                const name = el.querySelector("h3.s-item__title")
                const price = el.querySelector("div.s-item__detail.s-item__detail--primary .s-item__price")

                return {name: name.innerText, price: price.innerText}
            })

            //orden desc by price
            products = products.sort((pa, pb) => {
                return (parseFloat(pa.price.match(/(\d+)/)) < parseFloat(pb.price.match(/(\d+)/))) ? 1 : -1
            })

            cy.log("*****PRODUCT NAME AND ITS PRICE OF THE FIRST FIVES ORDERED DESCENDING BY PRICE*****")
            products.forEach(prod => {
                cy.log("Product name: " + prod.name)
                cy.log("Product price: " + prod.price)
                cy.log("**********************************")

                //cy.wrap(products).as("products")

            })
        })
        cy.log("*******************************************************************************")
    }
}

module.exports = new SearchResultsPage();
