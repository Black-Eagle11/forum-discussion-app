
describe('Login Flow', () => {
  it('should allow user to login successfully', () => {

    cy.visit('http://localhost:5173/login');

    // isi email
    cy.get('input#email')
      .type('testuser@gmail.com')
      .should('have.value', 'testuser@gmail.com');

    // isi password
    cy.get('input#password')
      .type('123456')
      .should('have.value', '123456');

    // klik tombol login
    cy.contains('button', 'Login').click();

    // verifikasi redirect ke halaman utama
    cy.url().should('eq', 'http://localhost:5173/');

    // pastikan navbar muncul (indikasi berhasil login)
    cy.contains('Forum Diskusi').should('be.visible');
  });
});
