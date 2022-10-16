import useAxios from './axios';
import { AuthBody, ResetPasswordBody, User, UserNoAccessToken } from '../types';
import { ACCESS_TOKEN_EXPIRY_KEY, ACCESS_TOKEN_KEY } from '../vars';
import { useLocalStorage } from '../utils';

const getExpiryOfJwt = (jwt: string) => {
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  return payload.exp;
};

export const login = async (data: AuthBody): Promise<UserNoAccessToken> => {
  const axios = useAxios();
  const { set } = useLocalStorage();
  const { accessToken, ...user } = await axios
    .post<User>('/auth/login', data)
    .then((res) => res.data);
  // Set data in localStorage
  set(ACCESS_TOKEN_KEY, accessToken);
  // converting jwt expiry in seconds to milliseconds
  // https://github.com/KonomiAI/Chronicle/pull/239
  // view the above for more context
  set(ACCESS_TOKEN_EXPIRY_KEY, `${getExpiryOfJwt(accessToken)}000`);
  return user;
};

export const getUser = () => {
  const axios = useAxios();
  return axios.get<UserNoAccessToken>('/auth/details').then((res) => res.data);
};

export const resetPassword = (data: ResetPasswordBody) => {
  const axios = useAxios();

  return axios.post(`/auth/reset-password`, data).then((res) => res.data);
};
