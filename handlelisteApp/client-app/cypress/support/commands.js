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
  console.log(username)
  console.log(password)
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
