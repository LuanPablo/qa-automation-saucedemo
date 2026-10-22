
Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.loginAs('standard_user', 'secret_sauce');

  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_item').should('have.length.greaterThan', 0);
});

Cypress.Commands.add('loginAs', (username, password) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('fillCheckoutInfo', () => {
  cy.get('[data-test="firstName"]').type('Luan');
  cy.get('[data-test="lastName"]').type('QA');
  cy.get('[data-test="postalCode"]').type('90000000');
});

Cypress.Commands.add('addBackpackToCart', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  cy.get('.shopping_cart_badge').should('have.text', '1');
});
