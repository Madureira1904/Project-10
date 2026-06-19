describe('API - Negative Quantity', () => {

  it('should refuse negative quantity', () => {

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
            p => p.availableStock > 0
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
              quantity: -5
            }
          }).then((response) => {

            // Ce que l'application devrait faire
            expect(response.status).to.not.eq(200)

          })

        })

    })

  })

})