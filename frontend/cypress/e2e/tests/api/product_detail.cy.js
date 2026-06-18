describe('API - Product Detail', () => {

  it('should return a specific product', () => {

    cy.request('http://localhost:8081/products/5')
      .then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('id')

        expect(response.body.id)
          .to.eq(5)

        expect(response.body)
          .to.have.property('name')

        expect(response.body)
          .to.have.property('availableStock')

      })

  })

})