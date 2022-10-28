import React, { useEffect } from 'react';
import { describe, vi, test } from 'vitest';
import * as jwt from 'jsonwebtoken';
import { checkIsLoggedIn, useAuth } from '../utils';
import { render } from './testUtil';
import { LocalStorageMock } from '../testing-utils/local-storage-mock';

describe('useAuth', () => {
  beforeEach(() => {
    window.localStorage = new LocalStorageMock();
  });
  test('will login user and set user in store', () => {
    vi.mock('../data/axios', () => ({
      default: () => ({
        post: vi.fn(() =>
          Promise.resolve({
            data: {
              roles: [],
              accessToken: jwt.sign({ id: 1 }, 'secret', {
                expiresIn: '1h',
              }),
            },
          }),
        ),
      }),
    }));

    return new Promise<void>((resolve) => {
      const TestComp = () => {
        const { login } = useAuth();
        const loginAction = login(() => {
          expect(checkIsLoggedIn()).toEqual(true);
          resolve();
        });
        useEffect(() => {
          loginAction.mutate({
            email: 'test@konomi.ai',
            password: 'test',
          });
        }, []);
        return <div />;
      };
      render(<TestComp />, { route: '*' });
    });
  });
});
