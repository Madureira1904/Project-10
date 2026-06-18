describe('Panier - disponibilité', () => {

  it('should display stock field', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-stock"]')
      .should('be.visible')

  })

})