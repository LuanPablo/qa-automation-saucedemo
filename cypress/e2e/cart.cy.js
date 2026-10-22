
describe('Testes de Carrinho', () => {

  beforeEach(() => {
    cy.login();
  });

  it('deve adicionar produto ao carrinho', () => {
    cy.addBackpackToCart();

    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item')
      .should('have.length', 1);

    cy.contains('Sauce Labs Backpack')
      .should('be.visible');
  });

  it('deve remover produto do carrinho', () => {
    cy.addBackpackToCart();

    cy.get('[data-test="remove-sauce-labs-backpack"]')
      .click();

    cy.get('.shopping_cart_badge')
      .should('not.exist');

    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item')
      .should('not.exist');

    cy.contains('Sauce Labs Backpack')
      .should('not.exist');
  });

});
