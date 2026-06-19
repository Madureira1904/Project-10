describe('API - Add Product Out Of Stock', () => {

  it('should refuse adding a product without stock', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.token

      cy.request('http://localhost:8081/products')
        .then((productsResponse) => {

          const product = productsResponse.body.find(
            p => p.availableStock <= 0
          )

          expect(product).to.exist

          cy.request({
            method: 'PUT',
            url: 'http://localhost:8081/orders/add',
            failOnStatusCode: false,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              product: product.id,
              quantity: 1
            }
          }).then((response) => {

            
            expect(response.status).to.not.eq(200)

          })

        })

    })

  })

})

// Verifica o comportamento da API quando se tenta adicionar um produto sem stock disponível. Um produto sem stock não deve poder ser adicionado ao carrinho. O teste da positivo e nao devia.