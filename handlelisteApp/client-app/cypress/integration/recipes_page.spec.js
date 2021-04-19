describe('Recipe page', () => {
    
    const username = Cypress.env('username')
    const password = Cypress.env('password')

    const recipeName = "This is a test recipe"
    const shortDescription = "This is a test decsription"
    const apporach = "Cursh egg, eat nam nam" 
    const ingredients = [{name: "ingredient1", quantity: 1, unit: "KG"}, {name: "ingredient2", quantity: 2, unit: "G"}]

    before(() => {
        cy.visit('signin')
        cy.login(username, password)
    })

    it('Should display no rceipes and create recipe button when navigating to recipe page ', function () {
        cy.visit('recipes')
        cy.intercept('recipe/user/*', {})
        cy.get('[data-cy=noRecipe]').should('be.visible')
        cy.get('[data-cy=create-recipe-btn]').should('exist').click()
    })

    it('Should not display create recipe btn and no recipe text when recipe exist', function () {
        cy.intercept('POST', '/recipe', {fixture: 'createRecipe'})
        cy.intercept('recipe/user/*', {fixture: 'createRecipe'})
        cy.fillCreateRecipeForm(recipeName, shortDescription, apporach, ingredients)
        cy.get('[data-cy=noRecipe]').should('not.exist')
        cy.get('[data-cy=create-recipe-btn]').should('not.exist')
        cy.get('[data-cy=recipe-card-title]').should('have.text', 'This is a test recipe')
    })

    it('Should delete delete correct recipe when clicking delete recipe btn', function () {
        cy.intercept('DELETE', 'recipe/33', {statusCode: 204})
        cy.contains('This is a test recipe').should('exist')
        cy.get('[data-cy=delete-recipe-btn]').click()
        cy.contains('This is a test recipe').should('not.exist')
    })

    it('Should display three recipes in my recipes', function () {
        cy.intercept('recipe/user/*', {fixture: 'myRecipe'})
        cy.request('GET', 'recipe/user/3')
        cy.get('[data-cy="allRecipesTab"]').click()
        cy.get('[data-cy="myCookBookTab"]').click()
        cy.contains('asdf').should('be.visible')
        cy.get('[data-cy="recipe-card"]').should('have.length', 3)
    })

    it('Should filter recipes in my recipes when using search bar', function () {
        cy.get('.chakra-input').click().type('Pizza')
        cy.contains('asdf').should('not.exist')
        cy.contains('TestOppskrift').should('not.exist')
        cy.contains('Pizza').should('be.visible')
    })

    it('Should change url based on content in searchbar', function() {
        cy.url().should('include', 'recipes?searchText=pizza')
        cy.get('.chakra-input').clear()
        cy.url().should('not.include', 'recipes?searchText=pizza')
    })

    it('Should show recipes when search filter is cleared', function () {
        cy.contains('asdf').should('be.visible')
        cy.contains('TestOppskrift').should('be.visible')
        cy.contains('Pizza').should('be.visible')
    })

    it('Shoud display several recipes in "all recipes" tab', function () {
        cy.intercept('recipe/all', {fixture: 'allRecipes'})
        cy.get('[data-cy="allRecipesTab"]').click()
        cy.get('[data-cy="recipe-card"]').should('have.length', 7)
    })

    it('Should change between card-view and list-view', function () {
        cy.get('[data-cy=list-view]').should('be.visible').click()
        cy.get('[data-cy=recipe-list-item]').should('exist')
        cy.get('[data-cy=card-view]').should('be.visible').click()
        cy.get('[data-cy=recipe-card]').should('exist')
    })
  })