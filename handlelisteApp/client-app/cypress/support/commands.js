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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
  let userId = ''
  cy.request('POST', 'user/login', {
    username: username,
    password: password,
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.token).to.not.be.null
    localStorage.setItem('jwt', response.body.token)
    userId = response.body.userID
  })
  cy.window()
    .its('userStore')
    .then((userStore) => {
      userStore.user = {
        username: username,
        userID: userId,
        token: localStorage.getItem('jwt'),
      }
    })
})

Cypress.Commands.add('fillCreateRecipeForm', (recipeName, shortDescription, approach, ingredients) => {
  cy.get('#recipeName').click().type(recipeName)
  cy.get('#shortDescription').click().type(shortDescription)
  cy.get('#approach').click().type(approach)
  
  let i = 0 
  for(let y = 0; ingredients.length-1 > y; y++){
    cy.get('[data-cy=add-ingredient]').click()
  }
  ingredients.forEach(ingredient => {
    cy.get('[data-cy=ingredient-name' + i + ']').click().type(ingredient.name)
    cy.get('[data-cy=ingredient-qunatity' + i + ']').click().type(ingredient.quantity)
    cy.get('[data-cy=unit-select' + i + ']').select(ingredient.unit)
    i++
  });
  cy.get('[data-cy=save-recipe]').click()
})
