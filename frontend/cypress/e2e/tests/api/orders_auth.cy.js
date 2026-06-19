describe('API - Orders Authenticated', () => {

  it('should return current user cart', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.token

      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('orderLines')

        expect(response.body.orderLines)
          .to.be.an('array')

      })

    })

  })

})

// Verifica que um utilizador autenticado consegue consultar o conteúdo do seu carrinho.