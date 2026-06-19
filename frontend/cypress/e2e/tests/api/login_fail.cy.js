describe('API - Login Fail', () => {

  it('should return 401 with invalid user', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      failOnStatusCode: false,
      body: {
        username: 'fake@test.fr',
        password: 'wrongpassword'
      }
    }).then((response) => {

      expect(response.status).to.eq(401)

    })

  })

})

// Verifica que a API recusa credenciais inválidas e devolve HTTP 401.