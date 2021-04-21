describe('The Login Page', () => {

    const invalidUsername = 'Testtestesen'
    const invalidPassword = 'thispasswordisinvalid'
    const validUsername =  Cypress.env('username')
    const validPassword = Cypress.env('password')

    it('Should show error when not including username or password', function () {
        cy.visit('signin')
        
        cy.get('[data-testid=login-Button]').click()

        cy.contains('username is required').should('be.visible')
        cy.contains('password is required').should('be.visible')
    })

    it('Should remove errors from input after giving input', function () {
        cy.get('[data-cy=username-input]').type(invalidUsername).should('have.value', invalidUsername)
        cy.get('[data-cy=password-input]').type(invalidPassword).should('have.value', invalidPassword)

        cy.contains('username is required').should('not.exist')
        cy.contains('password is required').should('not.exist')
    })

    it('Should display error when using incorret password/username combination', function () {
        cy.get('[data-testid=login-Button]').click()
        cy.contains('Invalid username or password', {timeout: 15000}).should('be.visible')
    })

    it('Should redirect to shoppinglist page when logging in with correct credentials and set jwt', function () {
        cy.get('[data-cy=username-input]').clear().type(validUsername).should('have.value', validUsername)
        cy.get('[data-cy=password-input]').clear().type(`${validPassword}{enter}`)
        
        cy.url({timeout: 15000}).should('include', '/shopping-list')
        cy.should(() => {
            expect(localStorage.getItem('jwt')).to.not.be.null
            expect(localStorage.getItem('jwt')).to.not.equal('')
        })
    })
  })