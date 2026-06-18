describe('Security Test - XSS Review', () => {

  it('should verify that XSS is not executed in comments', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')

    cy.get('[data-cy="login-input-password"]')
      .type('testtest')

    cy.get('[data-cy="login-submit"]')
      .click()

    cy.contains('Déconnexion')
      .should('be.visible')

    cy.visit('http://localhost:4200/#/reviews')

    const payload = '<script>alert("XSS")</script>'

    cy.get('[data-cy="review-input-title"]')
      .type('Test XSS')

    cy.get('[data-cy="review-input-comment"]')
      .type(payload)

    cy.get('[data-cy="review-input-rating-images"] img')
      .last()
      .click({ force: true })

    cy.get('[data-cy="review-submit"]')
      .click()

    cy.wait(2000)

    // O review foi criado
    cy.contains('Test XSS')
      .should('exist')

    // O script não aparece na página
    cy.contains(payload)
      .should('not.exist')

  })

})