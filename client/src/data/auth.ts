import useAxios from './axois';
import { AuthBody, User, UserNoAccessToken } from '../types';
import { ACCESS_TOKEN_EXPIRY_KEY, ACCESS_TOKEN_KEY } from '../vars';
import { useLocalStorage } from '../utils';

const getExpiryOfJwt = (jwt: string) => {
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  return payload.exp;
};

/**
 * THIS METHOD SHOULD BE EXPORTED
 */

export const login = async (data: AuthBody): Promise<UserNoAccessToken> => {
  const axios = useAxios();
  const { set } = useLocalStorage();
  const { accessToken, ...user } = await axios
    .post<User>('/auth/login', data)
    .then((res) => res.data);
  // Set data in localStorage
  set(ACCESS_TOKEN_KEY, accessToken);
  set(ACCESS_TOKEN_EXPIRY_KEY, `${getExpiryOfJwt(accessToken)}`);
  return user;
};

/**
 * THIS METHOD SHOULD BE EXPORTED
 */
export const getUser = () => {
  const axios = useAxios();
  return axios.get<UserNoAccessToken>('/auth/details').then((res) => res.data);
};
