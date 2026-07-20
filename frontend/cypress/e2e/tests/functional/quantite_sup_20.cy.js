describe('Panier - quantité extrême', () => {

  it('should test adding an extreme quantity', () => {

    // Login
    cy.login()

    // Attendre le chargement des produits
    cy.intercept('GET', '**/products').as('getProducts')

    cy.visit('http://localhost:4200/#/products')

    cy.wait('@getProducts')

    cy.get('[data-cy="product-link"]', { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    // Vérifier que la fiche produit est ouverte
    cy.get('[data-cy="detail-product-name"]')
      .should('be.visible')

    // Saisir une quantité extrêmement élevée
    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('999999')

    cy.get('[data-cy="detail-product-quantity"]')
      .should('have.value', '999999')

    // Observer la requête API
    cy.intercept('PUT', '**/orders/add').as('addToCart')

    cy.get('[data-cy="detail-product-add"]')
      .click({ force: true })

    // Vérifier la réponse de l'API
    cy.wait('@addToCart').then((interception) => {

      expect(interception.response).to.exist

      // Affiche le code retour dans le rapport Cypress
      cy.log(`HTTP Status : ${interception.response.statusCode}`)

      // Si l'application accepte la quantité, on considère que c'est une anomalie
      expect(interception.response.statusCode).to.not.eq(200)

    })

  })

})

// Verifica que o sistema aplica corretamente valores superiores 20 e valores ridiculos