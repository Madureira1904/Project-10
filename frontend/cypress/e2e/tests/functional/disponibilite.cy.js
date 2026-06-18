describe('Panier - disponibilité produit', () => {

  it('should display stock and allow product if stock > 1', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-stock"]')
      .should('exist')
      .and('contain.text', 'stock')

  })

})