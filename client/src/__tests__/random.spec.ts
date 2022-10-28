import { describe, test } from 'vitest';
import { secureRandomString } from '../utils';

describe('random', () => {
  describe('secureRandomString', () => {
    test('will return a string of x length', () => {
      const result = secureRandomString(10);
      expect(result.length).toBe(10);
    });
    test('will not fallback if crypto is not available and fallback flag is disabled', () => {
      expect(() => secureRandomString(10, true)).toThrow();
    });
  });
});
