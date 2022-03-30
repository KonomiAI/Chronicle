/**
 * Obtain a function that can perform clipboard copy correctly.
 *
 * Current implementation is a naive one that may not work on all browsers.
 *
 * @returns an abstracted function that can safely copy data
 */

export const useClipboard = () => (text: string) =>
  navigator.clipboard.writeText(text);
