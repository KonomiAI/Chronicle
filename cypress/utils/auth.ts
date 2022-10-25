export const getExpiryOfJwt = (jwt: string) => {
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  return `${payload.exp}000`;
};
