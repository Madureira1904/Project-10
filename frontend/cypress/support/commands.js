Cypress.Commands.add('login', () => {

  cy.visit('http://localhost:4200/#/login')

  cy.get('[data-cy="login-input-username"]')
    .type('test2@test.fr')

  cy.get('[data-cy="login-input-password"]')
    .type('testtest')

  cy.get('[data-cy="login-submit"]')
    .click()

  cy.contains('Déconnexion')
    .should('be.visible')

})

Cypress.Commands.add('apiLogin', () => {

  return cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      username: 'test2@test.fr',
      password: 'testtest'
    }
  }).then((response) => {

    expect(response.status).to.eq(200)

    return response.body.token

  })

})