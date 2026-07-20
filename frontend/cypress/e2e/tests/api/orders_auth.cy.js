describe('API - Orders Authenticated', () => {

  it('should return current user cart', () => {

    // Login
    cy.apiLogin().then((token) => {

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