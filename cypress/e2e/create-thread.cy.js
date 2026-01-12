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

    // ===== LOGIN =====
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.contains('button', 'Login').click();

    // Tunggu homepage benar-benar siap
    cy.contains('Daftar Thread', { timeout: 15000 }).should('be.visible');

    // ===== KLIK MENU NAVBAR "Buat Thread" (INI KUNCI) =====
    cy.contains('Buat Thread', { timeout: 10000 }).click();

    // Sekarang kita benar-benar ada di halaman /new
    cy.url({ timeout: 10000 }).should('include', '/new');

    // Tunggu sampai form muncul
    cy.get('#title', { timeout: 15000 }).should('be.visible');
    cy.get('#body').should('be.visible');

    // ===== ISI FORM =====
    cy.get('#title').type(title);
    cy.get('#body').type(body);

    cy.contains('button', 'Kirim').click();

    // ===== HARUS BALIK KE HOMEPAGE =====
    cy.contains('Daftar Thread', { timeout: 15000 }).should('be.visible');

    // ===== THREAD HARUS MUNCUL =====
    cy.contains(title, { timeout: 15000 }).should('exist');
  });
});
