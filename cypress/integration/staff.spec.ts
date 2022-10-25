import { API_HOST, uuid } from '../utils';

describe('Staff management page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/staff');
  });

  it('As a staff member, I want to be able to add staff to the system, so other staff could access the system as well.', () => {
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

  it('As a staff member, I want to be able to view the email and role details of another staff', () => {
    cy.contains('Email').should('be.visible');
    cy.contains('Role').should('be.visible');
  });

  it('As a staff member, I want to be able to suspend other staff accounts so I can prevent them from accessing the system.', () => {
    const username = `${uuid()}-suspend@ki.ai`;
    cy.request({
      url: `${API_HOST}/staff`,
      method: 'POST',
      body: {
        email: username,
        password: 'password',
        firstName: 'Suspend',
        lastName: 'Tester',
        roleIds: [],
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          'auth.accessToken',
        )}`,
      },
    }).then((res) => {
      cy.visit(`/staff/${res.body.data.id}`);
      cy.testId('btn-toggle-staff-suspension').click();
      cy.contains('Unsuspend').should('be.visible');
    });
  });

  it("As a staff, I want to be able to reset another staff's account password, so they can regain access if they forgot their password", () => {
    const username = `${uuid()}-reset@ki.ai`;
    cy.request({
      url: `${API_HOST}/staff`,
      method: 'POST',
      body: {
        email: username,
        password: 'password',
        firstName: 'Reset Password',
        lastName: 'Tester',
        roleIds: [],
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          'auth.accessToken',
        )}`,
      },
    }).then((res) => {
      cy.visit(`/staff/${res.body.data.id}`);
      cy.testId('btn-reset-password').click();
      cy.contains('Reset staff password').should('be.visible');
      cy.testId('btn-confirm-reset').click();
      cy.contains('New Password').should('be.visible');
      cy.testId('btn-done-password-reset').click();
    });
  });
});
