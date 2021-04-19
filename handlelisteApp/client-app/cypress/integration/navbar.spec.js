describe('Nav-bar', () => {
    
    const username = Cypress.env('username')
    const password = Cypress.env('password')

    before(() => {
        if(localStorage.getItem('jwt') !== '' || localStorage.getItem('jwt') !== null){
            localStorage.removeItem('jwt')
        }
    })

    it('Should only show non protected routes', function () {
        cy.visit('signin')
        cy.get('[data-cy=Recipes]').should('be.visible')
        cy.get('[data-cy=Login]').should('be.visible')
        cy.get('[data-cy=Register]').should('be.visible')
        cy.get('[data-cy="Shopping List"]').should('not.exist')
        cy.get('[data-cy="Create Recipes"]').should('not.exist')
        cy.get('[data-cy=account-nav-btn]').should('not.exist')
    })

    it('Should use "hamburger" menu when viewport got with 450', function () {
        cy.viewport(450, 600)
        cy.get('[data-cy=Login]').should('not.be.visible')
        cy.get('[data-cy=nav-hamburger]').should('be.visible').click()
        cy.get('[data-cy=Login]').should('be.visible')
        cy.get('[data-cy=Register]').should('be.visible')
        cy.get('[data-cy=Recipes]').should('be.visible')
    })

    it('Should make protected routes available when logged in', function () {
        cy.login(username, password)
        cy.get('[data-cy=Recipes]').should('be.visible')
        cy.get('[data-cy=Login]').should('not.exist')
        cy.get('[data-cy=Register]').should('not.exist')
        cy.get('[data-cy="Shopping List"]').should('be.visible')
        cy.get('[data-cy="Create Recipes"]').should('be.visible')
        cy.get('[data-cy=account-nav-btn]').should('be.visible')
    })

    it('Should have account button wich contains dropdown for settings and logout', function () {
        cy.get('[data-cy=account-nav-btn]').should('be.visible').click()
        cy.get('[data-cy=Settings').should('be.visible')
        cy.get('[data-cy=logout-nav-btn]').should('be.visible')
    })

    it('Should navigate to sigin page when logging out', function () {
        cy.get('[data-cy=logout-nav-btn]').should('be.visible').click({force: true})
        cy.url().should('include', 'signin')
    })

    it('Should change language when clicking flags', function () {
        cy.get('[data-cy=lang-flag-no]').should('be.visible').click()
        cy.contains('Oppskrifter').should('be.visible')
        cy.get('[data-cy=lang-flag-en]').should('be.visible').click()
        cy.contains('Recipes').should('be.visible')
        cy.get('[data-cy=lang-flag-no]').should('be.visible').click()
        cy.contains('Oppskrifter').should('be.visible')

    })

    it('Should clear localstore and mobx store when logging out', function () {
        cy.window().its('userStore').then(userStore => {
            expect(userStore.user).to.be.null
            expect(localStorage.getItem('jwt')).to.be.null
        })
    })

  })