describe('Functional Test - Stock Update After Add To Cart', () => {

  it('should decrease stock after adding product to cart', () => {

    let productId
    let stockInitial

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

    // Procurar produto com stock > 1
    cy.request('http://localhost:8081/products')
      .then((response) => {

        const product = response.body.find(
          p => p.availableStock > 1
        )

        expect(product).to.exist

        productId = product.id
        stockInitial = product.availableStock

        cy.log('ID = ' + productId)
        cy.log('STOCK INITIAL = ' + stockInitial)

        // Abrir produto
        cy.visit(`http://localhost:4200/#/products/${productId}`)

        cy.get('[data-cy="detail-product-name"]')
          .should('be.visible')

        cy.get('[data-cy="detail-product-stock"]')
          .should('be.visible')

        // Quantidade = 1
        cy.get('[data-cy="detail-product-quantity"]')
          .clear()
          .type('1')

        // Adicionar ao carrinho
        cy.intercept('PUT', '**/orders/add')
          .as('addToCart')

        cy.get('[data-cy="detail-product-add"]')
          .scrollIntoView()
          .click({ force: true })

        cy.wait('@addToCart')
          .its('response.statusCode')
          .should('eq', 200)

        // Confirmar carrinho
        cy.url()
          .should('include', '/cart')

        cy.contains('Panier')
          .should('be.visible')

        // Voltar a consultar o mesmo produto na API
        cy.request(`http://localhost:8081/products/${productId}`)
          .then((response2) => {

            const stockFinal = response2.body.availableStock

            cy.log('STOCK FINAL = ' + stockFinal)

            expect(stockFinal)
              .to.equal(stockInitial - 1)

          })

      })

  })

})