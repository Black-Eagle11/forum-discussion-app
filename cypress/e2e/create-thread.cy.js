describe('Create Thread Flow', () => {
  it('should allow user to create new thread', () => {
    // GANTI jika port berbeda
    const baseUrl = 'http://localhost:5173';

    cy.visit(`${baseUrl}/login`);

    cy.get('#email').type('testuser@gmail.com');
    cy.get('#password').type('123456');
    cy.contains('button', 'Login').click();

    cy.url().should('eq', `${baseUrl}/`);

    cy.visit(`${baseUrl}/new`);

    cy.get('#title')
      .type('Thread E2E Cypress')
      .should('have.value', 'Thread E2E Cypress');

    cy.get('#category')
      .type('testing')
      .should('have.value', 'testing');

    cy.get('#body')
      .type('Ini adalah isi thread dari Cypress E2E testing.')
      .should('have.value', 'Ini adalah isi thread dari Cypress E2E testing.');

    cy.contains('button', 'Kirim').click();

    cy.url().should('eq', `${baseUrl}/`);
  });
});
