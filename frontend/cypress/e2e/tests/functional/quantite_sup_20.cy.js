describe('Panier - quantité supérieure à 20', () => {

  it('should test quantity greater than 20', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('21')

    cy.get('[data-cy="detail-product-quantity"]')
      .should('have.value', '21')

  })

})

// Verifica que o sistema aplica corretamente valores superiores 20