describe('Security Test - XSS Review', () => {

  it('should verify that XSS is not executed in comments', () => {

    // 1. Criar um "espião" para monitorizar se algum alert() é disparado no navegador
    const alertSpy = cy.stub();
    cy.on('window:alert', alertSpy);

    //Login
    cy.login()

    // Navegação para a página de reviews
    cy.visit('http://localhost:4200/#/reviews')

    // Payloads de teste 
    const payload = `javascript:/*--> </title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(42);//'>`;

    // Injeção dos scripts nos campos
    cy.get('[data-cy="review-input-title"]').type('<marquee onstart=alert(1)>Teste</marquee>')
    cy.get('[data-cy="review-input-comment"]').type(payload)

    // Seleção da nota (rating) e submissão
    cy.get('[data-cy="review-input-rating-images"] img').last().click({ force: true })
    cy.get('[data-cy="review-submit"]').click()

    cy.wait(2000) // Aguarda a gravação/renderização

    //1: Validar que a review foi criada procurando pelo texto real inserido na tag marquee
    cy.contains('Teste').should('exist')

    //2: A prova real de segurança.
    // Garantir que o espião NUNCA foi chamado, ou seja, nenhum dos alerts (alert(1) ou alert(42)) executou.
    cy.wrap(alertSpy).should('not.have.been.called')
  })

})
// Verifica que um script inserido num comentário não é executado nem apresentado ao utilizador.