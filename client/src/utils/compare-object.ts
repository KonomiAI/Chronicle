/**
 * Compare the equality of two objects quickly using JSON.stringify,
 * this should only be used when guaranteed evaluation is not necessary.
 *
 * @param a Object a to compare
 * @param b Object b to compare
 */
export const fastUnsafeObjectCompare = (a: unknown, b: unknown): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
