import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUser, login } from '../data/auth';
import { UserNoAccessToken } from '../types';
import {
  checkIsLoggedIn,
  getAccessToken,
  getAccessTokenExpiry,
} from './storage-helpers';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const authQuery = (
    callback: (
      error: null | AxiosError,
      user: UserNoAccessToken | null,
    ) => void,
  ) =>
    useMutation(login, {
      onSuccess: (data) => {
        queryClient.invalidateQueries('currentUser');
        callback(null, data);
      },
      onError: (err: AxiosError) => {
        callback(err, null);
      },
    });
  const getUserQuery = () => useQuery('currentUser', getUser);

  const isLoggedIn = checkIsLoggedIn();

  let accessToken: string | null = null;
  let accessTokenExpiry: Date | null = null;

  if (isLoggedIn) {
    accessToken = getAccessToken();
    accessTokenExpiry = new Date(+getAccessTokenExpiry());
  }

  return {
    login: authQuery,
    getUser: getUserQuery,
    isLoggedIn,
    accessToken,
    accessTokenExpiry,
  };
};
