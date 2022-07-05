// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import 'cypress-wait-until'


// -- This is a parent command --
Cypress.Commands.add('login', (email = 'seddie@serenity.health', password = 'betacapa123') => {
  cy.clearLocalStorage()
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  cy.visit(`${Cypress.env('BASE_URL')}/login`)
  cy.get('[data-cy=email] input').should('exist').first().clear().type(email).blur()
  cy.get('[data-cy=password] input').should('exist').first().clear().type(password).blur()
  cy.get('[data-cy=submit]').click()

  cy.waitUntil(() =>  cy.get('[data-cy=set-location-radio-button]').should('exist'))

  cy.get('[data-cy=set-location-radio-button]').first().click({ force: true })
  cy.get('[data-cy=set-location-submit]').click({force: true})

  cy.get('[data-cy=user-header-dropdown]').click()
  cy.contains('QA Test Organization').click()

})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })