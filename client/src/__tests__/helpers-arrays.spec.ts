import { test, describe, expect } from 'vitest';
import { isStringArray } from '../helpers';

describe('arrays helper', () => {
  describe('isStringArray', () => {
    test('will identity handle positive case well', () => {
      expect(isStringArray(['is', 'string', 'array'])).toEqual(true);
    });

    test('will handle array with falsy values', () => {
      expect(isStringArray(['is', null, 'string', undefined])).toEqual(false);
    });

    test('will handle array with number', () => {
      expect(isStringArray(['hello', -1, 'world'])).toEqual(false);
    });

    test('will handle empty string well', () => {
      expect(isStringArray(['', ''])).toEqual(true);
    });

    test('will handle empty array', () => {
      expect(isStringArray([])).toEqual(false);
    });
  });
});
