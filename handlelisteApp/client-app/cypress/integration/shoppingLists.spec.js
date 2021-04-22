describe('Shopping lists page', () => {
  const username = Cypress.env('username')
  const password = Cypress.env('password')

  before(() => {
    cy.visit('signin')
    cy.login(username, password)
  })

  it('Should display no shoppinglists found when there are no shoppinglists', function () {
    cy.visit('shopping-list')
    cy.get('[data-cy=lang-flag-en]').click()
    cy.contains('No shoppinglists found').should('exist').should('be.visible')
  })

  it('Should redirect to new shoppinglist when clicking new shoppinglist', function () {
    cy.get('[data-cy=new-shoppinglist]').click()
    cy.url().should('contain', 'shopping-list/')
    cy.contains('New Shopping list').should('be.visible')
  })

  it('Should display the new shoppinglist in the list of shoppinglists', function () {
    cy.get('[data-cy="shoppinglist-title"]').click().type('My new super cool shoppinglist')
    cy.get('[aria-label="Submit"]').click()
    cy.get('[data-cy="Shopping List"]').click()
    cy.get('[data-cy=shoppinglist-name]').should('have.text', 'My new super cool shoppinglist')
  })

  it('Should delete the shoppinglist and give feedback when clicking trashcan', function() {
    cy.get('[data-testid=delete-shoppinglist]').click()
    cy.contains('My new super cool shoppinglist').should('not.exist')
    cy.contains('Shoppinglist successfully deleted!').should('be.visible')
  })

  it('Should give feedback if there was an error fetching', function () {
    cy.intercept('GET', 'shoppinglist', {statusCode: 404})
    cy.get('[data-cy=account-nav-btn]').click()
    cy.get('[data-cy=Settings]').click()
    cy.get('[data-cy="Shopping List"]').click()
    cy.contains('Something went wrong, please try again!').should('be.visible')
  })

  it('Should give feedback when there is an error deleting the shoppinglist', function () {
      cy.intercept('GET', 'shoppinglist', {fixture: 'shoppingLists'})
      cy.intercept('DELETE', 'shoppinglist/38', {statusCode: 401})
      cy.login(username, password)
      cy.visit('shopping-list').as('navigate')
      cy.wait(200)
      cy.get('[data-cy=lang-flag-en]').click()
      cy.get('[data-cy=delet-shoppinglist38]').click()
      cy.contains('Something went wrong, please try again!').should('be.visible')
  })

  it('Should display correct number of shoppinglists', function (){
      cy.get('[data-cy=shoppinglist-name]').should('have.length', 4)
  })

  it('Should redirect to correct shoppinglist when clicking shoppinglist', function () {
      cy.contains('Spar').click()
      cy.url().should('contain', 'shopping-list/39')
      cy.get('.chakra-editable__preview').should('have.text', 'Spar')
      cy.get('.chakra-checkbox ').should('have.length', 4)
      cy.contains('Pottis').should('be.visible')
      cy.contains('Pepsi max').should('be.visible')
      cy.contains('Brunos').should('be.visible')
      cy.contains('Fisk').should('be.visible')
  })

})
