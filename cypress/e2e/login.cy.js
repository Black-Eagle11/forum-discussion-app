describe('Register and Login Flow', () => {
  it('should allow user to register then login successfully', () => {
    const email = `test${Date.now()}@mail.com`;
    const password = '123456';

    // ===== REGISTER =====
    cy.visit('/register');

    cy.get('#name').should('be.enabled').type('Test User');
    cy.get('#email').should('be.enabled').type(email);
    cy.get('#password').should('be.enabled').type(password);

    cy.contains('button', 'Register').click();

    // Tunggu benar-benar pindah ke halaman login
    cy.url({ timeout: 10000 }).should('include', '/login');

    // ===== LOGIN =====
    cy.get('#email', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type(email);

    cy.get('#password')
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type(password);

    cy.contains('button', 'Login')
      .should('not.be.disabled')
      .click();

    // ===== ASSERT LOGIN BERHASIL =====
    cy.contains('Daftar Thread', { timeout: 15000 }).should('be.visible');
  });
});
