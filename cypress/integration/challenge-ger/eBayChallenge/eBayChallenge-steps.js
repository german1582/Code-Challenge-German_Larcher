/// <reference types="cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import eBay from '../../../support/pageobject/ebay/home'
import eBaySearchPage from '../../../support/pageobject/ebay/searchResultsPage'

Given('1. Ingresar a eBay', () => {
    eBay.go()
})

When('2. Buscar {string}', (text_to_search) => {
    eBay.type_to_search(text_to_search)
    eBay.click_to_search()
    eBaySearchPage.validate_search(text_to_search)

})

Then('3. Buscar marca {string}', () => {
    eBaySearchPage.check_on_brand()
    eBaySearchPage.validate_element_is_visible("(//div[contains(.,\'PUMA\')])[12]")
})

Then('4. Elegir tamaño {string}', () => {
    eBaySearchPage.check_on_size()
    eBaySearchPage.validate_element_is_visible("(//div[contains(.,'Talla de calzado Estados Unidos: 10')])[12]")
})

Then('5. Imprimir el número de resultados', () => {
    eBaySearchPage.print_number_of_findings()
})

Then('6. Ordenar el precio por ascendente', () => {
    eBaySearchPage.sort_ascending_by_price()
})

Then('7. Mantener el orden tomando los primeros 5 resultados', () => {

/*
    7. Considero que este punto es ambiguo y entiendo que su requerimento esta implementado y contemplado en
    el punto 8. En un proyecto real  jamás me quedaría con tal ambiguedad si no que la resolvería lo antes
    posible quitándome la duda con alguien de negocio o quien haya escrito la user story.
*/
    cy.log("*****Read comments*****")

})

Then('8. Elige los primeros 5 productos con sus precios e imprímelos en la consola', () => {
    eBaySearchPage.get_name_and_price()
})

Then('9. Ordena e imprime los productos por nombre ascendente', () => {
    eBaySearchPage.sort_by_name_asc()
})

Then('10. Ordena e imprime los productos por precio descendente', () => {
    eBaySearchPage.sort_by_price_desc()
})

