import React from 'react';

import { test, describe } from 'vitest';

import { render, screen } from './testUtil';
import '@testing-library/jest-dom';
import LoginPage from '../pages/login';

describe('Login Page Component', () => {
  beforeEach(() => {
    const TestComp = () => <LoginPage />;
    render(<TestComp />, {
      route: '/',
    });
  });
  test('will render', () => {
    expect(screen.getByText('Sign in to Chronicle')).toBeInTheDocument();
  });
});
