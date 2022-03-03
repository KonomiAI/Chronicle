import axios from 'axios';

/**
 * Get an axios client that is authenticated and configured with the correct
 * base URL.
 * @returns an axios client that is configured and automatically authenticated
 */
export default function useAxios() {
  return axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    responseType: 'json',
    transformResponse: [
      function transformResponse(data, headers) {
        // Optionally you can check the response headers['content-type'] for application/json or text/json
        if (headers?.['content-type'].includes('application/json')) {
          return JSON.parse(data);
        }
        return data;
      },
    ],
  });
}
