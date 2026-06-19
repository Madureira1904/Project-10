describe('API - Add Product To Cart', () => {

  it('should add available product to cart', () => {

    // Login
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.token

      // Procurar um produto com stock positivo
      cy.request('http://localhost:8081/products')
        .then((productsResponse) => {

          const product = productsResponse.body.find(
            p => p.availableStock > 0
          )

          expect(product).to.exist

          cy.log('PRODUCT ID = ' + product.id)
          cy.log('STOCK = ' + product.availableStock)

          // Adicionar ao carrinho
          cy.request({
            method: 'PUT',
            url: 'http://localhost:8081/orders/add',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              product: product.id,
              quantity: 1
            }
          }).then((response) => {

            expect(response.status).to.eq(200)

          })

        })

    })

  })

})

// Verifica que um produto disponível pode ser adicionado ao carrinho através da API.