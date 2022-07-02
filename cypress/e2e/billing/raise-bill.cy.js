describe('Raise Admin bill', () => {

  // const baseUrl = Cypress.env('BASE_URL')

  context('Dashboard', () => {
    it('can see the billing dashboard page', () => {
      cy.login()
      cy.get('[data-cy=workspaces-select').select('Billing')
      cy.contains('Welcome')
    })

    it('can raise a bill', () => {
      
      cy.contains('Raise bill').click()
      cy.contains('Raise bill').should('exist')

      cy.get('[data-cy=billing-select-patient]').within(() => {
        cy.get('[data-cy=search] input').clear().type('Papa kofi').trigger('blur')
        cy.waitUntil(() =>  cy.contains('Papa Kofi').should('exist'))
        cy.get('[data-cy=patient]').first().click()
        cy.get('[data-cy=multistep-save]').click()
      })
      
      cy.contains('Add a service').should('exist')
      
      cy.get('[data-cy=choose_service]').click()
      cy.get('[data-cy=choose_service] li').contains('ECG').first().click()
      cy.get('[data-cy=choose_price_tier]').click()
      cy.get('[data-cy=choose_price_tier] li').first().click()
      cy.get('[data-cy=billing-select-clinic-add]').click()
      cy.contains('Price').should('exist')
      cy.get('[data-cy=multistep-save]').click()

      cy.contains('Total cost').should('exist')

      cy.get('[data-cy=user_account]').click()
      cy.get('[data-cy=user_accounts]').click()
      cy.get('[data-cy=user_accounts] li').first().click()
      cy.contains('You have insufficient funds').should('not.exist')
      cy.get('[data-cy=multistep-save]').click()

      cy.contains('Papa Kofi').should('exist')

      cy.get('[data-cy=raise-bill-button]').click()

      cy.contains('Papa Kofi').should('exist')
    })

    it('cannot create a bill with insufficient funds', () => {
      cy.get('[data-cy=Dashboard]').click()
      cy.waitUntil(() =>  cy.contains('Raise bill').should('exist'))
      cy.contains('Raise bill').click()

     
      cy.get('[data-cy=patient]').first().click()
      cy.get('[data-cy=multistep-save]').click()
      
      cy.contains('Add a service').should('exist')
      cy.get('[data-cy=choose_service]').click()
      cy.get('[data-cy=choose_service] li').first().click()
      cy.get('[data-cy=choose_price_tier]').click()
      cy.get('[data-cy=choose_price_tier] li').first().click()
      cy.get('[data-cy=billing-select-clinic-add]').click()
      cy.contains('Price').should('exist')
      cy.get('[data-cy=multistep-save]').click()

      cy.contains('Total cost').should('exist')

      cy.get('[data-cy=user_account]').click()
      cy.get('[data-cy=user_accounts]').click()
      cy.get('[data-cy=user_accounts] li').first().click()
      cy.get('[data-cy=multistep-save]').click()

      cy.contains('You have insufficient funds').should('exist')
    })
  })
})