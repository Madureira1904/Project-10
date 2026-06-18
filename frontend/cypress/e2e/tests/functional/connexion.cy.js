describe('Functional Test - Connexion', () => {

  it('should login successfully with valid credentials', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')

    cy.get('[data-cy="login-input-password"]')
      .type('testtest')

    cy.get('[data-cy="login-submit"]')
      .click()

    cy.contains('Mon panier')
      .should('be.visible')

    cy.contains('Déconnexion')
      .should('be.visible')

  })

})