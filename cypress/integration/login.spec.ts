describe('login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('will login with username and password and take user to home page', () => {
    cy.testId('input-username').find('input').clear().type('test@konomi.ai');
    cy.testId('input-password').find('input').clear().type('test');
    cy.testId('btn-login').click();
    cy.contains('Here is your daily briefing').should('be.visible');
  });
});
