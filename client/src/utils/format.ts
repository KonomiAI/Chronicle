export const floatToPennies = (value: number): number =>
  Math.floor(value * 100);

export const penniesToPrice = (value: number): string =>
  `$${(value / 100).toFixed(2)}`;

export const penniesToFloat = (value: number): number => value / 100;
