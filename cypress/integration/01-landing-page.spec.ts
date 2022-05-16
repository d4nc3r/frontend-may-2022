describe('The Landing Page', () => {
  it('redirects to the home route', () => {
    cy.visit('/');
    cy.url().should('match', /\/home$/);
  });

  it('displays the login button', () => {
    cy.get('[data-auth-login]').should('exist');
  });

  it('does not display the log out button', () => {
    cy.get('[data-auth-logout]').should('not.exist');
  });
});
