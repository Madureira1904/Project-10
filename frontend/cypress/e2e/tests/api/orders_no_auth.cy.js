describe('API - Orders Without Authentication', () => {

  it('should return 401 when user is not connected', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(401)

    })

  })

})