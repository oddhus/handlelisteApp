describe('Setting page', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
  
    before(() => {
      cy.visit('signin')
      cy.login(username, password)
    })
  
    it('Should set page to Norwegian when selecting Norwegian ', function () {
        cy.visit('settings')
        cy.get('[data-cy=no-radio]').click()
        cy.contains('Recipes').should('not.exist')
        cy.contains('Oppskrifter').should('exist').should('be.visible')
    })

    it('Should set page to English when selecting English', function () {
        cy.get('[data-cy=en-radio]').click()
        cy.contains('Recipes').should('exist').should('be.visible')
        cy.contains('Oppskrifter').should('not.exist')
    })
  })