const i18nMoneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
});

export const floatToPennies = (value: number): number =>
  Math.floor(value * 100);

export const penniesToPrice = (value: number): string =>
  `${i18nMoneyFormatter.format(value / 100)}`;

export const penniesToFloat = (value: number): number => value / 100;
