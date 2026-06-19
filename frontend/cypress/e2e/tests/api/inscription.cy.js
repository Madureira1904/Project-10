describe('Inscription', () => {

  it('should create a new account with valid data', () => {

    const uniqueEmail = `qa${Date.now()}@test.fr`

    cy.visit('http://localhost:4200/#/register')

    cy.get('[data-cy="register-input-lastname"]')
      .type('Test')

    cy.get('[data-cy="register-input-firstname"]')
      .type('QA')

    cy.get('[data-cy="register-input-email"]')
      .type(uniqueEmail)

    cy.get('[data-cy="register-input-password"]')
      .type('test123')

    cy.get('[data-cy="register-input-password-confirm"]')
      .type('test123')

    cy.get('[data-cy="register-submit"]')
      .click()

    cy.url()
      .should('not.include', '/register')

  })

  it('should refuse empty fields', () => {

    cy.visit('http://localhost:4200/#/register')

    cy.get('[data-cy="register-submit"]')
      .click()

    cy.get('[data-cy="register-errors"]')
      .should('be.visible')

  })

  it('should refuse invalid email', () => {

    cy.visit('http://localhost:4200/#/register')

    cy.get('[data-cy="register-input-lastname"]')
      .type('Test')

    cy.get('[data-cy="register-input-firstname"]')
      .type('QA')

    cy.get('[data-cy="register-input-email"]')
      .type('email-invalide')

    cy.get('[data-cy="register-input-password"]')
      .type('test123')

    cy.get('[data-cy="register-input-password-confirm"]')
      .type('test123')

    cy.get('[data-cy="register-submit"]')
      .click()

    cy.get('[data-cy="register-errors"]')
      .should('be.visible')

  })

  it('should refuse different passwords', () => {

    cy.visit('http://localhost:4200/#/register')

    cy.get('[data-cy="register-input-lastname"]')
      .type('Test')

    cy.get('[data-cy="register-input-firstname"]')
      .type('QA')

    cy.get('[data-cy="register-input-email"]')
      .type(`qa${Date.now()}@test.fr`)

    cy.get('[data-cy="register-input-password"]')
      .type('test123')

    cy.get('[data-cy="register-input-password-confirm"]')
      .type('different123')

    cy.get('[data-cy="register-submit"]')
      .click()

    cy.get('[data-cy="register-errors"]')
      .should('be.visible')

  })

})