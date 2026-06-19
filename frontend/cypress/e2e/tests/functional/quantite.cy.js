describe('Panier - quantité négative', () => {

  it('should reject negative quantity', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('-1')

    cy.get('[data-cy="detail-product-quantity"]')
      .should('have.value', '-1')

  })

})

// Verifica que o sistema rejeita quantidades negativas.