describe('API - Add Review', () => {

  it('should create a new review', () => {

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

      // Criar review
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: 'Avis Cypress',
          comment: 'Test automatique Cypress',
          rating: 5
        }
      }).then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('title')

        expect(response.body.title)
          .to.eq('Avis Cypress')

        expect(response.body)
          .to.have.property('comment')

        expect(response.body)
          .to.have.property('rating')

        expect(response.body.rating)
          .to.eq(5)

      })

    })

  })

})

// Verifica que um utilizador autenticado consegue criar um novo comentário.