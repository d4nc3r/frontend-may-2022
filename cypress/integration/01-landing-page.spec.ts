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

  it('displays the home component', () => {
    cy.get('[data-home-component]').should('exist');
  });
});

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('course list link', () => {
    it('has the course list link', () => {
      cy.get('[data-nav-course-list]').should('exist');
    });

    it('shows the course list component when course link clicked', () => {
      cy.get('[data-nav-course-list]').click();
      cy.get('app-courses').should('exist');
    });
  });

  describe('hypertheory training link', () => {
    it('has the link', () => {
      cy.get('[data-hypertheory-training]').should('exist');
    });

    it('shows the home component when link clicked', () => {
      cy.get('[data-hypertheory-training]').click();
      cy.get('[data-home-component]').should('exist');
    });
  });
});
