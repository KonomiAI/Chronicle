import { test, describe, expect } from 'vitest';
import { fastUnsafeObjectCompare } from '../utils/compare-object';

describe('object comparison utils', () => {
  describe('fastUnsafeObjectCompare', () => {
    test('will compare positive values correctly', () => {
      expect(fastUnsafeObjectCompare({ test: 'abc' }, { test: 'abc' })).toEqual(
        true,
      );
    });
    test('will compare different values correctly', () => {
      expect(
        fastUnsafeObjectCompare({ test: 'abcd' }, { test: 'abc' }),
      ).toEqual(false);
    });
    test('will compare different values attributes correctly', () => {
      expect(
        fastUnsafeObjectCompare(
          { test: 'abc', hello: 'world' },
          { test: 'abc' },
        ),
      ).toEqual(false);
    });
    test('will compare arrays', () => {
      expect(fastUnsafeObjectCompare(['hello'], ['hello'])).toEqual(true);
    });
  });
});
