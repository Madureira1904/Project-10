describe('Panier - quantité négative', () => {

  it('should prevent sending a request with a negative quantity', () => {

    // Login
    cy.login()

    // Observer la requête d'ajout au panier
    cy.intercept('PUT', '**/orders/add').as('addToCart')

    // Ouvrir un produit
    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]', { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    // Saisir une quantité négative
    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('-1')

    // Vérifier que le champ est invalide
    cy.get('[data-cy="detail-product-quantity"]')
      .should('have.value', '-1')
      .and('have.class', 'ng-invalid')

    // Tenter d'ajouter au panier
    cy.get('[data-cy="detail-product-add"]')
      .click({ force: true })

    // Vérifier la réponse de l'API
    cy.wait('@addToCart').then((interception) => {

      expect(interception.response).to.exist

      // Le backend ne devrait jamais accepter une quantité négative
      expect(interception.response.statusCode).to.not.eq(200)

    })

  })

})

// Verifica que o sistema nao aceita quantidades negativas.