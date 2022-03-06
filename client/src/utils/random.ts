/**
 * Generate a string securely using browser built in crypto module.
 *
 * Browser support: https://caniuse.com/getrandomvalues
 *
 * @param length the length of the string
 * @returns a secure random string of x length
 */
export function secureRandomString(length: number) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  values.forEach((el) => {
    result += charset[el % charset.length];
  });
  return result;
}
