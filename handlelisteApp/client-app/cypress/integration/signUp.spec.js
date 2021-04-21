describe('The signup Page', () => {

    it('Should show errors when not inputing anything', function () {
        cy.visit('/signup')
        cy.get('[data-testid=signup-button]').click()
        cy.contains('The email address is required').should('exist').should('be.visible')
        cy.contains('The username is required').should('exist').should('be.visible')
        cy.contains('The password is required').should('exist').should('be.visible')
      })

    it('Should show error on invalid email input', function () {
        cy.get('[name=emailAddress]').click().type('abcd{enter}')
        cy.contains('emailAddress must be a valid email').should('exist').should('be.visible')

    })

    it('Should clear erros after typing into the text fields', function () {
        cy.get('[name=emailAddress]').click().clear().type('abcd@gmail.com{enter}')
        cy.get('[name=username]').click().type('abcd{enter}')
        cy.get('[name=password]').click().type('abcd')
        cy.contains('emailAddress must be a valid email').should('not.exist')
        cy.contains('The email address is required').should('not.exist')
        cy.contains('The username is required').should('not.exist')
        cy.contains('The password is required').should('not.exist')
    })

    it('Should login the user and redirect to shopping-list page after creating user', function () {
        cy.intercept('POST', 'user', {
            body:{
            userID: 7,
            username: 'abcd',
            token: 'ey71ndhabjasfdklashdfAHJKDSHads.asfAHFAjs.AJDSJDhjk14'
        }
        })
        cy.intercept('GET', 'shoppinglist', {body: []})
        cy.get('[data-testid=signup-button]').click()
        cy.url().should('include', 'shopping-list')
    })
})