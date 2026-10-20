describe('Autenticação na loja', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('deve permitir login com credenciais válidas', () => {
    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.url().should('include', '/inventory.html');

    cy.get('.inventory_item')
      .should('have.length.greaterThan', 0);
  });

  it('deve exibir erro para senha inválida', () => {
    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('senha_incorreta');

    cy.get('[data-test="login-button"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');
  });

  it('deve exibir erro para usuário bloqueado', () => {
    cy.get('[data-test="username"]')
      .type('locked_out_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.url().should('not.include', '/inventory.html');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out');
  });
});