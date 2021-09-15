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
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('logIn', () => {
  console.log('aqui')
  // cy.fixture('auth/login/index').as('loginResponse')
  // cy.server()
  // cy.visit('/login')
  // cy.route({
  //   method: 'POST',
  //   url: '/v1/auth/login',
  //   response: '@loginResponse',
  //   delay: 100,
  // }).as('post')
  // const request = {
  //   email: 'username@email.com',
  //   password: 'correctpassword',
  // }
  // cy.get('[data-qa=email] input').type(request.email, { force: true })
  // cy.get('[data-qa=password] input').type(request.password, { force: true })
  // cy.get('[data-qa=loading]').should('not.be.visible')
  // // it shows loader
  // cy.get('button[data-qa=submit]').click()
  //   .get('[data-qa=loading]').should('be.visible')
  // // it sends the right request format
  // cy.wait('@post').its('request.body').should('deep.equal', request)
  // // it displays home page
  // cy.contains('Welcome')

  console.log(Cypress.env('API_URL'))

  const url = `${Cypress.env('API_URL')}auth/login`

  const request = {
    email: 'chris@clearspacelabs.com',
    password: 'serenityhealth',
  }

  return cy.request({
    method: 'POST',
    url,
    log: false,
    body: request,
  })
  // .its('body.data')
})
