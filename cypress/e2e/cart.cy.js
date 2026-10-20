
describe('Carrinho de compras', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.url().should('include', '/inventory.html');
  });

  it('deve adicionar um produto ao carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    cy.get('.shopping_cart_badge')
      .should('have.text', '1');

    cy.get('[data-test="shopping-cart-link"]')
      .click();

    cy.get('.cart_item')
      .should('have.length', 1);

    cy.contains('Sauce Labs Backpack')
      .should('be.visible');
  });

  it('deve remover um produto do carrinho', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();

  cy.get('.shopping_cart_badge')
    .should('have.text', '1');

  cy.get('[data-test="remove-sauce-labs-backpack"]')
    .click();

  cy.get('.shopping_cart_badge')
    .should('not.exist');

  cy.get('[data-test="shopping-cart-link"]')
    .click();

  cy.get('.cart_item')
    .should('not.exist');

  cy.contains('Sauce Labs Backpack')
    .should('not.exist');
});
});
