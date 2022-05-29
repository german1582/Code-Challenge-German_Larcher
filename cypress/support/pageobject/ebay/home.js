require('cypress-xpath')

class HomePage {

    elements = {
        txt_main_search: () => cy.get('#gh-ac'),
        btn_main_search: () => cy.get('#gh-btn'),
    }

    type_to_search(input_string) {
        this.elements.txt_main_search().type(input_string)
    }

    click_to_search() {
        this.elements.btn_main_search().click()
        cy.wait(1500)
    }

    go() {
        cy.visit('https://www.ebay.com/')
    }
}

module.exports = new HomePage();
