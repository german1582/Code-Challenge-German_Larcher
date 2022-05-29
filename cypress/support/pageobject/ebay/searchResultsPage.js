require('cypress-xpath')

class SearchResultsPage {

    elements = {
        //chck_brand: () => cy.xpath('//span[@class=\'cbx x-refine__multi-select-cbx\'][contains(.,\'PUMA\')]'),
        chck_brand: () => cy.get('input').filter('[aria-label="PUMA"]'),
        chck_size: () => cy.get('input').filter('[aria-label="10"]'),
        lbl_number_of_findings: () => cy.xpath('//h1[contains(text(),"resultados para")]//span[@class="BOLD"]'),
        //lbl_number_of_findings2: () => cy.xpath('//h1[contains(text(),"resultados para")])').filter('[class="BOLD"]'),
        //prueba_text: () => cy.get('div').filter('[class="cbx x-refine__multi-select-cbx"]'),
        //btn_best_result: () => cy.get('#nid-gxv-1'),
        btn_best_result: () => cy.get('button').filter('[aria-label="Selector para ordenar. Mejor resultado seleccionados."]'),
        //li_price_asc_sorting: () => cy.xpath('//span[contains(text(),"Precio + Envío: más bajo primero")]')
        li_price_asc_sorting: () => cy.xpath('//a[@_sp=\'p2351460.m4116.l5869.c4\']')

        //li_price_asc_sorting: () => cy.get('a').filter('[href="https://www.ebay.com/sch/i.html?_from=R40&amp;_nkw=shoes&amp;_sacat=0&amp;LH_TitleDesc=0&amp;_fsrp=1&amp;_oaa=1&amp;_dcat=93427&amp;_sop=16"]')
    }

    check_on_brand() {
        this.elements.chck_brand().click({force: true})
    }

    check_on_size() {
        this.elements.chck_size().click({force: true})
    }

    print_number_of_findings() {

        /*this.elements.lbl_number_of_findings2().invoke('text').then((text1) => {
              cy.log("the number of findings is: " + text1)
         })*/

        /*this.elements.lbl_number_of_findings2().then(function (text2){
              cy.log("the number of findings is: " + text2.text())
         })*/

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

        //nombre: //ul/li[@class='s-item s-item__pl-on-bottom'][1]//h3[@class='s-item__title']
        //precio: //ul/li[@class='s-item s-item__pl-on-bottom'][1]//div[@class='s-item__detail s-item__detail--primary'][1]

        //FIRST APROACH
/*        for (var i = 1; i < 6; i++) {
            cy.xpath(`//ul/li[@class='s-item s-item__pl-on-bottom'][${i}]//h3[@class='s-item__title']`).then(($h3) => {
                const product_name = $h3.text()
                cy.log(">>>>>JUST TESTING PRODUCT NAME: " + product_name)
            })

            cy.xpath(`//ul/li[@class='s-item s-item__pl-on-bottom'][${i}]//div[@class='s-item__detail s-item__detail--primary'][1]`).then(($div) => {
                const product_price = $div.text()
                cy.log(">>>>>JUTS TESTING PRODUCT PRICE: " + product_price)
            })
        }*/
        //ENDS FIRST APROACH

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

        //OTHER APPROACHES
/*        for (let i = 1; i < 6; i++) {

            const product = {}

                        cy.xpath(`//ul/li[@class='s-item s-item__pl-on-bottom'][${i}]//div[@class='s-item__detail s-item__detail--primary'][1]`).within(($h3) => {
                            const text3 = $h3.text()
                            expect(text3).not.to.eq("2222222")
                            product.price = text3
                            cy.log("pruebaaaaaa" + product.name)
                        })
                        products.push(product)
        }*/

        //cy.log("eeeeeeeeeeeeeeeee "+products.length)

        /*        for (let i = 0; i < 5; i++) {
                    cy.log(products[i].name)
                    cy.log(products[i].price)
                    cy.log(Object.keys(products[i]).length)
                }*/

        /*        products.forEach(prod => {
                    cy.log(prod.name)
                    cy.log(prod.price)
                })*/

        //ENDS OTHER APPROACHES
    }

    sort_by_name_asc() {

        /*        cy.get("products").then(prods => {
                    cy.log("prodddddddddddddddd " + prods.length)
                })*/

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
