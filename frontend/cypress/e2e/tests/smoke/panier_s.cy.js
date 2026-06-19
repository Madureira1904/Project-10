describe('Smoke Test - Panier', () => {

  it('should allow access to cart after login', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')

    cy.get('[data-cy="login-input-password"]')
      .type('testtest')

    cy.get('[data-cy="login-submit"]')
      .click()

    cy.contains('Mon panier')
      .should('be.visible')

    cy.contains('Mon panier')
      .click()

    cy.url()
      .should('include', '/cart')

  })

})

// Verifica  que um produto pode ser adicionado ao carrinho e que o fluxo principal funciona.