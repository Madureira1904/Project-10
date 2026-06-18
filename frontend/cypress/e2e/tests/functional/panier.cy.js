describe('Functional Test - Panier', () => {

  it('should add a product to cart and verify API', () => {

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

    // Ir para produtos
    cy.visit('http://localhost:4200/#/products')

    // Esperar carregamento dos produtos
    cy.get('[data-cy="product-link"]')
      .should('have.length.at.least', 1)

    // Abrir primeiro produto
    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    // Verificar página produto
    cy.get('[data-cy="detail-product-name"]')
      .should('be.visible')

    cy.get('[data-cy="detail-product-stock"]')
      .should('be.visible')

    // Definir quantidade
    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('1')

    // Adicionar ao carrinho
    cy.get('[data-cy="detail-product-add"]')
      .scrollIntoView()
      .click({ force: true })

    // Verificar navegação para o carrinho
    cy.url({ timeout: 10000 })
      .should('include', '/cart')

    // Verificar conteúdo da página
    cy.contains('Panier')
      .should('be.visible')

    cy.contains('Total')
      .should('be.visible')

    // Verificar conteúdo do carrinho através da API
    cy.window().then((win) => {

      const token = win.localStorage.getItem('user')

      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body).to.have.property('orderLines')

        expect(response.body.orderLines.length)
          .to.be.greaterThan(0)

        const names = response.body.orderLines.map(
          line => line.product.name
        )

        expect(names.length)
          .to.be.greaterThan(0)

        cy.log('Produtos encontrados: ' + names.join(', '))

      })

    })

  })

})