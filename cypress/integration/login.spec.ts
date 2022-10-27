import { API_HOST, uuid } from '../utils';

describe('Identity and login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('As a user, I can sign in and sign out of the application using correct credentials', () => {
    cy.login();
  });

  it('As a user, I can update their password and sign in with updated password', () => {
    const username = `${uuid()}@ki.ai`;
    const initPassword = '12345678';
    cy.request('POST', `${API_HOST}/auth/login`, {
      email: 'test@konomi.ai',
      password: 'test',
    }).then((res) =>
      cy.request({
        url: `${API_HOST}/staff`,
        method: 'POST',
        body: {
          email: username,
          password: initPassword,
          firstName: 'PasswordUpdate',
          lastName: 'Tester',
          roleIds: [],
        },
        headers: {
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }),
    );

    cy.testId('input-username').find('input').clear().type(username);
    cy.testId('input-password').find('input').clear().type(initPassword);
    cy.testId('btn-login').click();
    cy.contains('Here is your daily briefing').should('be.visible');
    cy.visit('/profile');
    cy.testId('input-new-password').find('input').clear().type('newPassword');
    cy.testId('input-confirm-password')
      .find('input')
      .clear()
      .type('newPassword');
    cy.testId('btn-change-password').click();
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.testId('input-username').find('input').clear().type(username);
    cy.testId('input-password').find('input').clear().type('newPassword');
    cy.testId('btn-login').click();
    cy.contains('Here is your daily briefing').should('be.visible');
  });
});
