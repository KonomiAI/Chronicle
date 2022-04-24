export const floatToPennies = (value: number): number => {
  return Math.floor(value * 100);
}

export const penniesToPrice = (value: number): string => {
  return `$${(value/100).toString()}`
}

export const penniesToFloat = (value: number): number => {
  return value/100;
}
