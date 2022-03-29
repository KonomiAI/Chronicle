import axios from 'axios';
import { checkIsLoggedIn, getAccessToken } from '../utils';

export interface AxiosClientConfig {
  skipSetAuthHeaders: boolean;
}

/**
 * Get an axios client that is authenticated and configured with the correct
 * base URL.
 * @returns an axios client that is configured and automatically authenticated
 */
export default function useAxios(config?: Partial<AxiosClientConfig>) {
  const { skipSetAuthHeaders } = config ?? {};
  const headers: Record<string, string> = {};
  if (!skipSetAuthHeaders && checkIsLoggedIn()) {
    headers.Bearer = getAccessToken();
  }
  return axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    responseType: 'json',
    headers,
  });
}
