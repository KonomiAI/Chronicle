import { format, parseJSON } from 'date-fns';

const i18nMoneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'narrowSymbol',
});

export const floatToPennies = (value: number): number =>
  Math.floor(value * 100);

export const penniesToPrice = (value: number): string =>
  `${i18nMoneyFormatter.format(value / 100)}`;

export const penniesToFloat = (value: number): number => value / 100;

export const getPenniesPriceRange = (values: number[]): string => {
  if (values.length === 1) {
    return penniesToPrice(values[0]);
  }
  const min = Math.min(...values);
  const max = Math.max(...values);

  return `${penniesToPrice(min)} - ${penniesToPrice(max)}`;
};

// Format a date string to a localized human readable format
// using date-fns format function
/**
 * Format a date string to a localized human readable format
 * using date-fns format function
 *
 * For format information see: https://date-fns.org/v2.28.0/docs/format
 *
 * @param date the date string to format
 * @param f the format string to use
 * @returns the date string in the preferred format
 */
export const formatDate = (date: string | number | Date, f = 'PPP'): string =>
  format(parseJSON(date), f);
