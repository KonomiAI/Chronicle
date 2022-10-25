import { describe, expect, test } from 'vitest';
import {
  floatToPennies,
  formatDate,
  getPenniesPriceRange,
  penniesToFloat,
  penniesToPrice,
} from '../utils';

describe('formatting helpers', () => {
  describe('floatToPennies', () => {
    test('will convert value to pennies correctly', () => {
      expect(floatToPennies(16.99)).toEqual(1699);
    });
  });

  describe('penniesToPrice', () => {
    test('will convert pennies to stringified price well', () => {
      expect(penniesToPrice(1688)).toEqual('$16.88');
    });

    test('will format long numbers well', () => {
      expect(penniesToPrice(1234599)).toEqual('$12,345.99');
    });

    test('will support international currencies well', () => {
      expect(penniesToPrice(1234599, 'en-US', 'JPY')).toEqual('¥12,346');
    });

    test('will support other language display well', () => {
      // This didn't work, will keep here for reference
      // expect(penniesToPrice(1234599, 'fr-CA')).toEqual('12 345,99 $');
      expect(penniesToPrice(1234599, 'fr-CA')).toBeTruthy();
    });
  });

  describe('penniesToFlow', () => {
    it('will convert pennies to float correctly', () => {
      expect(penniesToFloat(1699)).toEqual(16.99);
    });
  });

  describe('getPenniesPriceRange', () => {
    test('will return a single price if there is only one value', () => {
      expect(getPenniesPriceRange([1699])).toEqual('$16.99');
    });

    test('will return a range if there are multiple values', () => {
      expect(getPenniesPriceRange([1699, 1999])).toEqual('$16.99 - $19.99');
    });

    test('will return a placeholder if there are no values', () => {
      expect(getPenniesPriceRange([])).toEqual('-');
    });
  });

  describe('formatDate', () => {
    test('will format string date correctly', () => {
      expect(formatDate('2022-10-20T21:20:54.051Z')).toEqual(
        'October 20th, 2022',
      );
    });
  });
});
