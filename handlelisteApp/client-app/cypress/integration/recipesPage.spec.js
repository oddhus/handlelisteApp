import myRecipes from '../fixtures/myRecipes.json'

describe('Recipe page', () => {
  const username = Cypress.env('username')
  const password = Cypress.env('password')

  const recipeName = 'This is a test recipe'
  const shortDescription = 'This is a test decsription'
  const apporach = 'Cursh egg, eat nam nam'
  const ingredients = [
    { name: 'ingredient1', quantity: 1, unit: 'KG' },
    { name: 'ingredient2', quantity: 2, unit: 'G' },
  ]

  before(() => {
    cy.visit('signin')
    cy.login(username, password)
  })

  it('Should display no rceipes and create recipe button when navigating to recipe page ', function () {
    cy.visit('recipes')
    cy.get('[data-cy=lang-flag-en]').click()
    cy.intercept('recipe/user/*', {})
    cy.get('[data-cy=noRecipe]').should('be.visible')
    cy.get('[data-cy=create-recipe-btn]').should('exist').click()
  })

  it('Should not display create recipe btn and no recipe text when recipe exist', function () {
    cy.intercept('POST', '/recipe', { fixture: 'createRecipe' })
    cy.intercept('recipe/user/*', { fixture: 'createRecipe' })
    cy.fillCreateRecipeForm(recipeName, shortDescription, apporach, ingredients)
    cy.get('[data-cy=create-recipe-btn]').should('not.exist')
    cy.get('[data-cy=recipe-card-title]').should(
      'have.text',
      'This is a test recipe'
    )
  })

  it('Should delete delete correct recipe when clicking delete recipe btn and give feedback', function () {
    cy.intercept('DELETE', 'recipe/33', { statusCode: 204 })
    cy.contains('This is a test recipe').should('exist')
    cy.get('[data-cy=delete-recipe-btn]').click()
    cy.contains('This is a test recipe').should('not.exist')
    cy.contains('Recipe created successfully', {timeout: 4000}).should('exist').should('be.visible')
  })

  it('Should display three recipes in my recipes', function () {
    cy.intercept('recipe/user/*', { fixture: 'myRecipes' })
    cy.request('GET', 'recipe/user/3')
    cy.get('[data-cy="allRecipesTab"]').click()
    cy.get('[data-cy="myCookBookTab"]').click()
    cy.contains('asdf').should('be.visible')
    cy.get('[data-cy="recipe-card"]').should('have.length', 8)
  })

  it('Should filter recipes in my recipes when using search bar', function () {
    cy.get('[data-cy=recipe-card-title]').should('have.length', 8)
    cy.get('.chakra-input').click().type('Pizza')
    cy.get('[data-cy=recipe-card-title]').should('have.length', 6)
  })

  it('Should change url based on content in searchbar', function () {
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
    cy.intercept('recipe/all', { fixture: 'allRecipes' })
    cy.get('[data-cy="allRecipesTab"]').click()
    cy.get('[data-cy="recipe-card"]').should('have.length', 10)
  })

  it('Should change between card-view and list-view', function () {
    cy.get('[data-cy=list-view]').should('be.visible').click()
    cy.get('[data-cy=recipe-list-item]').should('exist')
    cy.get('[data-cy=card-view]').should('be.visible').click()
    cy.get('[data-cy=recipe-card]').should('exist')
  })

  it('Should display four recipe suggestions', function() {
    cy.intercept("recipe/suggestions", {fixture: 'recipeSuggestions'})
    cy.get('[data-cy=recipeSuggestionTab]').click()
    cy.get('[data-cy="recipe-card"]', {timeout: 5000}).should('have.length', 14)
  })

  it('Should navigate to recipe page when clicking recipe and should contain correct info', function(){
    cy.intercept('GET', 'recipe/2', {fixture: 'fiskegrateng'})
    cy.window().its('recipeStore').then(recipeStore => {
      recipeStore.currentRecipe = myRecipes[0]
    })
    cy.contains('Fiskegrateng').click({force: true})
    cy.get('.chakra-heading', {timeout: 2000}).should('contain', 'Fiskegrateng')
    cy.contains('Melk').should('be.visible')
    cy.contains('Fisk').should('be.visible')
    cy.contains('Egg').should('be.visible')
  })

  it('Should give feedback to user when error occurs while fetching recipes', function() {
    cy.intercept('recipe/all', { statusCode: 404})
    cy.get('[data-cy=Recipes]').click()
    cy.get('[data-cy="allRecipesTab"]').click()
    cy.contains('Failed to retrive recipes', {timeout: 4000}).should('exist').should('be.visible')
  })
})
