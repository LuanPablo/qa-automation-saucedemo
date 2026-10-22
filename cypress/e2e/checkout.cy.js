
describe('Testes de Checkout', () => {

  beforeEach(() => {
    cy.login();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    cy.get('.shopping_cart_link')
      .click();

    cy.get('[data-test="checkout"]')
      .click();
  });

  it('deve avançar com dados válidos', () => {
    cy.fillCheckoutInfo();

    cy.get('[data-test="continue"]')
      .click();

    cy.url().should('include', '/checkout-step-two.html');

    cy.get('.cart_item')
      .should('have.length', 1);

    cy.contains('Sauce Labs Backpack')
      .should('be.visible');
  });

  it('deve exibir erro quando o primeiro nome estiver vazio', () => {
    cy.get('[data-test="lastName"]')
      .type('QA');

    cy.get('[data-test="postalCode"]')
      .type('90000000');

    cy.get('[data-test="continue"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required');
  });
   it('deve validar os valores do resumo da compra', () => {
   
    cy.fillCheckoutInfo();

    cy.get('[data-test="continue"]')
      .click();

    cy.get('.inventory_item_price')
      .should('contain', '$29.99');

    cy.get('.summary_subtotal_label')
      .should('contain', '$29.99');

    cy.get('.summary_tax_label')
      .should('be.visible');

    cy.get('.summary_total_label')
      .should('be.visible');
  });
  
  it('deve calcular corretamente o total da compra', () => {
    
    cy.fillCheckoutInfo();

    cy.get('[data-test="continue"]').click();

    cy.get('.summary_subtotal_label')
      .invoke('text')
      .then((subtotalText) => {
        const subtotal = Number(
          subtotalText.replace('Item total: $', '').trim()
        );

        cy.get('.summary_tax_label')
          .invoke('text')
          .then((taxText) => {
            const tax = Number(
              taxText.replace('Tax: $', '').trim()
            );

            cy.get('.summary_total_label')
              .invoke('text')
              .then((totalText) => {
                const total = Number(
                  totalText.replace('Total: $', '').trim()
                );

                expect(total).to.equal(
                  Number((subtotal + tax).toFixed(2))
                );
              });
          });
      });
  });

  it('deve finalizar a compra com sucesso', () => {
    cy.fillCheckoutInfo();

    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();

    cy.url().should('include', '/checkout-complete.html');

    cy.get('.complete-header')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');

    cy.get('.complete-text')
      .should('be.visible');
  });

});
