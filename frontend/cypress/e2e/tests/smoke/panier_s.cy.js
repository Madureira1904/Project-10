describe('Smoke Test - Ajouter au panier', () => {

  it('should display the add to cart button when user is logged in', () => {

    // Login
    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')

    cy.get('[data-cy="login-input-password"]')
      .type('testtest')

    cy.get('[data-cy="login-submit"]')
      .click()

    cy.contains('Déconnexion')
      .should('be.visible')

    // Ouvrir la liste des produits
    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]', { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    // Vérifier la présence du bouton "Ajouter au panier"
    cy.get('[data-cy="detail-product-add"]')
      .should('be.visible')
      .and('contain.text', 'Ajouter au panier')

  })

})

// Verifica  que um produto pode ser adicionado ao carrinho e que o fluxo principal funciona.