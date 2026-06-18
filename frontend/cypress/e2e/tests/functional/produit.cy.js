describe('Functional Test - Produit', () => {

  it('should display product details', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.contains('Consulter')
      .first()
      .click()

    cy.get('img')
      .should('be.visible')

    cy.contains('Ajouter au panier')
      .should('be.visible')

    cy.contains('stock')
      .should('exist')

    cy.contains('60,00 €')
      .should('be.visible')

  })

})