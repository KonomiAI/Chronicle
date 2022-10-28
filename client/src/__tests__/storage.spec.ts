import { describe, test } from 'vitest';
import { LocalStorageMock } from '../testing-utils/local-storage-mock';
import { useLocalStorage } from '../utils';

describe('useLocalStorage', () => {
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

  test('will return an abstracted version of the local storage api', () => {
    const storage = useLocalStorage();
    expect(storage).toHaveProperty('get');
    expect(storage).toHaveProperty('getSafely');
    expect(storage).toHaveProperty('set');
    expect(storage).toHaveProperty('clear');
    expect(storage).toHaveProperty('remove');
    expect(storage).toHaveProperty('size');
    expect(storage).toHaveProperty('has');
  });

  test('will throw an error if getSafely is trying to access an unused method', () => {
    const storage = useLocalStorage();
    expect(() => storage.getSafely('test')).toThrowError(
      'Item with key test is not set in local storage',
    );
  });

  /**
   * Since we are simply forwarding the api calls to the local storage,
   * we will only test logic that is not already tested by the browser.
   */
});
