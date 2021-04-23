import favs from '../fixtures/favorites.json'

describe('Shoppinglist page', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
    const shoppinglistName = "My new super duper cool shoppinglist"
  
    before(() => {
      cy.visit('signin')
      cy.login(username, password)
      cy.visit('shopping-list')
      cy.get('[data-cy=lang-flag-en]').click()
      cy.get('[data-cy=new-shoppinglist]').click()
    })

    after(() => {
        cy.visit('signin')
        cy.login(username, password)
        cy.visit('shopping-list')
        cy.get('[data-testid=delete-shoppinglist]', {timeout: 5000}).first().click()
        cy.wait(4000)
        cy.get('[data-testid=delete-shoppinglist]', {timeout: 4000}).click()
    })

    it('Should have standard values when first creating shoppinglist ', function () {
        cy.contains('No items').should('exist').should('be.visible')
        cy.get('[data-cy=shoppinglist-title]').should('have.text', 'New Shopping list')
    })

    it('Should delete item from shoppinglist when clicking the trashcan', function() {
        cy.get('[data-cy=shoppinglist-title]').click().type(shoppinglistName)
        cy.get('[aria-label="Submit"]').click()
        cy.get('[data-cy=add-item]').click()
        cy.get('[data-cy=item-name]').click().type('asdfxcv')
        cy.get('[data-cy=delete-item]').click()
        cy.contains('asdfxcv').should('not.exist')
        cy.get('[data-cy="Shopping List"]').click()
        cy.get('[data-cy=shoppinglist-name]').eq(0).click()
        cy.contains('No items').should('exist').should('be.visible')
    })

    it('Should save the shoppinglist', function () {
        cy.get('[data-cy=add-item]').click()
        cy.wait(100)
        cy.get('[data-cy=item-name]').click().type('Cheese')
        cy.get('[data-cy=add-item]').click()
        cy.get('[data-cy=item-name]').click().type('Bread')
        cy.get('[data-cy=add-item]').click()
        cy.get('[data-cy=item-name]').click().type('Butter')
        for(let x = 0; x < 5; x++){
            cy.get('[data-cy=item-increment]').first().click()
        }
        for(let x = 0; x < 3; x++){
            cy.get('[data-cy=item-increment]').eq(1).click()
        }
        cy.get('[data-cy=item-decrement]').eq(1).click()
        cy.get('[data-cy=item-bought-checkbox]').eq(1).click()  

        cy.get('[data-cy="Archive shoppinglist"]').click()
        cy.wait(2000)
        cy.get('[data-cy=shoppinglist-name]').eq(0).click()
        cy.get('[data-cy=shoppinglist-title]').should('have.text', shoppinglistName)
        cy.contains('Cheese').should('be.visible')
        cy.contains('Bread').should('be.visible')
        cy.contains('Butter').should('be.visible')
        cy.get('[data-cy=item-bought-checkbox]').eq(1).children().should('be.checked')
    })

    it('Should add items from recipe and return to shoppinglist with items', function () {
        cy.intercept('recipe/user/*', {fixture: 'myRecipes'})
        cy.intercept('/recipe/favorite', {fixture: 'favorites'})
        cy.intercept('/recipe/410', {body: favs[1]})
        cy.get('[data-cy=shoppinglist-menu]').click()
        cy.get('[data-cy=from-recipe]').click({force: true})
        cy.get('[data-cy=favorites-tab]').click()
        cy.contains('Bæggis').click()
        cy.get('[data-cy=add-to-recipe]').click()
        cy.get('[data-cy=add-return]').click()
        favs[1].items.forEach(item => {
            cy.contains(item.itemName).should('be.visible')
        })
    })
    
    it('Should add unbougth items from previous shoppingtrip to new list, modal should not contain bought items', function () {
        cy.visit('/shopping-list')
        cy.login(username, password)
        cy.visit('/shopping-list')
        cy.get('[data-cy=new-shoppinglist]').click()
        cy.get('[data-cy=item-from-last-trip]').click({force: true})
        cy.get('[data-cy=item-add-checkbox]').first().click()
        cy.get('Bread').should('not.exist')
        cy.get('[data-cy=add-items]').click()
        cy.contains('Butter').should('be.visible')
    })
  })