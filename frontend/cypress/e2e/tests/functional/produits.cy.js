describe('Functional Test - Produits', () => {

  it('should display all products with their information', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.contains('Nos produits')
      .should('be.visible')

    cy.get('img')
      .should('have.length.at.least', 8)

    cy.contains('Consulter')
      .should('exist')

    cy.contains('60,00 €')
      .should('be.visible')

    cy.contains('37,00 €')
      .should('be.visible')

  })

})

// Verifica que a lista de produtos é apresentada corretamente ao utilizador.