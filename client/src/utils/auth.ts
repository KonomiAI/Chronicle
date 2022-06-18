import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getUser, login } from '../data/auth';
import { UserNoAccessToken } from '../types';
import { useStore } from '../store';

import {
  checkIsLoggedIn,
  clearSession,
  getAccessToken,
  getAccessTokenExpiry,
} from './storage-helpers';
import { collectPermissions } from './permission';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const authQuery = (
    callback: (
      error: null | AxiosError,
      user: UserNoAccessToken | null,
    ) => void,
  ) =>
    useMutation(login, {
      onSuccess: (data: UserNoAccessToken) => {
        queryClient.invalidateQueries('currentUser');

        const permissions = collectPermissions(data.roles);
        useStore.setState({
          user: data,
          permissions,
        });

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

  const logout = () => {
    clearSession();
    useStore.persist.clearStorage();
    accessToken = null;
    accessTokenExpiry = null;
    navigate('/login');
  };

  return {
    login: authQuery,
    logout,
    getUser: getUserQuery,
    isLoggedIn,
    accessToken,
    accessTokenExpiry,
  };
};
