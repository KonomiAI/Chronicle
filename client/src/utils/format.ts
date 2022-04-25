export const floatToPennies = (value: number): number =>
  Math.floor(value * 100);

export const penniesToPrice = (value: number): string =>
  `$${(value / 100).toString()}`;

export const penniesToFloat = (value: number): number => value / 100;
