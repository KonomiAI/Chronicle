// A series of local storage quick access helper functions

import {
  ACCESS_TOKEN_EXPIRY_KEY,
  ACCESS_TOKEN_KEY,
  REMEMBERED_USERNAME,
} from '../vars';
import { useLocalStorage } from './storage';

export const setRememberedUsername = (username: string) => {
  const { set } = useLocalStorage();
  set(REMEMBERED_USERNAME, username);
};

export const getRememberedUsername = () => {
  const { getSafely, has } = useLocalStorage();
  if (has(REMEMBERED_USERNAME)) {
    return getSafely(REMEMBERED_USERNAME);
  }
  return '';
};

export const clearRememberedUsername = () => {
  const { remove } = useLocalStorage();
  remove(REMEMBERED_USERNAME);
};

export const getAccessToken = () => {
  const { getSafely } = useLocalStorage();
  return getSafely(ACCESS_TOKEN_KEY);
};

export const getAccessTokenExpiry = () => {
  const { getSafely } = useLocalStorage();
  return getSafely(ACCESS_TOKEN_EXPIRY_KEY);
};

export const checkIsLoggedIn = () => {
  const { getSafely, has } = useLocalStorage();

  return (
    has(ACCESS_TOKEN_KEY) &&
    has(ACCESS_TOKEN_EXPIRY_KEY) &&
    +getSafely(ACCESS_TOKEN_EXPIRY_KEY) > +Date.now()
  );
};

export const checkIsExpired = () => {
  const { getSafely, has } = useLocalStorage();

  if (has(ACCESS_TOKEN_KEY) && has(ACCESS_TOKEN_EXPIRY_KEY)) {
    return +getSafely(ACCESS_TOKEN_EXPIRY_KEY) < +Date.now();
  }

  return false;
};

export const clearSession = () => {
  const { remove } = useLocalStorage();
  remove(ACCESS_TOKEN_KEY);
  remove(ACCESS_TOKEN_EXPIRY_KEY);
};
