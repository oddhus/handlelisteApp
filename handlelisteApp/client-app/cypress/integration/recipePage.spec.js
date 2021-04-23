describe('Recipe page', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
  
    before(() => {
      cy.visit('signin')
      cy.login(username, password)
      cy.intercept('GET', '/recipe/2', {fixture: 'fiskegrateng'})
      cy.visit('recipes/2')
      cy.get('[data-cy=lang-flag-en]').click()
    })

    it('Should show recipe and translate units when changing language ', function () {
        cy.get('.chakra-heading').should('have.text', 'Fiskegrateng')
        cy.contains('PCS').should('be.visible')
        cy.get('[data-cy=lang-flag-no]').click()
        cy.contains('STK').should('be.visible')
    })
  })