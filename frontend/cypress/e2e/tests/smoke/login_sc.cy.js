describe('Smoke Test - Login Page', () => {

  it('should display login form elements', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .should('be.visible')

    cy.get('[data-cy="login-input-password"]')
      .should('be.visible')

    cy.get('[data-cy="login-submit"]')
      .should('be.visible')

  })

})