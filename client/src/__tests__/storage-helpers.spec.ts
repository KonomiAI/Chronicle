import { describe, test } from 'vitest';
import { LocalStorageMock } from '../testing-utils/local-storage-mock';
import {
  clearRememberedUsername,
  getAccessToken,
  getRememberedUsername,
  setRememberedUsername,
  getAccessTokenExpiry,
  checkIsLoggedIn,
  checkIsExpired,
  clearSession,
} from '../utils';
import { ACCESS_TOKEN_EXPIRY_KEY, ACCESS_TOKEN_KEY } from '../vars';

describe('storage helpers', () => {
  const before = window.localStorage;
  const mock = new LocalStorageMock();
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mock,
    });
  });
  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: before,
    });
  });
  test('will set remember user name', () => {
    setRememberedUsername('test');
    expect(getRememberedUsername()).toBe('test');
  });

  test('will clear remember user name', () => {
    setRememberedUsername('test');
    expect(getRememberedUsername()).toBe('test');
    clearRememberedUsername();
    expect(getRememberedUsername()).toBe('');
  });

  test('will return empty string if no user name is set', () => {
    expect(getRememberedUsername()).toBe('');
  });

  test('will get access token', () => {
    mock.setItem(ACCESS_TOKEN_KEY, 'test');
    expect(getAccessToken()).toBe('test');
  });

  test('will get access token expiry', () => {
    mock.setItem(ACCESS_TOKEN_EXPIRY_KEY, 'test');
    expect(getAccessTokenExpiry()).toBe('test');
  });

  test("will check user's current session status", () => {
    const oneSecondAfterNow = +new Date(Date.now() + 1000);
    mock.setItem(ACCESS_TOKEN_KEY, 'test');
    mock.setItem(ACCESS_TOKEN_EXPIRY_KEY, String(oneSecondAfterNow));
    expect(checkIsLoggedIn()).toBe(true);
  });

  test('will check if user session is expired', () => {
    const oneSecondBeforeNow = +new Date(Date.now() - 1000);
    mock.setItem(ACCESS_TOKEN_KEY, 'test');
    mock.setItem(ACCESS_TOKEN_EXPIRY_KEY, String(oneSecondBeforeNow));
    expect(checkIsExpired()).toBe(true);
  });

  test('will clear user session', () => {
    mock.setItem(ACCESS_TOKEN_KEY, 'test');
    mock.setItem(ACCESS_TOKEN_EXPIRY_KEY, 'test');
    clearSession();
    expect(mock.getItem(ACCESS_TOKEN_KEY)).toBe(null);
    expect(mock.getItem(ACCESS_TOKEN_EXPIRY_KEY)).toBe(null);
  });
});
