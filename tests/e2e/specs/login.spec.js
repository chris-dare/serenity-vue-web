describe('Login', () => {
  beforeEach(() => {
    cy.fixture('auth/login/index').as('loginResponse')
    cy.server()
    cy.route({
      method: 'POST',
      url: '/v1/auth/login',
      response: '@loginResponse',
      delay: 100,
    }).as('post')
    cy.visit('/')
  })

  context('When invalid credentials are entered', () => {
    it('displays a validation message for a wrong email', () => {
      let invalidEmail = 'invalidemail.com'
      let password = 'password'
      let validationMessage = 'Email format is invalid'
  
      cy.get('[data-test="email"]').type(invalidEmail)
      cy.get('[data-test="password"]').type(password)
      cy.get('button[data-test="submit"]').click()
        .get('[data-test="loading"]').should('not.be.visible')
      cy.contains(validationMessage).should('be.visible')
    })
  })

  context('when incorrect credentials are entered', function() {
    beforeEach(function() {
      cy.fixture('auth/login/error').as('loginResponse')
      cy.route({
        method: 'POST',
        url: '/v1/auth/login',
        response: '@loginResponse',
        status: 401,
        delay: 100,
      }).as('post')
    })
    it('displays error message', function() {
      const request = {
        email: 'username@email.com',
        password: 'wrongpassword',
      }
      cy.get('[data-test="email"]').type(request.email)
      cy.get('[data-test="password"]').type(request.password)
      cy.get('button[data-test="submit"]').click()
      // it hides loader
      cy.get('[data-test="loading"]').should('not.be.visible')
      // it displays error message
      const response = this.loginResponse
      cy.contains(response.detail).should('be.visible')
    })
  })

  context('when correct credentials are entered', () => {
    it('logins and displays home page', () => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/v1/auth/login',
        response: '@loginResponse',
        delay: 100,
      }).as('post')
  
      const request = {
        email: 'username@email.com',
        password: 'correctpassword',
      }
      cy.get('[data-test="email"]').type(request.email)
      cy.get('[data-test="password"]').type(request.password)
      cy.get('[data-test="loading"]').should('not.be.visible')
      // it shows loader
      cy.get('button[data-test="submit"]').click()
        .get('[data-test="loading"]').should('be.visible')
      // it sends the right request format
      cy.wait('@post').its('request.body').should('deep.equal', request)
      // it displays home page
      cy.url().should('contain', '/get-started')
    })
  })
})
