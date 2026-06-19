describe('API - Login', () => {

  it('should refuse invalid credentials then allow valid credentials', () => {

    // Tentative avec utilisateur invalide
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

    // Tentative avec utilisateur valide
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)

      expect(response.body)
        .to.have.property('token')

      expect(response.body.token)
        .to.not.be.empty

    })

  })

})

// Verifica que a API autentica corretamente um utilizador válido e devolve um JWT.