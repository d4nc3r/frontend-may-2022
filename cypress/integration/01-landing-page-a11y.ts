describe('accessibility test for home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should pass accessibility', () => {
    cy.checkForDetectableAccessibilityIssues();
  });
});
