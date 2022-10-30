import { API_HOST, uuid } from '../utils';

describe('Role management page', () => {
  beforeEach(() => {
    cy.login();
  });
  it('As a staff member, I want to be able to view the roles created for my company, so I can create missing roles and update existing ones.', () => {
    cy.visit('/roles');
    cy.contains('Roles').should('be.visible');
    cy.testId('roles-list').should('be.visible');
  });

  it('As a staff member, I want to be able to create roles, so that nothing more than the required permissions are given.', () => {
    cy.visit('/roles/new');
    cy.testId('input-role-name')
      .find('input')
      .clear()
      .type(`Cypress Role ${uuid()}`);
    cy.testId('checkbox-Inventory-read').click();
    cy.testId('checkbox-Entry-write').click();
    cy.testId('checkbox-Customer-write').click();
    cy.contains('Save').click();
    cy.contains('Role created successfully').should('be.visible');
  });

  it('As a staff member, I want to be able to update existing roles, so that only the correct permissions are given to other staff.', () => {
    cy.request({
      url: `${API_HOST}/roles`,
      method: 'POST',
      body: {
        name: `Cypress Role ${uuid()}`,
        permissions: {
          Inventory: {
            read: true,
            write: false,
          },
          Entry: {
            read: true,
            write: false,
          },
          Customer: {
            read: true,
            write: false,
          },
          Security: {
            read: true,
            write: false,
          },
          Form: {
            read: false,
            write: false,
          },
        },
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          'auth.accessToken',
        )}`,
      },
    }).then((res) => {
      cy.visit(`/roles/${res.body.id}`);
      cy.testId('input-role-name')
        .find('input')
        .clear()
        .type(`Cypress Role updated ${uuid()}`);
      cy.testId('checkbox-Inventory-read').click();
      cy.testId('checkbox-Entry-write').click();
      cy.testId('checkbox-Form-write').click();
      cy.contains('Save').click();
    });
  });
});
