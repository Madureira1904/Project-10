describe('API - Login Success', () => {

  it('should login with valid user', () => {

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

    })

  })

})