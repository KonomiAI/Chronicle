import { uuid } from '../utils';

describe('Staff management page', () => {
  beforeEach(() => {
    cy.visit('/staff');
  });
  it('will be able to invite a staff', () => {
    cy.contains('Staff').should('be.visible');
    cy.testId('btn-staff-invite-dialog').click();
    cy.testId('input-first-name').find('input').clear().type('Cypress');
    cy.testId('input-last-name').find('input').clear().type('Tester');
    cy.testId('input-email')
      .find('input')
      .clear()
      .type(`cypress.tester_${uuid()}@konomi.ai`);
    cy.testId('select-role').find('div[role="button"]').click();
    cy.testId('option-Receptionist').click().type('{esc}');
    cy.testId('btn-invite').click();
  });
});
