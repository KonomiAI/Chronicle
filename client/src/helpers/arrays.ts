/**
 * Type guard for non-empty array of strings
 * @param value - Value to check
 */
export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => typeof item === 'string');
