// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('testId', (value: string) => {
  return cy.get(`[data-testid="${value}"]`);
});

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.testId('input-username').find('input').clear().type('test@konomi.ai');
  cy.testId('input-password').find('input').clear().type('test');
  cy.testId('btn-login').click();
  cy.contains('Here is your daily briefing').should('be.visible');
});
