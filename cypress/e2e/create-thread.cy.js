describe('Create Thread Flow', () => {
  it('should allow user to login and create a new thread', () => {
    const email = `test${Date.now()}@mail.com`;
    const password = '123456';
    const title = `Thread Cypress ${Date.now()}`;
    const body = 'Ini adalah isi thread dari Cypress E2E test';

    // ===== REGISTER =====
    cy.visit('/register');

    cy.get('#name').type('Test User');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Register').click();

    cy.url({ timeout: 10000 }).should('include', '/login');

    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.contains('button', 'Login').click();

    cy.contains('Daftar Thread', { timeout: 15000 }).should('be.visible');

    cy.contains('Buat Thread', { timeout: 10000 }).click();

    cy.url({ timeout: 10000 }).should('include', '/new');

    cy.get('#title', { timeout: 15000 }).should('be.visible');
    cy.get('#body').should('be.visible');

    cy.get('#title').type(title);
    cy.get('#body').type(body);

    cy.contains('button', 'Kirim').click();

    cy.contains('Daftar Thread', { timeout: 15000 }).should('be.visible');

    cy.contains(title, { timeout: 15000 }).should('exist');
  });
});
