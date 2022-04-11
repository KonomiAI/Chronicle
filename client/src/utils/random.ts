function generateStringNotSecure(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    i += 1;
  }
  return result;
}

/**
 * Generate a string securely using browser built in crypto module.
 *
 * Browser support: https://caniuse.com/getrandomvalues
 *
 * @param length the length of the string
 * @returns a secure random string of x length
 */
export function secureRandomString(length: number) {
  if (!window?.crypto) {
    return generateStringNotSecure(length);
  }
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  values.forEach((el) => {
    result += charset[el % charset.length];
  });
  return result;
}
