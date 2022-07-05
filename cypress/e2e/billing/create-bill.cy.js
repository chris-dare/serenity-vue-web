import { NO_FUNDS_PATIENT } from '../../types/users'
describe('Raise Admin bill', () => {

  // let baseUrl = Cypress.env('BASE_URL')

  context('Dashboard', () => {
    it('can see the billing dashboard page', () => {
      cy.login()
      cy.get('[data-cy=workspaces-select').select('Billing')
      cy.contains('Welcome')
    })
  
    it('can create an administrative bill', () => {
        
      cy.contains('Create bill').click()
  
      cy.get('[data-cy=billing-select-patient]').within(() => {
        cy.get('[data-cy=search] input').clear().type('Papa kofi').trigger('blur')
        cy.waitUntil(() =>  cy.contains('Papa Kofi').should('exist'))
        cy.get('[data-cy=patient]').first().click()
        cy.get('[data-cy=multistep-save]').click()
      })
        
      cy.contains('Add Service').should('exist')
      cy.get('[data-cy=choose_service]').click()
      cy.get('[data-cy=choose_service] li').first().click()
      cy.get('[data-cy=choose_price_tier]').click()
      cy.get('[data-cy=choose_price_tier] li').contains('Staff').first().click()
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
      cy.waitUntil(() =>  cy.get('[data-cy=page-header-bills-dashboard]').should('exist'))
      cy.get('[data-cy=page-header-bills-dashboard]').contains('Bills').should('exist')
    })
  
    it('cannot create an administrative bill with insufficient funds', () => {
      cy.contains('Create bill').click()

      cy.get('[data-cy=billing-select-patient]').within(() => {
        cy.get('[data-cy=search] input').clear().type(NO_FUNDS_PATIENT).trigger('blur')
        cy.waitUntil(() => cy.contains(NO_FUNDS_PATIENT).should('exist'))
        cy.get('[data-cy=patient]').first().click()
        cy.get('[data-cy=multistep-save]').click()
      })

        
      cy.contains('Add Service').should('exist')
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
  
      cy.contains('You have insufficient funds').should('exist')
    })
  })
})