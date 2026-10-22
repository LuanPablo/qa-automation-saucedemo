
describe('Testes de Login', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('deve realizar login com sucesso', () => {
    cy.loginAs('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
  });

  it('deve exibir erro com senha inválida', () => {
    cy.loginAs('standard_user', 'senha_errada');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('não deve permitir login de usuário bloqueado', () => {
    cy.loginAs('locked_out_user', 'secret_sauce');

    cy.url().should('not.include', '/inventory.html');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
  });

});
