describe('Panier - quantité extrême', () => {

  it('should test adding an extreme quantity', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')

    cy.get('[data-cy="login-input-password"]')
      .type('testtest')

    cy.get('[data-cy="login-submit"]')
      .click()

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('999999')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.url()
      .then((url) => {

        expect(url)
          .to.not.include('/cart')

      })

  })

})

// Verifica que o sistema aplica corretamente valores superiores 20 e valores ridiculos