// Customer add some items from the menu to the cart
// Customer checkout the cart successfully
// Customer logout from the application

describe('Tes Login', () => {
  it('User should able to login', () => {
    cy.visit('http://localhost:4200/');
    cy.wait(500);
    let name = 'Jean';
    let pass = 'Nisha'
    cy.get('[data-cy="input-name"]').type(name);
    cy.wait(500);
    cy.get('[data-cy="input-password"]').type(pass);
    cy.wait(500);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);
    cy.get('[data-cy="text-navbar-profile-name"]').contains(`Hi, ${name}`);
    cy.get('[data-cy="btn-add-menu-item-to-cart"]').each((cart) => {
      cy.get(cart).click();
      cy.wait(500);
    });
    cy.get('[data-cy="btn-checkout"]').click();
    cy.wait(500);
    cy.get('[data-cy="btn-logout"]').click();
    cy.wait(500);
  })
})
